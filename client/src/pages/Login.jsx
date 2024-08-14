import { useState } from "react";
import logo from "../assets/bookMyPitch.png";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const submitData = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(email, pass);
    try {
      if (!emailRegex.test(email)) {
        toast.error("Invalid email address");
        return;
      }

      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password: pass,
      });
      console.log(res);
      console.log("hahah");
      if (res.status === 200) {
        const { user, manager, token } = res.data;
        if (manager) {
          setUser({ ...manager, token });
          localStorage.setItem("user", JSON.stringify({ ...manager, token }));
          navigate("/manager");
        }
        if (user) {
          setUser({ ...user, token });
          localStorage.setItem("user", JSON.stringify({ ...user, token }));
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 404) {
        toast.error("User not found");
      } else if (error.response && error.response.status === 401) {
        toast.error("Invalid password");
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="h-screen">
      <Nav />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
      />
      <form
        onSubmit={submitData}
        className="pt-36 font-semibold justify-center text-4xl flex items-center flex-col gap-8"
      >
        <h2>LOGIN</h2>
        <div className="flex flex-col text-xl">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            className="w-[30vw] p-2 bg-bg border-[1px] border-black"
          />
        </div>
        <div className="flex flex-col text-xl">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            id="password"
            className="w-[30vw] p-2 bg-bg border-[1px] border-black"
          />
        </div>
        <button
          type="submit"
          className="p-2 w-[30vw] font-light text-xl bg-black text-white hover:bg-neutral-800"
        >
          Login
        </button>
        <h3 className="text-xl pb-36 font-light">
          Don't have an account?{" "}
          <Link to={"/register"} className="underline">
            {" "}
            Register
          </Link>
        </h3>
      </form>
      <Footer />
    </div>
  );
}

export default Login;
