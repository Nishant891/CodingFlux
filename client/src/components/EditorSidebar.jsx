import { useState } from "react";
import cross from "../UI_Images/cross.svg";
import { Tooltip } from "react-tooltip";
import Client from "./Client";
import { useNavigate } from "react-router-dom";
import JSZip from 'jszip';
const EditorSidebar = ({codeRef, setToggleSidebar,
  roomId,
  clients}) => {
  const [copyStatus, setCopyStatus] = useState("Copy");
  const navigate = useNavigate();
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      setCopyStatus("Copied");
      setTimeout(() => {
        setCopyStatus("Copy");
      }, 2000);
    } catch (_) {}
  };

  const handleLeave = async () => {
      navigate("/dashboard");
  };

  const saveFiles = () => {
    const files = {
      'index.html' : new Blob([codeRef.current.xml],{type: 'text/html'}),
      'styles.css' : new Blob([codeRef.current.css],{type: 'text/css'}),
      'script.js' : new Blob([codeRef.current.js],{type: 'application/javascipt'})
    }

    const zip = new JSZip();
    for (const file in files){
      zip.file(file , files[file])
    }

    zip.generateAsync({type : 'blob'}).then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "ProgramFile.zip";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    })
  }
  return (
    <div className="bg-[#0c1a29] w-1/12 h-full border-r border-slate-800">
      <div className="w-full h-14 flex items-center justify-end text-white">
        <button
          onClick={() => {
            setToggleSidebar(false);
          }}
          className="text-white h-1/6 w-10 rounded-full mr-3 mb-8 font-semibold"
        >
          <img src={cross} alt="cross" className="object-cover"></img>
        </button>
      </div>
      <div className="w-full h-1/6 flex flex-col items-center justify-evenly">
        <a
          data-tooltip-id="copy-tooltip"
          data-tooltip-content={copyStatus}
          data-tooltip-place="bottom"
          className="w-11/12 h-10 flex justify-center items-center bg-[#2CA9BC] text-black text-md rounded-lg cursor-pointer"
          onClick={handleCopy}
        >
          COPY ID
        </a>
        <Tooltip id="copy-tooltip" />
        <a
          data-tooltip-id="save-tooltip"
          data-tooltip-content="Save"
          data-tooltip-place="bottom"
          className="w-11/12 h-10 flex justify-center items-center bg-green-400 text-black text-md rounded-lg cursor-pointer"
          onClick={saveFiles}
        >
          SAVE
        </a>
        <Tooltip id="save-tooltip" />
      </div>
      <div className="flex flex-col w-full h-4/6 justify-between items-center text-white mt-4">
        <div>
          <h1>CONNECTED</h1>
          <div className="w-full ">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
        <a
          data-tooltip-id="leave-tooltip"
          data-tooltip-content="Leave Room"
          data-tooltip-place="top"
          className="w-11/12 h-10 flex justify-center items-center bg-red-500 text-black text-md rounded-lg cursor-pointer"
          onClick={handleLeave}
        >
          LEAVE
        </a>
        <Tooltip id="leave-tooltip" />
        </div>
      </div>
    </div>
  );
};

export default EditorSidebar;
