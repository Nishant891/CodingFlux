import React, { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { xml } from "@codemirror/lang-xml";
import { sass } from "@codemirror/lang-sass";
import { aura } from "@uiw/codemirror-theme-aura";
import EditorNavbar from "../components/EditorNavbar.jsx";
import { Actions } from "./Action.js";

const CodeEditor = ({
  setSrcDoc,
  onCodeChange,
  socketRef,
  roomId,
  setToggleSidebar,
  setToggleView,
  toggleSidebar,
  toggleView,
}) => {   

  //currentLang state keeps track of which language editor is being used currently.
  //value state which is an object keeps track of the code in editor.

  const [currentLang, setCurrentLang] = useState("xml");
  const [value, setValue] = React.useState({'xml' : '<h1>Hello</h1>', 'css' : '', 'js' : ''});

  //This function is trigggered whenever the html code editors value change.
  const onXMLChange = React.useCallback((val) => {
    setValue((prev) => {return {...prev,'xml':val}});
    const code = val;
    onCodeChange(code, 'xml')
    //Emit an event to change code in all the connected users html code editor.
    socketRef.current.emit(Actions.CODE_CHANGE, { roomId, code, name : 'xml' });
  }, []);

  //This function is trigggered whenever the css code editors value change.
  const onCSSChange = React.useCallback((val) => {
    setValue((prev) => {return {...prev,'css':val}});
    const code = val;
    onCodeChange(code, 'css')
    //Emit an event to change code in all the connected users css code editor.
    socketRef.current.emit(Actions.CODE_CHANGE, { roomId, code, name : 'css' });
  }, []);

  //This function is trigggered whenever the js code editors value change.
  const onJSChange = React.useCallback((val) => {
    setValue((prev) => {return {...prev,'js':val}});
    const code = val;
    onCodeChange(code, 'js');
    //Emit an event to change code in all the connected users js code editor.
    socketRef.current.emit(Actions.CODE_CHANGE, { roomId, code, name : 'js' });
  }, []);

  useEffect(() => {
    if(socketRef.current){
      //Listen to the code change event from the server.
      socketRef.current.on(Actions.CODE_CHANGE, ({ code,  name}) => {
        if(code != null){
          //This condition is specificallly for the code change event emitted from the sync code in server.
          //Here onCodeChange function is called which is a prop that changes codeRef in the EditorPage.jsx.
          if (name === 'all'){
            if(JSON.stringify(code) === JSON.stringify({})){
              setValue((prev) => {return {...prev, 'xml' : '<h1>Hello</h1>', 'css' : '', 'js' : ''}});
            }
            else{
              setValue((prev) => {return {...prev, 'xml' : code.xml, 'css' : code.css, 'js' : code.js}});
              onCodeChange(code, 'all');
            }
          }
          //Below this are the normal code change events emitted from the server.
          else if(name === 'xml'){
            setValue((prev) => {return {...prev, 'xml' : code}});
            onCodeChange(code, 'xml');
          }
          else if(name === 'css'){
            setValue((prev) => {return {...prev, 'css' : code}});
            onCodeChange(code, 'css');
          }
          else if(name === 'js'){
            setValue((prev) => {return {...prev, 'js' : code}});
            onCodeChange(code, 'js');
          }
        }
      })
    }
    return () => {
      if(socketRef.current){
        socketRef.current.off(Actions.CODE_CHANGE);
      }
    };
  },[socketRef.current]);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <head>
            <style>${value.css}</style>
          </head>
            <body>
              ${value.xml}
              <script>${value.js}</script>
            </body>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <EditorNavbar
          setCurrentLang={setCurrentLang}
          setToggleSidebar={setToggleSidebar}
          setToggleView={setToggleView}
          toggleSidebar={toggleSidebar}
          toggleView={toggleView}
        />
        <div className="w-full h-full bg-[#021325]">
          <div className="m-1 rounded-sm outline outline-offset-2 outline-slate-400/25">
            {currentLang === "xml" && (
              <CodeMirror
                className="overflow-y-hidden"
                height="90vh"
                value={value.xml}
                theme={aura}
                extensions={[xml({ xml: true })]}
                onChange={onXMLChange}
                linenumbers = "true"
                highlightactivelinegutter = "true"
                highlightspecialchars = "true"
                history = "true"
                foldgutter = "true"
                drawselection = "true"
                dropcursor = "true"
                allowmultipleselections = "true"
                indentoninput = "true"
                syntaxhighlighting = "true"
                bracketmatching = "true"
                closebrackets = "true"
                rectangularselection = "true"
                crosshaircursor = "true"
                highlightactiveline = "true"
                highlightselectionmatches = "true"
                closebracketskeymap = "true"
                defaultkeymap = "true"
                searchkeymap = "true"
                historykeymap = "true"
                foldkeymap = "true"
                completionkeymap = "true"
                lintkeymap = "true"
                lint = "true"
              />
            )}
            {currentLang === "css" && (
              <CodeMirror
                className="overflow-y-hidden"
                height="90vh"
                value={value.css}
                theme={aura}
                extensions={[sass({ sass: true })]}
                onChange={onCSSChange}
                linenumbers = "true"
                highlightactivelinegutter = "true"
                highlightspecialchars = "true"
                history = "true"
                foldgutter = "true"
                drawselection = "true"
                dropcursor = "true"
                allowmultipleselections = "true"
                indentoninput = "true"
                syntaxhighlighting = "true"
                bracketmatching = "true"
                closebrackets = "true"
                rectangularselection = "true"
                crosshaircursor = "true"
                highlightactiveline = "true"
                highlightselectionmatches = "true"
                closebracketskeymap = "true"
                defaultkeymap = "true"
                searchkeymap = "true"
                historykeymap = "true"
                foldkeymap = "true"
                completionkeymap = "true"
                lintkeymap = "true"
                lint = "true"
              />
            )}
            {currentLang === "js" && (
              <CodeMirror
                className="overflow-y-hidden"
                height="90vh"
                value={value.js}
                theme={aura}
                extensions={[javascript({ jsx: true })]}
                onChange={onJSChange}
                linenumbers = "true"
                highlightactivelinegutter = "true"
                highlightspecialchars = "true"
                history = "true"
                foldgutter = "true"
                drawselection = "true"
                dropcursor = "true"
                allowmultipleselections = "true"
                indentoninput = "true"
                syntaxhighlighting = "true"
                bracketmatching = "true"
                closebrackets = "true"
                rectangularselection = "true"
                crosshaircursor = "true"
                highlightactiveline = "true"
                highlightselectionmatches = "true"
                closebracketskeymap = "true"
                defaultkeymap = "true"
                searchkeymap = "true"
                historykeymap = "true"
                foldkeymap = "true"
                completionkeymap = "true"
                lintkeymap = "true"
                lint="true"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeEditor;
