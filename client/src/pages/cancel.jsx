import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import useUserStore from "../store";

const Cancel = () => {
  const { user } = useUserStore();
  const { bookingId } = useParams();

  const headers = {
    Authorization: `Bearer ${user.token}`,
  };

  useEffect(() => {
    console.log(bookingId);
    const deleteBooking = async () => {
      const res = await axios.delete(
        `http://localhost:5000/api/booking/delete/${bookingId}`,
        { headers }
      );
      console.log(res);
    };
    deleteBooking();
  });

  return (
    <div className="h-screen bg-bg flex items-center justify-center flex-col text-2xl text-red-500 ">
      Payment unsuccessfull
      <Link className="text-blue-500" to="/">
        Click on this link to continue shopping
      </Link>
    </div>
  );
};

export default Cancel;
