import { useEffect, useState } from "react";
import logo from "../assets/bookMyPitch.png";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import UserNav from "../components/UserNav";
import useUserStore from "../store";

function UpdateUser() {
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [pass, setPass] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const navigate = useNavigate();
  const { user } = useUserStore();
 // console.log(user)
  const headers = {
    Authorization: `Bearer ${user.token}`,
  };
  //console.log(headers)

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/users/${user._id}`
        );
        console.log(res.data);
        setFname(res.data.firstName)
        setLname(res.data.lastName)
        setPhoneno(res.data.phoneno)

      } catch (error) {
        console.log(error.response.data);
        if (error.response.data.message) {
          toast.error(error.response.data.message);
        }
      }
    };
    getUserInfo();
  }, [user.token]);
  

  const submitData = async (e) => {
    e.preventDefault();
    console.log(email, pass, fname, lname, phoneno);

    try {
      const res = await axios.put(
        `http://localhost:5000/api/users/update/${user._id}`,
        {
          firstName: fname,
          lastName: lname,
          //email,
          //password: pass,
          phoneno,
        },
        headers
      );
      console.log(res);
      if (res.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Update failed try again later");
    }
  };

  return (
    <div className="">
      <UserNav />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
      />
      <form
        onSubmit={submitData}
        className="pt-36 font-semibold justify-center text-4xl flex items-center flex-col gap-6"
      >
        <h2>Update </h2>
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
        {/* <div className="flex flex-col text-xl">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            className="w-[30vw] p-2 bg-bg border-[1px] border-black"
            required
          />
        </div> */}
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
       
        <button
          type="submit"
          // onSubmit={(e) => submitData(e)}
          className="p-2 mb-12 w-[30vw] font-light text-xl bg-black text-white hover:bg-neutral-800"
        >
          Update
        </button>
        
      </form>
      <Footer />
    </div>
  );
}

export default UpdateUser;
