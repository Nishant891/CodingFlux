import { useNavigate } from "react-router-dom";
import editorPic from "../assets/editorPic.png";
import { BsFillTriangleFill } from "react-icons/bs";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen sm:h-[52rem] flex flex-col justify-center items-center text-white bg-custom-image bg-cover bg-center pt-10 sm:pt-24">
      <div className="max-w-[36rem] text-center space-y-4 sm:py-10">
        <p className="text-3xl sm:text-3xl bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
          CODING FLUX
        </p>
        <p className="text-xl sm:text-3xl text-gray-50">
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
        <div className="h-[10rem] sm:h-[19rem] w-[36rem] mx-3 custom-shadow-green-blue">
          <img
            className="h-auto max-w-full rounded-md bg-white border-4 border-gray-300"
            src={editorPic}
            alt="Register"
          />
        </div>
        <BsFillTriangleFill size={50}/>
      </div>
    </div>
  );
}

export default Home;
