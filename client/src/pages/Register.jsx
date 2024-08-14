import { useState } from "react";
import logo from "../assets/bookMyPitch.png";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [pass, setPass] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const navigate = useNavigate();
  const submitData = async (e) => {
    e.preventDefault();
    console.log(email, pass, fname, lname, phoneno);
    try {
      const res = await axios.post("http://localhost:5000/api/users/register", {
        firstName: fname,
        lastName: lname,
        email,
        password: pass,
        phoneno,
      });
      console.log(res);
      if (res.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 409) {
        toast.error("User already exists");
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="">
      <Nav />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
      />
      <form onSubmit={submitData} className="pt-36 font-semibold justify-center text-4xl flex items-center flex-col gap-6">
        <h2>Register</h2>
        {/* first name */}
        <div className="flex gap-4">
          <div className="flex flex-col text-xl">
            <label htmlFor="fname">First Name</label>
            <input
              type="text"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              id="fname"
              className="w-[14.5vw] p-2 bg-bg border-[1px] border-black"
              required
            />
          </div>
          {/* last name */}
          <div className="flex flex-col text-xl">
            <label htmlFor="lname">Last Name</label>
            <input
              type="text"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              id="lname"
              className="w-[14.5vw] p-2 bg-bg border-[1px] border-black"
              required
            />
          </div>
        </div>

        {/* phone */}
        <div className="flex flex-col text-xl">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            className="w-[30vw] p-2 bg-bg border-[1px] border-black"
            required
          />
        </div>
        {/* email */}
        <div className="flex flex-col text-xl">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            value={phoneno}
            onChange={(e) => setPhoneno(e.target.value)}
            id="phone"
            pattern="[0-9]{10}"
            className="w-[30vw] p-2 bg-bg border-[1px] border-black"
            required
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
            minlength="8"
            required
          />
        </div>
        <button
          type="submit"
          // onSubmit={(e) => submitData(e)}
          className="p-2 w-[30vw] font-light text-xl bg-black text-white hover:bg-neutral-800"
        >
          Register
        </button>
        <h3 className="text-xl pb-36 font-light">
          Already have an account?{" "}
          <Link to={"/login"} className="underline">
            {" "}
            Login
          </Link>
        </h3>
      </form>
      <Footer />
    </div>
  );
}

export default Register;
