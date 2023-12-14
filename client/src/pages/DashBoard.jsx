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
      } catch (_) {
        navigate("/login");
      }
    }
    getUser();
  }, []);

  const handleCreateRoom = async () => {
    if (user) {
      toast.info("Room created successfully");
      const userId = user.$id;
      //Creates a room with the roomId same as documentId for user and adds a new column to the database.
      const documentID = await databases.createDocument(
        "6471d0c7a377ea50a9e7",
        "6471d37c47aba841fc16",
        ID.unique(),
        { xml: "", css: "", js: "", userId: userId }
      );
      //Pushes the username and the roomId in the route.
      navigate(`/editor/${user.name.split(" ")[0]}/${documentID.$id}`);
    } else {
      toast.info("Please SignUp/LogIn First");
    }
  };

  const handleJoinRoom = async () => {
    //Checks for user then checks if the roomId is correct and takes the user to the room joined. User can now edit in the same document with the ID same as roomId
    if (user) {
      if (userInput === "") {
        toast.warn("Please enter a roomID");
      } else {
        const regex = /^[a-zA-Z0-9]{20}$/;
        if (!regex.test(userInput)) {
          toast.error("Invalid roomID.");
        } else {
          toast.info("Room joined successfully");
          //Pushes the username and the roomId in the route.
          navigate(`/editor/${user.name.split(" ")[0]}/${userInput}`);
        }
      }
    } else {
      toast.info("Please SignUp/LogIn First");
    }
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
    setIsHidden(!isHidden)
  }
  return (
    <>
      <div className="bg-black h-screen width-screen grid grid-cols-4 divide-x divide-slate-400/25">
        <SideBar
          isHidden={isHidden}
          toggleVisibility={toggleVisibility}
          name={user == null ? " " : user.name}
          userId={user == null ? "" : user.$id}
        />
        <div className="col-span-4 lg:col-span-4 bg-[#021325] text-white">
          
          <div className={`h-10 w-full flex ${isHidden ? "justify-between" : "justify-end"} items-center lg:justify-end`}>
            {
              isHidden ?  <button
              onClick={toggleVisibility}
              className="flex justify-center items-center bg-[#2CA9BC] text-white h-8 w-8 rounded-full font-semibold m-2 lg:hidden"
            >
              <GiHamburgerMenu />
            </button> : null
            }
           
            <button
              onClick={handleLogout}
              className="mr-4 bg-red-600 text-sm w-16 h-8 rounded-md hover:opacity-90"
            >
              <p>LOG OUT</p>
            </button>
          </div>
          <div className="w-full h-5/6 bg-transparent flex flex-row justify-evenly items-center">
            <div className="h-auto max-w-full rounded-xl outline outline-offset-2 outline-slate-600 mt-4 mx-2 p-8 flex flex-col justify-center items-center">
              <div className="flex items-center justify-center">
                <p className="text-4xl">Let's Code</p>
              </div>
              <div className="text-center mt-4">
                <button
                  onClick={handleCreateRoom}
                  className="px-4 py-3 bg-[#2CA9BC] text-black text-xl rounded-lg mb-1"
                >
                  Create a room
                </button>
                <button
                  onClick={() => {
                    handleJoinRoom();
                  }}
                  className="px-4 py-3 bg-green-400 text-black text-xl rounded-lg ml-4"
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
      </div>
    </>
  );
}

export default DashBoard;
