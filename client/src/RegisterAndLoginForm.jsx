import { func } from "prop-types";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import Lottie from "lottie-react";
import LoginAnimationData from "./lottie/Login.json";
import RegisterAnimationData from "./lottie/Register.json";
import Logo from "./Logo";
import LogoAnimationData from "./lottie/Logo.json";
import { toast, ToastContainer } from "react-toastify";

export default function RegisterAndLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginOrRegister, setIsLoginOrRegister] = useState("register");
  const {
    setUsername: setLoggedInUsername,
    setId,
    setToken,
  } = useContext(UserContext);

  async function handleSubmit(ev) {
    ev.preventDefault();
    const url = isLoginOrRegister === "register" ? "/register" : "/login";
    if (username === "" || password === "") {
      toast.error("Username and Password Cannot be empty!!!");
      return;
    }
    console.log("\nhandleSubmit logon/regsiter called-\n");
    try {
      const response = await axios.post(url, { username, password });
      if (response.status === 200) {
        const { data } = response;
        setLoggedInUsername(username);
        setId(data.id);
        localStorage.setItem("username", username);
        localStorage.setItem("id", data.id);
        localStorage.setItem("token", data.token);
        console.log("Data while login=",data)
        setToken(data.token);
        toast.info(data.message);
        console.log("Logged in  successfully");
      } 
      else if(response.status===201){
        console.log("Registered successfully")
        alert("Registered successfullly");
      }
      else {
        toast.error(response.status);
      }
    } catch (error) {
      toast.error(error);
    }
  }
  const LoginAnimationdefaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoginAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const RegisterAnimationdefaultOptions = {
    loop: true,
    autoplay: true,
    animationData: RegisterAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const LogoAnimationdefaultOptions = {
    loop: false,
    autoplay: false,
    animationData: LogoAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <div className="bg-green-50">
        <ToastContainer />
        
        <div className="bg-green-50 h-screen flex items-center font-montserrat">
          <Lottie
            animationData={LoginAnimationData}
            height={400}
            width={400}
            className="h-60 w-60 sm:h-96 sm:w-96"
          />
          <form
            className="w-64 mx-auto mb-12 bg-white p-6 rounded-lg shadow-md border-4 border-green-400 mr-2"
            onSubmit={handleSubmit}
          >
            <h2 className="text-lg sm:text-2xl text-center font-bold mb-6">
              {isLoginOrRegister === "register" ? "Register" : "Login"}
              <Lottie
                animationData={RegisterAnimationData}
                height={100}
                width={100}
            
              />
            </h2>
            <input
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
              type="text"
              placeholder="Username"
              className="text-sm sm:text-base w-full rounded-sm p-2 mb-4 border-2 border-green-300 focus:outline-none focus:ring focus:ring-green-400"
            />
            <input
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              type="password"
              placeholder="Password"
              className=" text-sm sm:text-base w-full rounded-sm p-2 mb-4 border-2 border-green-300 focus:outline-none focus:ring focus:ring-green-400"
            />
            <button
              className="text-sm sm:text-base bg-green-500 text-white block w-full rounded-lg p-2"
              onClick={handleSubmit}
            >
              {isLoginOrRegister === "register" ? "Register" : "Login"}
            </button>
            <div className="text-center mt-6 text-sm sm:text-base">
              {isLoginOrRegister === "register" && (
                <div>
                  Already a member?{" "}
                  <button
                    onClick={() => setIsLoginOrRegister("login")}
                    className="text-green-500 hover:underline"
                  >
                    Login Here
                  </button>
                </div>
              )}
              {isLoginOrRegister === "login" && (
                <div>
                  Don't Have an Account?{" "}
                  <button
                    onClick={() => setIsLoginOrRegister("register")}
                    className="text-green-500 hover:underline"
                  >
                    Register Here
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
