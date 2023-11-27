import Avatar from "@mui/material/Avatar";
import { databases } from "../AppWrite.jsx";
import { Query } from "appwrite";
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { AiFillFolderOpen } from "react-icons/ai";
import { Tooltip } from "react-tooltip";
import { toast } from "react-toastify";

//Generates a unique color background color for the Avatar component.
function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name) {
  if (name == " ") {
    return {
      sx: {
        width: 68,
        height: 68,
        bgcolor: stringToColor(name),
      },
      children: " ",
    };
  }
  return {
    sx: {
      width: 68,
      height: 68,
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}
function SideBar({ name, userId }) {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    //Get all the rooms a userpreviously created associated with his userIds.
    const fetchRooms = async () => {
      if (userId) {
        try {
          const documents = await databases.listDocuments(
            "6471d0c7a377ea50a9e7",
            "6471d37c47aba841fc16",
            [Query.equal("userId", [userId])]
          );
          const rooms = documents.documents.map((doc) => {
            return doc.$id;
          });
          setRooms(rooms);
        } catch (_) {}
      }
    };
    fetchRooms();
  }, [userId]);
  return (
    <div className="text-white bg-[#021325] hidden lg:block">
      <div className="bg-transparent w-full h-full flex flex-col gap-4 justify-start items-center">
        <div className="w-11/12 h-1/5 rounded-xl flex flex-col gap-3 justify-center items-center mt-4">
          <div
            className={`w-16 h-16 rounded-full outline outline-offset-2 outline-slate-600 mt-4 flex flex-col justify-center items-center`}
          >
            <Avatar {...stringAvatar(`${name}`)} />
          </div>
          <h1>Hello {name.split(" ")[0]}</h1>
        </div>
        <div className="h-auto max-w-full mb-4 rounded-xl outline outline-offset-2 outline-slate-600 mt-4 px-4">
          <div className="border-b-2 border-slate-400/25 h-10 flex justify-center items-center">
            <p>ROOMS</p>
          </div>
          <div className="w-full h-[60vh] mt-1 px-1 overflow-y-scroll">
            {rooms.map((room) => {
              return (
                <div key={room} className="w-full border-b border-slate-400/25 h-8 mb-2 flex flex-row justify-evenly items-center">
                  <p>{room}</p>
                  <a
                    data-tooltip-id="delete-tooltip"
                    data-tooltip-content="Delete Room"
                    data-tooltip-place="top"
                    className="bg-red-700 h-6 w-6 flex justify-center items-center rounded-md cursor-pointer"
                    onClick={() => {
                      toast.info("Feature will be available soon")
                    }}
                    >
                    <AiFillDelete />
                  </a>
                  <Tooltip id="delete-tooltip" />
                  <a
                    data-tooltip-id="open-tooltip"
                    data-tooltip-content="Open Room"
                    data-tooltip-place="top"
                    className="bg-green-500 h-6 w-6 flex justify-center items-center rounded-md cursor-pointer"
                    onClick={() => {
                      toast.info("Feature will be available soon")
                    }}
                  >
                    <AiFillFolderOpen />
                  </a>
                  <Tooltip id="open-tooltip" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
