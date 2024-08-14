import React, { useState } from "react";
import Nav from "../components/Nav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterTurf1() {
  const [pageState, setPageState] = useState(1);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [Email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [price, setPrice] = useState("");
  const [turfName, setTurfName] = useState("");
  const [openTime, setOpenTime] = useState();
  const [closeTime, setCloseTime] = useState();
  const [address, setAddress] = useState("");
  const [desc, setDesc] = useState("");
  const [city, setCity] = useState("");
  const [images, setImages] = useState([]);

  const navigate = useNavigate()

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    console.log(files[0].name);
    setImages(files);
  };

  const validateFirstPage = (e) => {
    e.preventDefault();

    if (!fname || !lname || !Email || !phoneno || !pass || !confirmPass) {
      toast.error("All fields are required");
      return;
    }
    if (pass.length != 8) {
      toast.error("Password length must be of 8 characters");
      return;
    }

    if (pass !== confirmPass) {
      toast.error("Confirm password and password don't match");
      return;
    }

    setPageState(pageState + 1);
  };

  const validateSecondPage = () => {
    if (
      !turfName ||
      !openTime ||
      !closeTime ||
      !price ||
      !desc ||
      !address ||
      !city ||
      images.length === 0
    ) {
      toast.error("All fields are required on the second page");
      return false;
    }
    return true;
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    console.log("form")
    const isValid = validateSecondPage();
    if (!isValid) {
      return;
    }
    try {
      const formData = new FormData();
      formData.append("fname", fname);
      formData.append("lname", lname);
      formData.append("Email", Email);
      formData.append("pass", pass);
      formData.append("phoneno", phoneno);
      formData.append("turfName", turfName);
      formData.append("openTime", openTime);
      formData.append("closeTime", closeTime);
      formData.append("price", price);
      formData.append("address", address);
      formData.append("desc", desc);
      formData.append("city", city);
      formData.append("totalHours" , )
      images.forEach((image) => {
        formData.append("images", image);
      });

      const headers = {
        "Content-Type": "multipart/form-data",
      };
      const response = await axios.post(
        "http://localhost:5000/api/turf/register",
        formData,
        {
          headers: headers,
        }
      );
      console.log("Response:", response.data);
      if (response.status === 201) {
        toast.success(response.message);
        navigate("/login")
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form. Please try again later.");
    }
  };

  return (
    <div className="flex  justify-center ">
      <Nav />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
        className="mt-20"
      />
      {pageState === 1 && (
        <form
     
          className="border-2 h-max border-accent p-8 m-20 mt-32 text-xl flex flex-col gap-4 "
        >
          <h1 className="font-bold text-3xl mb-8 text-accent">
            Manger Details{" "}
          </h1>
          <div className="grid grid-cols-2 ">
            <label htmlFor="mangerFname">First Name </label>
            <input
              type="text"
              id="mangerFname"
              value={fname}
              required
              onChange={(e) => setFname(e.target.value)}
              className="rounded-sm bg-bg border-black border-[1px] p-1"
            />
          </div>
          <div className="grid grid-cols-2 ">
            <label htmlFor="mangerLname">Last Name </label>
            <input
              type="text"
              id="mangerLname"
              value={lname}
              required
              onChange={(e) => setLname(e.target.value)}
              className="rounded-sm bg-bg border-black border-[1px] p-1"
            />
          </div>
          <div className="grid grid-cols-2 ">
            <label htmlFor="managerEmail">Email </label>
            <input
              type="email"
              id="mangerEmail"
              value={Email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-sm bg-bg border-black border-[1px] p-1"
            />
          </div>
          <div className="grid grid-cols-2 ">
            <label htmlFor="mangerTelephone">Phone </label>
            <input
              type="tel"
              id="mangerTelephone"
              value={phoneno}
              required
              onChange={(e) => setPhoneno(e.target.value)}
              className="rounded-sm bg-bg border-black border-[1px] p-1"
            />
          </div>
          <div className="grid grid-cols-2 ">
            <label htmlFor="mangerPass">Password </label>
            <input
              type="password"
              id="mangerPass"
              value={pass}
              required
              onChange={(e) => setPass(e.target.value)}
              minLength={8}
              className="rounded-sm bg-bg border-black border-[1px] p-1"
            />
          </div>
          <div className="grid grid-cols-2 ">
            <label htmlFor="confirmMangerPass">Confirm Password </label>
            <input
              type="password"
              id="confirmMangerPass"
              value={confirmPass}
              required
              minLength={8}
              onChange={(e) => setConfirmPass(e.target.value)}
              className="rounded-sm bg-bg border-black border-[1px] p-1"
            />
          </div>
          <div className="flex justify-end gap-4 mt-8">
            {/* <button className="bg-neutral-600 w-[50%] px-8 py-2  text-white">
              Prev
            </button> */}
            <button
              className="bg-neutral-800 w-[50%] px-8 py-2 text-white hover:bg-black"
              onClick={(e) => validateFirstPage(e)}

            >
              Next
            </button>
          </div>
        </form>
      )}
      {pageState === 2 && (
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmitForm}
          className="border-2 w-[40%] h-max border-accent p-8 m-20 mt-32 text-xl flex flex-col gap-4 "
        >
          <h1 className="font-bold text-3xl mb-8 text-accent">Turf Details </h1>
          <div className="grid grid-cols-2 ">
            <label htmlFor="turfName">Turf Name </label>
            <input
              type="text"
              id="turfName"
              value={turfName}
              required
              onChange={(e) => {
                setTurfName(e.target.value);
              }}
              className="rounded-sm bg-bg border-black border-[1px] p-1 w-[100%]"
            />
          </div>

          <div className="grid grid-cols-2 ">
            <label htmlFor="openTime">Open Timming </label>
            <DatePicker
              selected={openTime}
              required
              onChange={setOpenTime}
              showTimeSelect
              showTimeSelectOnly
              timeInputLabel="Time:"
              timeFormat="HH:mm"
              timeIntervals={30}
              dateFormat="HH:mm"
              className="rounded-sm bg-bg border-black border-[1px] p-1 w-[100%]"
            />
          </div>

          <div className="grid grid-cols-2 ">
            <label htmlFor="openTime">close Timming </label>
            <DatePicker
              selected={closeTime}
              required
              onChange={setCloseTime}
              showTimeSelect
              showTimeSelectOnly
              timeInputLabel="Time:"
              timeFormat="HH:mm"
              timeIntervals={30}
              dateFormat="HH:mm"
              className="rounded-sm bg-bg border-black border-[1px] p-1 w-full"
            />
          </div>

          <div className="grid grid-cols-2 ">
            <label htmlFor="turfPrice">Turf Price per hour </label>
            <input
              type="number"
              id="turfPrice"
              value={price}
              required
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              className="rounded-sm bg-bg border-black border-[1px] p-1 w-full"
            />
          </div>

          <div className="grid grid-cols-2 ">
            <label htmlFor="turfCity">Turf City </label>
            <input
              type="text"
              id="turfCity"
              value={city}
              required
              onChange={(e) => {
                setCity(e.target.value);
              }}
              className="rounded-sm bg-bg border-black border-[1px] p-1 w-full"
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="address">Turf Address </label>
            <textarea
              name=""
              id="address"
              cols="10"
              rows="3"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
              className="rounded-sm bg-bg border-black border-[1px] p-1"
            ></textarea>
          </div>
          <div className="flex flex-col ">
            <label htmlFor="desc">Turf Description </label>
            <textarea
              name=""
              id="desc"
              cols="10"
              rows="3"
              value={desc}
              required
              onChange={(e) => setDesc(e.target.value)}
              className="rounded-sm bg-bg border-black border-[1px] p-1"
            ></textarea>
          </div>
          <div className="flex flex-col text-xl">
            <label htmlFor="images">Upload Images (up to 5)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              id="turfImages"
              name="turfImages"
              required
              className="w-[30vw] p-2 bg-bg border-[1px] border-black"
            />
            {images && (
              <ul>
                {images.map((img) => (
                  <li key={img.name}>{img.name}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex items-center gap-4 mt-8">
            <button
              className="bg-neutral-800 w-[50%] px-8 py-2  text-white hover:bg-black"
              onClick={() => setPageState(pageState - 1)}
            >
              Prev
            </button>
            <button
              className="bg-neutral-800 w-[50%] px-8 py-2 text-white hover:bg-black"
              //onClick={(e) => handleSubmitForm(e)}
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default RegisterTurf1;
