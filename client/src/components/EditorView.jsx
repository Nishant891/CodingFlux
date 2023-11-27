import React from 'react'

const EditorView = ({srcDoc}) => {
  return (
    <div className="bg-[#0c1a29] w-3/12 h-full border-l border-slate-800 flex justify-center items-center">
      <div className='flex flex-row w-11/12 h-[97vh] bg-white rounded-xl outline outline-offset-2 outline-[#0054C6] justify-end items-center text-white'>
      <iframe
            className="bg-white-700"
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts"
            width="100%"
            height="100%"
          />
      </div>
    </div>
  )
}

export default EditorView;
