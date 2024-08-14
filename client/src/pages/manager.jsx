import React, { useEffect, useState } from "react";
import UserNav from "../components/UserNav";
import useUserStore from "../store";
import axios from "axios";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import Footer from "../components/Footer.jsx";
import { Link } from "react-router-dom";
// import useUserStore from "../store";

function Manager() {
  const { user , removeUser } = useUserStore();
  const [data, setData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/booking/${user._id}`
        );
        setData(res.data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [user._id]);

  useEffect(() => {
    let revenue = 0;
    let bookingsCount = 0;

    data.forEach((booking) => {
      revenue += booking._doc.totalAmount;
      bookingsCount++;
    });

    setTotalRevenue(revenue);
    setTotalBookings(bookingsCount);
  }, [data]);

  const deleteUser = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmation) {
      console.log("Yes");
      try {
        const res = await axios.delete(
          `http://localhost:5000/api/turf/delete/${user._id}`,
          
        );
        console.log(res);
        if (res.status === 200 || res.status === 204) {
          removeUser();
          navigate("/");
        }
      } catch (error) {
        console.log(error);
        console.error(error.message);
      }
    } else {
      console.log("No");
    }
  };

  const calculateMonthlyBookings = () => {
    const monthlyBookings = {};

    data.forEach((booking) => {
      const date = new Date(booking._doc.date);
      const month = date.getMonth() + 1; // Months are zero-indexed, so we add 1
      const year = date.getFullYear();
      const monthYear = `${year}-${month}`;

      if (monthlyBookings[monthYear]) {
        monthlyBookings[monthYear]++;
      } else {
        monthlyBookings[monthYear] = 1;
      }
    });

    // Ensure all months are represented, even with zero bookings
    for (let i = 1; i <= 12; i++) {
      const monthYear = `${new Date().getFullYear()}-${i}`;
      if (!monthlyBookings[monthYear]) {
        monthlyBookings[monthYear] = 0;
      }
    }

    return monthlyBookings;
  };

  const monthlyBookingsData = Object.keys(calculateMonthlyBookings()).map(
    (key) => ({
      month: key,
      bookings: calculateMonthlyBookings()[key],
    })
  );

  // Sort the monthly bookings data array by month
  monthlyBookingsData.sort((a, b) => {
    const [aYear, aMonth] = a.month.split("-");
    const [bYear, bMonth] = b.month.split("-");
    return (
      parseInt(aYear) - parseInt(bYear) || parseInt(aMonth) - parseInt(bMonth)
    );
  });

  return (
    <div className=" bg-bg ">
      <UserNav />
      <div className="mx-24 pt-24 pb-4 border-b-[1px] border-black flex items-center justify-between">
        <div className="w-[25vw] ">
          <div className="grid grid-cols-2">
            <h3>Name : </h3>
            <h3>
              {user.firstName} {user.lastName}
            </h3>
          </div>
          <div className="grid grid-cols-2">
            <h3>Email : </h3>
            <h3>{user.email}</h3>
          </div>
          <div className="grid grid-cols-2">
            <h3>Phone : </h3>
            <h3>{user.phoneno}</h3>
          </div>
        </div>
        <div className="my-2 flex gap-4">
          <Link
            to={"/update/manager"}
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

      <div className="mx-16 py-8 bg-bg grid grid-cols-3 gap-4 w-max  ">
        <BarChart
          width={800}
          height={400}
          data={monthlyBookingsData}
          className="col-span-2"
        >
          <Bar dataKey="bookings" fill="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
        </BarChart>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center justify-items-center border-2 py-4 border-black ">
            <h3>Total Revenue</h3>
            <h3>{totalRevenue}</h3>
          </div>
          <div className="flex flex-col items-center justify-items-center border-2 py-4 border-black ">
            <h3>Total Bookings</h3>
            <h3>{totalBookings}</h3>
          </div>
        </div>
      </div>
      {data.length > 0 && (
        <div className="flex flex-col gap-0 justify-center">
          <div className="mx-24 px-4 py-4 bg-black text-white grid grid-cols-8 border-y-[1px] border-black">
            <h3 className="col-span-2">id </h3>
            <h3 className="col-span-2">User</h3>
            <h3>Time</h3>
            <h3>Hours</h3>
            <h3>Date</h3>
            {/* <h3>Turf</h3> */}
          </div>
          {data
            .slice()
            .reverse()
            .map((booking) => {
              return (
                <div
                  className="mx-24 px-4 py-4 bg-bg grid grid-cols-8 border-b-[1px] border-black"
                  key={booking._id}
                >
                  <h3 className="col-span-2">{booking._doc._id}</h3>
                  <h3 className="col-span-2">{booking.userName}</h3>
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
}

export default Manager;
