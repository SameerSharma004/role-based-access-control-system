import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formSubmitHandler = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:3000/api/auth/login`, {
        email: email,
        password: password,
      });
      localStorage.setItem("current_user_id", res.data.userId);
      localStorage.setItem("Token", res.data.token);
      if (res.data.message !== "Login Successful") {
        alert(res.data.message);
      }
      setTimeout(() => {
        if (res.data.role === "admin") {
          navigate("/admin");
        } else if (res.data.role === "manager") {
          navigate("/manager");
        } else if (res.data.role === "employee") {
          navigate("/");
        }else{
          navigate('/login')
        }
      }, 1000);
    } catch (err) {
      console.log("Error While Creating new user.");
    }
  };
  return (
    <div className=" h-screen w-screen flex justify-center items-center bg-linear-to-t from-purple-800 to-purple-300">
      <div className="bg-black p-5 rounded-4xl">
        <div className=" text-white p-10">
          <div className="py-10">
            <h1 className="text-4xl">Welcome Back</h1>
          </div>
          <form onSubmit={formSubmitHandler} className="flex flex-col gap-10">
            <div className="flex flex-col gap-3">
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
              login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
