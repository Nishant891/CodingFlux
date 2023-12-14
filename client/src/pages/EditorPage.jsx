import EditorSidebar from "../components/EditorSidebar.jsx";
import CodeEditor from "../components/CodeEditor.jsx";
import EditorView from "../components/EditorView.jsx";
import { useState, useRef, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Actions } from "../components/Action.js";
import { databases } from "../AppWrite.jsx";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

const EditorPage = () => {
  //Gets the roomId and username from the url above.
  const { username, roomId } = useParams();
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const [toggleView, setToggleView] = useState(true);
  //All the clients connected to the room are stored in the state client below.
  const [clients, setClients] = useState([]);
  //A reference to the socket initailized useRef is used to avoid re-renders.
  const socketRef = useRef(null);
  //codeRef is used to sync code to any newly joined user.
  const codeRef = useRef({ xml: "<h1>Hello</h1>", css: "", js: "" });
  const navigate = useNavigate();
  //srcDoc state is used when executing the code and displaying the result in the iframe.
  const [srcDoc, setSrcDoc] = useState();

  //Function to initialize socket.
  const initSocket = useCallback(() => {
    socketRef.current = io(process.env.REACT_APP_BACKEND_URL, {
      "force new connection": true,
      reconnectionAttempts: "Infinity",
      timeout: 10000,
      transports: ["websocket"],
    });
  }, []);

  useEffect(() => {
    function handleErrors() {
      toast.error("Socket connection failed, try again later.");
      navigate("/dashboard");
    }

    const init = async () => {
      try {
        initSocket();
        //Handle error if socket fails to connect and inform the user.
        socketRef.current.on("connect_error", (err) => handleErrors(err));
        socketRef.current.on("connect_failed", (err) => handleErrors(err));

        //Emit an event when the user first joins the room.
        socketRef.current.emit(Actions.JOIN, {
          roomId,
          username,
        });

        //Listen for any joined event from the server.
        socketRef.current.on(
          Actions.JOINED,
          ({ clients, userName, socketId }) => {
            if (username !== userName) {
              //Inform all the connected clients about the user joined except the user himself.
              toast.success(`${userName} joined the room!`);
              //Emit an event asking to sync code to the editor of the new user.
              //This event is emitted by all the users except the new user since he does not have any code to sync.
              socketRef.current.emit(Actions.SYNC_CODE, {
                code: codeRef.current,
                socketId,
                name: "all",
              });
            }
            //Clients returned from the server is used to set the clients state above.
            setClients(clients);
          }
        );

        //Inform all the other users when a user leaves the room.
        socketRef.current.on(Actions.DISCONNECTED, ({ socketId, username }) => {
          toast.info(`${username} left the room`);
          setClients((prev) => {
            return prev.filter((client) => client.socketId !== socketId);
          });
        });
      } catch (e) {}
    };
    init();

    //Save the data when a user leaves in the appwrite document.
    const saveData = async (data) => {
      try {
        await databases.updateDocument(
          "6471d0c7a377ea50a9e7",
          "6471d37c47aba841fc16",
          roomId,
          {
            xml: data.xml,
            css: data.css,
            js: data.js,
          }
        );
      } catch (_) {}
    };

    return () => {
      //Disconnect all the connections to prevent memory leaks.
      socketRef.current.disconnect();
      socketRef.current.off(Actions.DISCONNECTED);
      socketRef.current.off(Actions.JOINED);
      saveData(codeRef.current);
    };
  }, []);

  return (
    <>
      <div className="h-screen w-screen flex flex-row">
        {toggleSidebar ? (
          <EditorSidebar
            codeRef={codeRef}
            toggleSidebar={toggleSidebar}
            setToggleSidebar={setToggleSidebar}
            roomId={roomId}
            clients={clients}
          />
        ) : null}
        <div
          className={`${
            toggleSidebar
              ? toggleView
                ? "w-8/12"
                : "w-11/12"
              : toggleView
              ? "w-9/12"
              : "w-full"
          } h-full w-full flex flex-row`}
        >
          <CodeEditor
            setSrcDoc={setSrcDoc}
            //Any changes in the code editor will reflect in codeRef as well.
            onCodeChange={(code, name) => {
              if (name === "all") {
                codeRef.current = code;
              } else if (name === "xml") {
                codeRef.current.xml = code;
              } else if (name === "css") {
                codeRef.current.css = code;
              } else if (name === "js") {
                codeRef.current.js = code;
              }
            }}
            socketRef={socketRef}
            roomId={roomId}
            setToggleSidebar={setToggleSidebar}
            setToggleView={setToggleView}
            toggleSidebar={toggleSidebar}
            toggleView={toggleView}
          />
        </div>
        {toggleView ? <EditorView srcDoc={srcDoc} toggleView={toggleView} setToggleView={setToggleView} /> : null}
      </div>
    </>
  );
};

export default EditorPage;
