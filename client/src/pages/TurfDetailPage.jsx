import UserNav from "../components/UserNav";
import useUserStore from "../store";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../components/Loading";
import ErrorPage from "../components/ErrorPage";
import { loadStripe } from "@stripe/stripe-js";
import Footer from "../components/Footer";
function TurfDetailPage() {
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [hours, setHours] = useState(1);
  const [data, setData] = useState();
  const { turfId } = useParams();
  const [selectedTime, setSelectedTime] = useState(null);
  const { user } = useUserStore();
  const [excludedTimes, setExcludedTimes] = useState([]);
  const [blockedDates, setBlockedDates] = useState([]);

  const getBlockedDates = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/booking/getBlockedDates/${turfId}`
      );
      setBlockedDates(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getTurf = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`http://localhost:5000/api/turf/${turfId}`);
        setData(res.data);
        console.log(res.data);
        if (res.data) {
          const exclude = [...excludedTimes];
          const openingTime = new Date(res.data.openTime);
          const closingTime = new Date(res.data.closeTime);
          const openTime = openingTime.getHours();
          const closeTime = closingTime.getHours();

          console.log(openTime, closeTime);

          for (let i = 0; i < openTime; i++) {
            console.log(i, openTime);
            exclude.push(new Date().setHours(i, 0, 0, 0));
          }
          for (let i = closeTime; i <= 23; i++) {
            console.log(i, closeTime);
            exclude.push(new Date().setHours(i, 0, 0, 0));
          }
          console.log(exclude);
          setExcludedTimes(exclude);
        }
        // Set the fetched data into state
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false); // Ensure isLoading is set to false after request completion
      }
    };

    getTurf();
    getBlockedDates();
  }, [turfId, date]);


  useEffect(() => {
    const getTurfBooking = async () => {
      try {
        blockTime();
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        const isoString = `${year}-${month}-${day}T00:00:00.000Z`;

        const res = await axios.post(
          `http://localhost:5000/api/booking/getBookings/${turfId}`,
          { date: isoString }
        );
        console.log("booking data", res.data);
        // Update state with new bookings

        if (res.data && res.data.length > 0) {
          const excluded = res.data.flatMap((booking) => {
            const hour = parseInt(booking.startTime.split(":")[0]);

            //blockTime();
            console.log("ecluded times", excludedTimes);
            const excludeTimes = [...excludedTimes];
            // Excluding booked time
            console.log(excludeTimes);
            for (let i = hour; i <= hour + booking.hours - 1; i++) {
              //console.log(i, hour + booking.hours);
              excludeTimes.push(new Date().setHours(i, 0, 0, 0));
            }
            console.log(excludeTimes);
            return excludeTimes;
          });

          setExcludedTimes(excluded);
        }

        //console.log("excluded", excludedTimes);
      } catch (error) {
        console.error(error);
      }
    };

    const blockTime = () => {
      if (data) {
        const openingTime = new Date(data.openTime);
        const closingTime = new Date(data.closeTime);
        const openTime = openingTime.getHours();
        const closeTime = closingTime.getHours();
        const excludedTimes = [];
        for (let i = 0; i < openTime; i++) {
          console.log(i, openTime);
          excludedTimes.push(new Date().setHours(i, 0, 0, 0));
        }

        for (let i = closeTime; i <= 23; i++) {
          console.log(i, closeTime);
          excludedTimes.push(new Date().setHours(i, 0, 0, 0));
        }
        console.log("Useeffect", excludedTimes);
        setExcludedTimes(excludedTimes);
      }
    };
    getTurfBooking();
  }, [date, data, turfId]);

  const handleTurfBooking = async () => {
    try {
      if (!user) {
        toast.error("Login First");
        return;
      }

      // Prepare the booking data
      const startDateTime = new Date(date);
      const startHour = selectedTime.getHours();
      const startMinute = selectedTime.getMinutes();
      startDateTime.setHours(startHour, startMinute, 0, 0);
      const endDateTime = new Date(
        startDateTime.getTime() + hours * 60 * 60 * 1000
      );
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      const isoString = `${year}-${month}-${day}T00:00:00.000Z`;
      const body = {
        user: user._id,
        turf: turfId,
        totalAmount: hours * data.price,
        date: isoString,
        startTime: `${startDateTime
          .getHours()
          .toString()
          .padStart(2, "0")}:${startDateTime
          .getMinutes()
          .toString()
          .padStart(2, "0")}`,
        endTime: `${endDateTime
          .getHours()
          .toString()
          .padStart(2, "0")}:${endDateTime
          .getMinutes()
          .toString()
          .padStart(2, "0")}`,
        hours,
      };

      const headers = {
        Authorization: `Bearer ${user.token}`,
      };

      const bookingRes = await axios.post(
        "http://localhost:5000/api/booking/create",
        body,
        { headers }
      );
      console.log(bookingRes.status);
      if (bookingRes.status === 201) {
        const newBody = { ...body, bookingId: bookingRes.data._id };
        const res = await axios.post(
          "http://localhost:5000/api/booking/createPaymentSession",
          newBody,
          { headers }
        );
        const sessionId = res.data.id;

        // Redirect to Stripe checkout page
        const stripe = await loadStripe(
          "pk_test_51OFXvhSGECD7it2Q8lUnUVeWQn2pB9JfX7dhDqGDXyb8OWSLz4wYVCXQZPDwUG4YtijZXSGvUEoa828ceAYqXa6000i1VMpgKK"
        );
        const { error } = await stripe.redirectToCheckout({ sessionId });
        console.log(error);

        toast.success("Booking confirmed");
        setDate(new Date());
        setSelectedTime("");
        setHours(1);
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error(error.response.data);
      } else {
        toast.error(error.message);
      }
      console.error("Error:", error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <ErrorPage />;
  }

  // Format the opening time
  const openingTime = new Date(data.openTime);
  const openingTimeFormatted = openingTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const closingTime = new Date(data.closeTime);
  const closingTimeFormatted = closingTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  console.log(excludedTimes);
  return (
    <div>
      <UserNav />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
      />
      <div className="p-24 flex gap-20 ">
        <div className="flex flex-col gap-4">
          {data.imageUrl &&
            data.imageUrl.map((img) => {
              return (
                <img
                  src={`http://localhost:5000/uploads/${img}`}
                  alt="Turf image"
                  className="object-contain w-[35vw]  "
                />
              );
            })}
        </div>

        <div className="text-xl w-[30vw]  flex flex-col gap-3">
          <h2 className="text-5xl font-semibold">{data.turfName}</h2>
          <p className="text-neutral-500">{data.desc}</p>
          <h5 className="text-xl font-[500] text-neutral-700">
            Price : {data.price} per hour{" "}
          </h5>
          <h5 className="text-xl font-[500] text-neutral-700 ">
            Timings: {openingTimeFormatted} - {closingTimeFormatted}
          </h5>
          <h5 className="text-xl font-[500] text-neutral-700 ">
            Address : {data.address}
          </h5>
          <div className="p-4 bg-accent items-start text-white shadow-2xl flex flex-col gap-4  w-full">
            <h3>Book Turf</h3>
            <div className="flex items-center gap-6">
              <label>Date : </label>
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                minDate={new Date()}
                placeholderText="Select a date"
                isClearable
                className="rounded-sm p-2 text-black w-full"
                withPortal
                excludeDates={blockedDates}
                //timeFormat="HH:mm"
                //timeIntervals={60}
                //showTimeSelect
                dateFormat="yyyy-MM-dd "
              />
            </div>
            {console.log(excludedTimes)}
            <div className="flex items-center gap-6">
              <label>Time : </label>
              <DatePicker
                selected={selectedTime}
                onChange={(time) => setSelectedTime(time)}
                placeholderText="Select a time"
                isClearable
                className="rounded-sm p-2 text-black w-full"
                timeFormat="HH:mm"
                timeIntervals={60}
                showTimeSelect
                showTimeSelectOnly
                dateFormat="HH:mm"
                excludeTimes={excludedTimes}
              />
            </div>
            <div className="flex items-center gap-5">
              <label htmlFor="hours">Hours: </label>
              <input
                type="number"
                id="hours"
                min={1}
                className="p-2 w-full text-black"
                onChange={(e) => setHours(e.target.value)}
                value={hours}
                max={3}
              />
            </div>
            <button
              onClick={() => handleTurfBooking()}
              className="bg-[#FCA311]  text-black p-3 px-2 w-full"
            >
              Book Turf
            </button>
          </div>
         
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TurfDetailPage;
