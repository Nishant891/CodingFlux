import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import login from "../assets/Login.webp";
import { SlLogin } from "react-icons/sl";
import { loginSchema } from "../schema.js";
import { account } from "../AppWrite.jsx";
import { toast } from "react-toastify";
import FormInput from "../components/FormInput.jsx";

const LogIn = () => {
  const navigate = useNavigate();

  const createEmailSession = async (data) => {
    const email = data.email;
    const password = data.password;

    try {
      //create an email session in appwrite.
      await account.createEmailSession(email, password);
      navigate("/dashboard");
    } catch (error) {
      toast.error("Wrong Email/Password Combination");
    }
  };

  const onSubmit = async (values, actions) => {
    await createEmailSession(values);
    //reset the form.
    actions.resetForm();
  };

  //values is used to access the contents of the input fields during creation of email sesssion.
  //errors is used to catch any error and display them if it does not follows the yup schema of the form defined in index.js.
  //touched is used to know if the cursor is currently active or the focus has shifted and display the error accorrdingly.
  //when isSubmitting is true the submit button is disabled so mutiple requests is not sent.

  const { values, isSubmitting, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit,
    });

  return (
    <div className="w-screen h-screen flex flex-row justify-between items-center overflow-hidden">
      <div className="hidden md:h-full md:w-1/2 md:block">
        <img
          src={login}
          className="object-contain h-full"
          alt="Sign Up Image"
        />
      </div>
      <div className="h-full w-full md:w-1/2 bg-[#0054C6] flex justify-center items-center md:rounded-l-lg">
        <form
          onSubmit={handleSubmit}
          className="h-3/5 w-3/5 flex flex-col justify-evenly"
        >
          <div className="w-full h-20 flex flex-col justify-between items-center">
            <span className="rounded-full h-10 w-10 pr-1 bg-purple-400 flex items-center justify-center">
              <SlLogin />
            </span>
            <h1 className="text-2xl text-white text-center">LOGIN</h1>
          </div>
          <div>
            <FormInput
              id="email"
              value={values.email}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
          </div>
          <div>
            <FormInput
              id="password"
              value={values.password}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-10 bg-[#57cc99] text-white text-center w-full rounded-md disabled:opacity-50 disabled:pointer-events-none"
            >
              LOGIN
            </button>
          </div>
          <div className=" text-center text-white underline text-sm hover:cursor-pointer hover:text-blue-300 md:text-right">
            <p
              onClick={() => {
                navigate("/signup");
              }}
            >
              Don't have an account? Sign Up
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
