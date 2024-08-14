import turfImg from "../assets/turfImage.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TurfCard(props) {
  const navigate = useNavigate();
  const [imgUrl, setImgUrl] = useState(props.imgUrl);
  function handleMouseEnter() {
    setImgUrl(props.sImgUrl);
  }

  function handleMouseLeave() {
    setImgUrl(props.imgUrl);
  }

  return (
    <div
      onClick={() => navigate(`/turf/${props.id}`)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-[25vw] rounded-lg overflow-hidden hover:shadow-2xl hover:border-2 hover:border-black"
    >
      <img
        src={`http://localhost:5000/uploads/${imgUrl}`}
        alt=""
        className="object-cover w-full h-[50vh]"
      />
      <div className="absolute bottom-0 w-full">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="text-white p-4 relative z-10">
          <h3 className="mb-1">
            <span>{props.name}</span>
            <span>- {props.location}</span>
          </h3>
          <h3>{props.price} RS per hour</h3>
        </div>
      </div>
    </div>
  );
}

export default TurfCard;
