import React from "react";
import { BsWindowFullscreen } from "react-icons/bs";

const EditorView = ({ srcDoc, setToggleView }) => {
  return (
    <div className="fixed right-0 top-0 z-20 w-[16rem] lg:static bg-[#0c1a29] lg:w-3/12 h-full border-l border-slate-800 flex flex-col justify-evenly items-center">
      <button
          onClick={() => {
            setToggleView(false);
          }}
          className="flex justify-center items-center bg-[#2CA9BC] text-white h-8 w-8 rounded-full font-semibold m-1"
        >
          <BsWindowFullscreen />
        </button>
      <div className="flex flex-row w-11/12 h-[90vh] bg-white rounded-md outline outline-offset-2 outline-[#0054C6] justify-end items-center text-white">
        
        <iframe
          className="bg-white-700 rounded-md"
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default EditorView;
