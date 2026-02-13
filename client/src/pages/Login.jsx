import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AppContextProvider, { AppContext } from "../context/AppContext";

export default function Login() {
  const [currentState, setCurrState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let {backendUrl, navigate,setUser} = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === "Signup") {
        const res = await axios.post(`${backendUrl}/api/v1/auth/register`,{fullName:name, email, password },{ withCredentials: true });

        if (res.data.success) {
          setUser(res.data.data.user);
          navigate("/");
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      } else {
        // Login Api
        const res = await axios.post(
          `${backendUrl}/api/v1/auth/login`,
          { email, password },
          { withCredentials: true },
        );

        console.log(email, password);

        console.log(res);
        
        if (res.data.success) {
          setUser(res.data.data.user);
          navigate("/");
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <main className="flex items-center justify-center w-full min-h-screen px-4">
      <form
        onSubmit={onSubmitHandler}
        className="flex w-full flex-col max-w-96"
      >
        <h2 className="text-2xl font-medium text-gray-900">
          {currentState === "Login" ? "Login" : "Signup"}
        </h2>

        <p className="mt-2 text-base text-gray-500">
          {currentState === "Login"
            ? "Please enter email and password to access."
            : "Create your account to get started."}
        </p>

        {/* Name */}

        {currentState === "Signup" && (
          <div className="mt-4">
            <label className="font-medium">Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              placeholder="Please enter your name"
              className="mt-2 rounded-md ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none px-3 py-3 w-full"
              type="text"
              required
            />
          </div>
        )}

        {/* Email */}
        <div className="mt-4">
          <label className="font-medium">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Please enter your email"
            className="mt-2 rounded-md ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none px-3 py-3 w-full"
            type="email"
            required
          />
        </div>

        {/* Password */}
        <div className="mt-4">
          <label className="font-medium">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Please enter your password"
            className="mt-2 rounded-md ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none px-3 py-3 w-full"
            type="password"
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="mt-8 py-3 w-full rounded-md bg-indigo-600 text-white transition cursor-pointer hover:bg-indigo-700"
        >
          {currentState === "Login" ? "Login" : "Signup"}
        </button>

        {/* Toggle */}
        <p className="text-center py-8 text-sm">
          {currentState === "Login" ? (
            <>
              Don&apos;t have an account?{" "}
              <span
                onClick={() => setCurrState("Signup")}
                className="text-indigo-600 cursor-pointer hover:underline "
              >
                Signup
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setCurrState("Login")}
                className="text-indigo-600 cursor-pointer hover:underline"
              >
                Login
              </span>
            </>
          )}
        </p>
      </form>
    </main>
  );
}
