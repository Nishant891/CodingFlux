import SideBar from "../components/SideBar.jsx";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App.jsx";
import { databases, account } from "../AppWrite.jsx";
import { ID } from "appwrite";
import { toast } from "react-toastify";
import { GiHamburgerMenu } from "react-icons/gi";

function DashBoard() {
  //userInput state keeps track of the roomId entered by a user.
  const [userInput, setUserInput] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  //The user state from App.jsx component is used here to check if a user is no loggedIn and tries to access the dashboard if so it navigates to login page.
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  //This useEffect checks if a user is loggedIn or not if not  navigates to login page.
  useEffect(() => {
    async function getUser() {
      try {
        const currentUser = await account.get();
        if (currentUser) {
          setUser(currentUser);
        }
      } catch (err) {
        if (err) {
          navigate("/login");
        }
      }
    }
    getUser();
  }, []);

  const handleCreateRoom = async () => {
    if (!user) {
      toast.info("Please SignUp/LogIn First");
    }
    toast.info("Room created successfully");
    const userId = user.$id;
    //Creates a room with the roomId same as documentId for user and adds a new column to the database.
    const documentID = await databases.createDocument(
      process.env.REACT_APP_DATABASE_ID,
      process.env.REACT_APP_COLLECTION_ID,
      ID.unique(),
      { xml: "", css: "", js: "", userId: userId }
    );
    //Pushes the username and the roomId in the route.
    navigate(`/editor/${user.name.split(" ")[0]}/${documentID.$id}`);
  };

  const handleJoinRoom = async () => {
    const regex = /^[a-zA-Z0-9]{20}$/;
    //Checks for user then checks if the roomId is correct and takes the user to the room joined. User can now edit in the same document with the ID same as roomId
    if (!user) {
      toast.info("Please SignUp/LogIn First");
    }
    if (userInput === "") {
      toast.warn("Please enter a roomID");
    }
    if (!regex.test(userInput)) {
      toast.error("Invalid roomID.");
    }
    toast.info("Room joined successfully");
    //Pushes the username and the roomId in the route.
    navigate(`/editor/${user.name.split(" ")[0]}/${userInput}`);
  };

  //Deletes email session once logged out.
  const handleLogout = async () => {
    try {
      const userId = user.$id;
      await account.deleteSessions(userId);
      toast.info("Logged Out");
      navigate("/");
    } catch (error) {}
  };

  const handleUserInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };
  return (
    <div className="bg-[#021325] h-screen width-screen">
      <SideBar
        isHidden={isHidden}
        toggleVisibility={toggleVisibility}
        name={user == null ? " " : user.name}
        userId={user == null ? "" : user.$id}
      />
      <div className="flex flex-col justify-center items-center bg-[#021325] text-white">
        <div
          className={`h-10 w-full flex ${
            isHidden ? "justify-between" : "justify-end"
          } items-center lg:justify-end`}
        >
          {isHidden ? (
            <button
              onClick={toggleVisibility}
              className="flex justify-center items-center bg-[#2CA9BC] text-white h-8 w-8 rounded-full font-semibold m-2 lg:hidden"
            >
              <GiHamburgerMenu />
            </button>
          ) : null}

          <button
            onClick={handleLogout}
            className="mr-4 bg-red-600 text-sm w-16 h-8 rounded-md hover:opacity-90"
          >
            <p>LOG OUT</p>
          </button>
        </div>
        <div className="max-h-[20rem] max-w-[28rem] rounded-xl outline outline-offset-2 outline-slate-600 mt-[10rem] mx-2 p-8 flex flex-col justify-center items-center">
          <div className="flex items-center justify-center">
            <p className="text-4xl">Let's Code</p>
          </div>
          <div className="text-center mt-4">
            <button
              onClick={handleCreateRoom}
              className="max-w-[11rem] max-h-[4rem] px-4 py-3 bg-[#2CA9BC] text-black text-xl rounded-lg mb-1"
            >
              Create a room
            </button>
            <button
              onClick={() => {
                handleJoinRoom();
              }}
              className="max-w-[12rem] max-h-[4rem] px-7 py-3 bg-green-400 text-black text-xl rounded-lg mt-1 sm:ml-3"
            >
              Join a room
            </button>
            <div>
              <input
                className="px-4 py-2 border border-gray-300 rounded-lg mt-2 w-full outline-none text-black"
                type="text"
                value={userInput}
                onChange={handleUserInputChange}
                placeholder="Enter room ID"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
