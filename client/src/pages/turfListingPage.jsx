import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import UserNav from "../components/UserNav";
import Search from "../components/serach";
import TurfCard from "../components/TurfCard";
import Footer from "../components/Footer";

function TurfListingPage() {
  const [data, setData] = useState([]);
  const locate = useLocation();
  const queryParams = new URLSearchParams(locate.search);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestData = {
          "name": queryParams.get("name"),
          "location": queryParams.get("location"),
          "minPrice": queryParams.get("minPrice"),
          "maxPrice": queryParams.get("maxPrice"),
          "date": queryParams.get("date"),
        };
        
        console.log(queryParams.get("date"))
        const res = await axios.post(
          "http://localhost:5000/api/booking/checkAvailability",
           requestData
        );
        console.log(res.data)
        setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [locate.search]);

  return (
    <div className="h-max bg-bg">
      <UserNav />
      <Search />
      <div className="flex flex-wrap px-24 py-20 gap-4">
        {data.map((turf, index) => (
          <TurfCard
            key={index}
            id = {turf._id}
            name={turf.turfName}
            location={turf.city}
            price={turf.price}
            imgUrl = {turf.imageUrl[0]}
            sImgUrl = {turf.imageUrl[1]}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default TurfListingPage;
