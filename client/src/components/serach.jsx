import React, { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Search() {
  const [startDate, setStartDate] = useState(new Date());
  const [locations, setLocations] = useState([]);
  const [name, setName] = useState(null);
  const [date, setDate] = useState(new Date());
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [location, setLocation] = useState(null);
  const navigate = useNavigate();



  useEffect(() => {
    const getAllLocations = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/turf/location");
        if (res.status === 200) {
          setLocations(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllLocations();
  }, []);

  const searchTurf = async (e) => {
    e.preventDefault();
    const dateObject = new Date(date);
    const yyyy = dateObject.getFullYear();
    const mm = dateObject.getMonth();
    const dd = dateObject.getDate();
    const isoString = `${yyyy}-${mm}-${dd}T00:00:00.000Z`;
    //const formattedDate = `${yyyy}-${mm}-${dd}`;
    console.log(name, location, minPrice, maxPrice, isoString);
    let queryString = `/turfListing?`;
    queryString += name ? `name=${name}&` : "";
    queryString += location ? `location=${location}&` : "";
    queryString += minPrice ? `minPrice=${minPrice}&` : "";
    queryString += maxPrice ? `maxPrice=${maxPrice}&` : "";
    queryString += isoString ? `date=${isoString}` : "";

    navigate(queryString);
  };

  return (
    <div className="pt-24 pb-8 px-20 bg-accent items-center justify-center flex gap-4">
      <input
        type="text"
        name=""
        id=""
        className="w-[15vw] px-4 py-2   rounded-sm"
        placeholder="Search by name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      
      <div className="flex gap-2 bg-accent w-[15vw] ">
        <input
          type="number"
          name=""
          id=""
          min={0}
          className="p-2 w-1/2"
          placeholder="0"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          name=""
          id=""
          className="p-2 w-1/2"
          placeholder="10000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      <Dropdown
        options={locations}
        onChange={(selectedOption) => setLocation(selectedOption.value)}
        value={location}
        placeholder="Select an Location"
      />
      <button
        className="bg-[#FCA311] p-2 px-12 w-max  "
        onClick={(e) => searchTurf(e)}
      >
        Search{" "}
      </button>
    </div>
  );
}

export default Search;
