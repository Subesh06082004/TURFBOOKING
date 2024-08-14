import { useEffect, useState } from "react";
import useUserStore from "../store";
import { Link } from "react-router-dom";
import UserNav from "../components/UserNav";
import Footer from "../components/Footer";
import axios from "axios";
import {useNavigate} from "react-router-dom"

const UserProfile = () => {
  const { user , removeUser } = useUserStore();
  const [data, setData] = useState();
  const navigate = useNavigate()
  const headers = {
    Authorization: `Bearer ${user.token}`,
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/booking/getBookings/user/${user._id}` , headers
        );
        // console.log(res.data._doc);
        console.log(res.data[1]);
        setData(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [user._id]);

  const deleteUser = async () => {
   
    const confirmation = window.confirm("Are you sure you want to delete this user?");
  
    if (confirmation) {
      console.log("Yes");
      try {
        const res = await axios.delete(`http:localhost:5000/api/users/delete/user/${user._id}` , headers) 
        console.log(res)
        if(res.status === 200 || res.status === 204){
          removeUser()
          navigate('/')

        }
      } catch (error) {
        console.log(error)
        console.error(error.message)
      } 
    } else {
      console.log("No"); 
    }
  };
  


  return (
    <div className="bg-bg h-screen ">
      <UserNav />
      <div className="mx-20 pt-20 pb-4 flex items-center justify-between ">
        <div>
          <div className="flex gap-8">
            <h3>Name : </h3>
            <h3>
              {user.firstName} {user.lastName}
            </h3>
          </div>
          <div className="flex gap-8">
            <h3>Email : </h3>
            <h3>{user.email} </h3>
          </div>
        </div>
        <div className="my-2 flex gap-4">
          <Link
            to={"/update/user"}
            className="my-2 px-2 py-2 hover:bg-accent bg-neutral-600 text-white "
          >
            Update user
          </Link>
          <button
            onClick={deleteUser}
            className="my-2 px-2 py-2 hover:bg-accent bg-neutral-600 text-white "
          >
            Delete user
          </button>
        </div>
      </div>
      {data && data.length > 0 && (
        <div className="">
          <div className="mx-20 px-4 py-4 bg-black text-white grid grid-cols-8 border-y-[1px] border-black">
            <h3 className="col-span-2">id </h3>
            <h3 className="col-span-2">Turf</h3>
            <h3>Time</h3>
            <h3>Hours</h3>
            <h3>Date</h3>
            {/* <h3>Turf</h3> */}
          </div>
          {
            data
              .slice()
              .reverse()
              .map((booking) => {
                return (
                  <div
                    className="mx-24 px-4 py-4 bg-bg grid grid-cols-8 border-b-[1px] border-black"
                    key={booking._doc._id}
                  >
                    <h3 className="col-span-2">{booking._doc._id}</h3>
                    <h3 className="col-span-2">{booking.turfName}</h3>
                    <h3>{booking._doc.startTime}</h3>
                    <h3>{booking._doc.hours}</h3>
                    <h3>{booking._doc.date}</h3>
                  </div>
                );
              })}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default UserProfile;
