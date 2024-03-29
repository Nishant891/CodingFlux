import { useNavigate } from "react-router-dom";
import editorPic from "../assets/editorPic.webp";
import { BsFillTriangleFill } from "react-icons/bs";
import Header from "../components/header";

function Home() {
  const navigate = useNavigate();

  return (
    <>
    <Header/>
      <div className="w-screen h-[42rem] sm:h-[50rem] flex flex-col justify-center items-center text-white background px-2 pt-0 sm:pt-20">
        <div className="max-w-[36rem] text-center sm:py-10">
          <p className="text-3xl bg-gradient-to-r mb-2 from-green-400 to-blue-500 text-transparent bg-clip-text">
            CODING FLUX
          </p>
          <p className="text-xl sm:text-3xl text-gray-50 mb-4">
            Revolutionize{" "}
            <span className="text-blue-500 italic">collaborative</span> coding
            with our &#123;
            <span className="text-green-600"> feature-packed </span>&#125;{" "}
            <span className="underline">code editor</span>
          </p>
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="text-lg transition duration-500 ease-in-out w-36 h-12 px-4 py-3 bg-gradient-to-r from-[#c7f9cc] to-[#57cc99] text-black rounded-lg transform hover:-translate-y-1 hover:scale-110 active:opacity-80"
          >
            Get Started
          </button>
        </div>
        <div className="w-full h-[14rem] sm:h-[22rem] flex flex-col justify-center items-center gap-2">
          <div className="h-[10rem] w-full sm:h-[19rem] sm:w-[36rem] mx-3">
            <img
              className="h-auto max-w-full rounded-md bg-white border-4 border-gray-300 custom-shadow-green-blue"
              src={editorPic}
              alt="Register"
            />
          </div>
          <BsFillTriangleFill size={50} className="hide-icon" />
        </div>
      </div>
    </>
  );
}

export default Home;
