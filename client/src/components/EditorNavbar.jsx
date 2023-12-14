import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaCss3Alt } from "react-icons/fa";
import { DiJavascript } from "react-icons/di";
import { AiFillHtml5 } from "react-icons/ai";
import { BsLayoutSidebarReverse } from "react-icons/bs";

const EditorNavbar = (props) => {
  const [activeBtn, setActiveBtn] = useState(1);
  return (
    <div className=" bg-[#021325] w-full h-14 flex flex-row justify-evenly sm:justify-start items-center">
      <div className="w-9/12 sm:w-2/5 h-full flex flex-row justify-evenly items-center">
        {props.toggleSidebar ? null : (
          <button
            onClick={() => {
              props.setToggleSidebar(true);
            }}
            className="flex justify-center items-center bg-[#2CA9BC] text-white h-8 w-8 rounded-full font-semibold m-1"
          >
            <GiHamburgerMenu />
          </button>
        )}
        <button
          onClick={() => {
            props.setCurrentLang("xml");
            setActiveBtn(1);
          }}
          className={`flex justify-center items-center text-white h-auto max-w-full rounded-sm p-2 lg:p-0  ${
            activeBtn == 1 ? "bg-[#0054C6]" : "bg-[#002957]"
          } outline outline-offset-2 outline-[#0054C6] font-semibold m-1`}
        >
          <span className="hidden text-white flex justify-center items-center gap-1 p-1 lg:inline">
            <AiFillHtml5 className=" bg-[#bc1313] rounded text-[#ffffff] mb-1 lg:inline" />{" "}
            <p className="inline">HTML</p>
          </span>
          <AiFillHtml5 className="bg-[#bc1313] rounded text-[#ffffff] lg:hidden"/>{" "}
        </button>
        <button
          onClick={() => {
            props.setCurrentLang("css");
            setActiveBtn(2);
          }}
          className={`flex justify-center items-center text-white h-auto max-w-full rounded-sm p-2 lg:p-0 ${
            activeBtn == 2 ? "bg-[#0054C6]" : "bg-[#002957]"
          } outline outline-offset-2 outline-[#0054C6] font-semibold m-1`}
        >
          <span className="hidden text-white flex justify-center items-center gap-1 p-1 lg:inline">
            <FaCss3Alt className="bg-[#1359bc] rounded text-[#ffffff] mb-1 lg:inline" />{" "}
            <p className="inline">CSS</p>
          </span>
          <FaCss3Alt className="bg-[#1359bc] rounded text-[#ffffff] lg:hidden"/>{" "}
        </button>
        <button
          onClick={() => {
            props.setCurrentLang("js");
            setActiveBtn(3);
          }}
          className={`flex justify-center items-center text-white h-auto w-auto rounded-sm p-2 lg:p-0 ${
            activeBtn == 3 ? "bg-[#0054C6]" : "bg-[#002957]"
          } outline outline-offset-2 outline-[#0054C6] font-semibold m-1`}
        >
          <span className="hidden text-white flex justify-center items-center gap-1 p-1 lg:inline">
            <DiJavascript className="bg-[#F0DB4F] rounded text-[#ffffff] mb-1 lg:inline" />{" "}
            <p className="inline">JS</p>
          </span>
          <DiJavascript className="bg-[#F0DB4F] rounded text-[#ffffff] lg:hidden"/>{" "}
        </button>
        {props.toggleView ? null : (<button
          onClick={() => {
            props.setToggleView(true);
          }}
          className="flex justify-center items-center bg-[#2CA9BC] text-white h-8 w-8 rounded-full font-semibold m-1"
        >
          <BsLayoutSidebarReverse />
        </button>)}
      </div>
    </div>
  );
};

export default EditorNavbar;
