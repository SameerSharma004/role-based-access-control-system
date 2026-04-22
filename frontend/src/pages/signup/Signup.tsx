import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:3000/api/auth/signup`, {
        username: username,
        email: email,
        password: password,
      });
      console.log("User Created Successfully !", res);
      navigate("/login");
    } catch (err) {
      console.log("Error While Creating new user.");
    }
  };
  return (
    <div className=" h-screen w-screen flex justify-center items-center bg-linear-to-t from-purple-800 to-purple-300">
      <div className="grid grid-cols-2 bg-black p-5 rounded-4xl">
        <div className=" text-white p-10">
          <div className="py-10">
            <h1 className="text-4xl">Create Account</h1>
          </div>
          <form onSubmit={formSubmitHandler} className="flex flex-col gap-10">
            <div className="flex flex-col gap-3">
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                className="border border-gray-500/70 rounded-full p-3"
                placeholder="Enter your name"
                required
              />
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="border border-gray-500/70 rounded-full p-3"
                required
              />
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="border border-gray-500/70 rounded-full p-3"
                required

              />
            </div>
            <button type="submit" className="bg-purple-900 rounded-full p-3">
              SignUp
            </button>
            <h1 className="text-gray-500/70">
              Already have an account ?{" "}
              <Link to="/login" className="text-white">
                login
              </Link>
            </h1>
          </form>
        </div>
        <div className="h-full w-full bg-linear-to-b from-purple-800 to-purple-300 rounded-2xl p-4 flex flex-col justify-center items-center gap-5 text-white">
          <h1 className="text-5xl">Task Manager</h1>
          <h1 className="text-xl">Start handling your task</h1>
        </div>
      </div>
    </div>
  );
}

export default Signup;
