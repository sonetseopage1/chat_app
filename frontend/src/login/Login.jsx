import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext.jsx";

function Login() {
  const navigate = useNavigate();
  const {setAuthUser} = useAuth();

  const [userInput, setUserInput] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const login = await axios.post("/api/auth/login", userInput);
      const data = login.data;
      if (data.success === false) {
        setLoading(false);
        alert(data.message);
        console.log(data.message);
      }
      toast.success(data.message);
      localStorage.setItem('chatapp', JSON.stringify(data.data))
      setAuthUser(data.data);
      setLoading(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error(err?.response?.data?.message)
    }
  };

  return (
    <div className="flerx flex-col items-center justify-center mix-w-full mx-auto">
      <div className="w-full p-6 rounded-lg shadow-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30">
        <h1 className="text-3xl font-bold text-center text-gray-300">
          Login <span className="text-gray-950">Chatters</span>
        </h1>
        <form className="flex flex-col mt-6" onSubmit={handleSubmit}>
          <div className="py-3">
            <label
              htmlFor="email"
              className="font-bold text-gray-950 text-xl label-text"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleInput}
              placeholder="Enter your email"
              className="w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100 focus:border-blue-300"
              required
            />
          </div>
          <div className="py-3">
            <label
              htmlFor="email"
              className="font-bold text-gray-950 text-xl label-text"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleInput}
              className="w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100 focus:border-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 self-center px-2 py-2 bg-gray-800 text-lg text-white rounded-lg hover:scale-105 w-full cursor-pointer"
          >
            {loading ? "Loading.." : "Login"}
          </button>
        </form>
        <div className="pt-2">
          <p className="text-sm front-semibold text-gray-950"></p>
          Don't have an account? &nbsp;
          <Link to={"/register"} className="text-blue-500 hover:underline">
            Register Now!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
