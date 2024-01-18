import { useNavigate } from "react-router-dom";
import Signup from "../assets/Signup.jpg";
import { useFormik } from "formik";
import { signUpSchema } from "../schema.js";
import { SiGnuprivacyguard } from "react-icons/si";
import { account } from "../AppWrite.jsx";
import { ID } from "appwrite";
import { toast } from "react-toastify";
import FormInput from "../components/FormInput.jsx";

const SignUp = () => {
  const navigate = useNavigate();
  const createUser = async (data) => {
    const name = data.firstname + " " + data.lastname;
    const email = data.email;
    const password = data.password;

    try {
      //create a new user and an email session in appwrite.
      await account.create(ID.unique(), email, password, name);
      await account.createEmailSession(email, password);
      navigate("/dashboard");
    } catch (error) {
      toast.error("User already exists");
    }
  };

  const onSubmit = async (values, actions) => {
    await createUser(values);
    //reset the form
    actions.resetForm();
  };

  //values is used to access the contents of the input fields during creation of email sesssion.
  //errors is used to catch any error and display them if it does not follows the yup schema of the form defined in index.js.
  //touched is used to know if the cursor is currently active or the focus has shifted and display the error accorrdingly.
  //when isSubmitting is true the submit button is disabled so mutiple requests is not sent.

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit,
  });

  return (
    <div>
      <div className="w-screen h-screen flex flex-row justify-between items-center overflow-hidden">
        <div className="hidden md:h-full md:w-1/2 md:block">
          <img
            src={Signup}
            className="object-contain h-full"
            alt="Sign Up Image"
          />
        </div>
        <div className="h-full w-full md:w-1/2 bg-[#0054C6] flex justify-center items-center md:rounded-l-lg">
          <form
            onSubmit={handleSubmit}
            className="h-4/5 w-3/5 flex flex-col justify-evenly items-center"
          >
            <span className="rounded-full h-10 w-10 bg-purple-400 flex items-center justify-center">
              <SiGnuprivacyguard />
            </span>
            <h1 className="text-2xl text-white text-center">SIGN UP</h1>
            <FormInput
              id="firstname"
              value={values.firstname}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.firstname}
              isTouched={touched.firstname}
            />
            <FormInput
              id="lastname"
              value={values.lastname}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.lastname}
              isTouched={touched.lastname}
            />
            <FormInput
              id="email"
              value={values.email}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.email}
              isTouched={touched.email}
            />
            <FormInput
              id="password"
              value={values.password}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.password}
              isTouched={touched.password}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-10 bg-[#57cc99] text-white text-center rounded-md disabled:opacity-50 disabled:pointer-events-none"
            >
              SIGN UP
            </button>
            <div className="text-center text-white underline text-sm hover:cursor-pointer hover:text-blue-300 md:text-right">
              <p
                onClick={() => {
                  navigate("/login");
                }}
              >
                Already have an account? Login
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;