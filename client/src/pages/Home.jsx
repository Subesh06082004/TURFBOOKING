import Nav from "../components/Nav";
import Footer from "../components/Footer";
import heroImg1 from "../assets/heroImg1.png";
import heroImg2 from "../assets/heroImg2.png";
import whyUsImg from "../assets/whyUsImg.png";
import useUserStore from "../store";
import UserNav from "../components/UserNav"
import Manager from "./manager";
import { Link } from "react-router-dom";

function Home() {
  const {user} = useUserStore()

  return (
    <div className="h-screen ">
      {user ?  <UserNav /> :  <Nav /> }
      

      <div className="flex px-20 pt-28 py-8 ">
        {/* ----------- text -------------- */}
        <div className="flex flex-col gap-2 pt-24 px-4">
          <h2 className="font-bold uppercase text-accent text-[2.3rem] leading-10 ">
            Simplify your turf <br />
            booking experience with <br />
            <span
              className="relative font-bold text-[2.3rem]
              before:absolute before:inset-0 before:bg-bg
              before:animate-typewriter"
            >
              Book My Pitch
            </span>
          </h2>
          <p className="text-xl w-[90%] text-slate-900 mb-2 ">
            Discover the ultimate destination for booking turf for cricket,
            football, or any sport you desire.
          </p>
          <div className="flex gap-4">
            <Link to={`${user ? `/turfListing?minPrice=0&maxPrice=10000` : '/login'}`} className="hover:bg-accent text-lg font-medium bg-black text-white w-[40%] px-8 py-2">
              Book Turf
            </Link >
            {user ? "" : <Link to={"/registerTurf"} className="hover:bg-accent hover:text-white text-lg font-medium border-[1px] w-[40%] border-black py-2 px-4">
              Register Turf
            </Link > }
            
          </div>
        </div>
        {/* -------------  hero images ------------ */}
        <div className="relative w-[50vw]">
          <img src={heroImg1} alt="" className="absolute top-0 right-30" />
          <img src={heroImg2} alt="" className="absolute top-16 right-20" />
        </div>
      </div>

      {/* ---------- WHY US SECTION ------------ */}
      <div className=" p-24 mt-40 h-screen bg-bg  ">
        <div className="    bg-bg flex items-center gap-8">
          {/* WHY US TEXT */}
          <div>
            <h2 className="text-[2.3rem] font-semibold text-accent underline">
              WHY US
            </h2>
            <p className="text-2xl mt-4">
              Choose Book My Pitch for hassle-free turf bookings and unlock a
              world of convenience and choice. With our user-friendly platform,
              you can effortlessly find and reserve the perfect turf for your
              favorite sports like cricket, football, and more. We pride
              ourselves on offering a seamless booking experience, saving you
              time and effort. Plus, with our wide range of available pitches,
              you'll always find the ideal venue to suit your needs. Trust Book
              My Pitch for your next game and experience the difference
              firsthand.
            </p>
          </div>
          {/* WHY US IMG */}
          <img src={whyUsImg} alt="" className=" shadow-3xl w-[40vw]" />
        </div>
      </div>
      {/* --------- Customer review ------------- */}
      <div className="bg-bg p-24">
        <h2 className="text-[2.3rem] font-semibold text-accent underline">
          What our customers have to say{" "}
        </h2>
        <div className="flex gap-12">
          {/* ----- review card 1 ------- */}
          <div className="w-[30%] flex flex-col justify-between shadow-3xl p-4 border-[1px] border-black mt-8">
            <p className="text-xl">
              "Booking a turf through Book My Pitch was a game-changer for our
              weekend football matches! The process was so simple and quick, and
              we found a great pitch in no time. Highly recommend for anyone
              looking for convenience and quality."
            </p>
            <h2 className="text-xl mt-2 text-right">-Sachin Rathode</h2>
          </div>
          {/* ----- review card 2 ------- */}
          <div className="w-[30%] flex flex-col justify-between  shadow-3xl p-4 border-[1px] border-black mt-8">
            <p className="text-xl">
              "As a cricket enthusiast, finding the right turf for our practice
              sessions used to be a headache. But thanks to Book My Pitch, those
              days are over. Their platform is easy to navigate, and we always
              manage to secure a top-notch pitch. Couldn't be happier with the
              service!"
            </p>
            <h2 className="text-xl mt-2 text-right">-Vivan Sharma</h2>
          </div>
          {/* ----- review card 3 ------- */}
          <div className="w-[30%] shadow-3xl flex flex-col justify-between p-4 border-[1px] border-black mt-8">
            <p className="text-xl">
              "Book My Pitch exceeded all expectations for our corporate sports
              event. From the variety of pitches to the seamless booking
              process, everything was flawless. Our event was a success, thanks
              to Book My Pitch! 5 stars!"
            </p>
            <h2 className="text-xl mt-2 text-right ">-Harsh Balani</h2>
          </div>
        </div>
      </div>
      {/* --------- Join our community section -------- */}
      <div className="bg-bg p-24">
        <h2 className="text-5xl  p-8 border-[1px] border-black bg-orange-200">
          Join our amazing community by registering your turf : {" "}
          <Link to={"/registerTurf"} className="underline text-accent">Register Turf</Link>
        </h2>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
