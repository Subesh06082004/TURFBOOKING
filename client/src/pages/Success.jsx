import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import useUserStore from "../store";

const Success = () => {
  const { user } = useUserStore();
  const { bookingId } = useParams();

  const headers = {
    Authorization: `Bearer ${user.token}`,
  };

  useEffect(() => {
    console.log(bookingId);
    const deleteBooking = async () => {
      const res = await axios.put(
        `http://localhost:5000/api/booking/payment/success/${bookingId}`,
        {},
        { headers }
      );
      console.log(res);
    };
    deleteBooking();
  });

  return (
    <div className="h-screen bg-bg flex items-center justify-center flex-col text-2xl text-green-500 ">
      Payment succesfull
      <Link className="text-blue-500" to="/">
        Click on this link to continue shopping
      </Link>
    </div>
  );
};

export default Success;
