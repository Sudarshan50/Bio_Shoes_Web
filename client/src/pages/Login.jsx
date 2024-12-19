import { GoogleLogin } from "@react-oauth/google";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const {navigate} = useContext(ShopContext);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("Submitted");
  };
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-700 h-full"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Sign Up" ? (
        <input
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          type="text"
        />
      ) : null}
      <input
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        type="email"
      />
      <input
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        type="password"
      />
      <div className="w-full flex justify-between text-sm ">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create Account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login Here
          </p>
        )}
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === "Login" ? "Login" : "Sign Up"}
      </button>
      <p className="text-sm mt-2">Or continue with</p>
      <div className="flex gap-4">
        <GoogleLogin
          onSuccess={(u) => {
            console.log(u);
            navigate("/");
          }}
          onError={(e) => {
            console.log(e);
          }}
        >
          <button className="gsi-material-button">
            <div className="gsi-material-button-state"></div>
            <div className="gsi-material-button-content-wrapper">
              <div className="gsi-material-button-icon">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  style={{
                    display: "block",
                    fill: "rgb(255, 255, 255)",
                    height: "18px",
                    width: "18px",
                  }}
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  ></path>
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  ></path>
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  ></path>
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  ></path>
                  <path fill="none" d="M0 0h48v48H0z"></path>
                </svg>
              </div>
              <span className="gsi-material-button-contents">
                Continue with Google
              </span>
              <span style={{ display: "none" }}>Continue with Google</span>
            </div>
          </button>
        </GoogleLogin>
      </div>
    </form>
  );
};

export default Login;
