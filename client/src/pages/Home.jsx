import { useNavigate } from "react-router-dom";
import editorPic from "../UI_Images/editorPic.png";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-screen h-screen relative bg-[#021325]">
        <div className="w-full h-full flex flex-col justify-center z-10 absolute inset-0 text-white md:flex-row">
          <div className="h-1/2 w-full flex justify-center items-center md:h-full md:w-1/2 md:justify-end">
            <div className="flex flex-col justify-center items-center flex-grow md:w-2/5 gap-2">
              <p className="text-5xl bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
                CODING_FLUX
              </p>
              <p className="text-2xl text-white ml-1 mt-2">
                Elevate Your Code, Unleash Your Imagination.
              </p>
              <button
                onClick={() => {
                  navigate("/login");
                }}
                className="transition duration-500 ease-in-out w-36 h-12 px-4 py-3 bg-gradient-to-r from-[#c7f9cc] to-[#57cc99] text-black text-xl rounded-lg transform hover:-translate-y-1 hover:scale-110  active:opacity-80 mt-3 ml-1"
              >
                Get Started
              </button>
            </div>
          </div>
          <div className="h-1/2 w-full flex justify-center items-center rounded-lg md:h-full md:w-1/2">
            <div className="h-[19rem] w-[36rem] mx-3">
              <img
                className="h-auto max-w-full outline outline-slate-300 outline-offset-2 rounded-lg shadow-[0_10px_60px_-15px_rgba(0,20,155,0.9)]"
                src={editorPic}
                alt="Register"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
