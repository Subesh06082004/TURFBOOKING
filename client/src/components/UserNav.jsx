import { Link } from "react-router-dom";
import logo from "../assets/bookMyPitch.png";
import useUserStore from "../store";
import { useNavigate } from "react-router-dom";

function UserNav() {
  const { user, removeUser } = useUserStore();
  //  console.log(user)
  const date = new Date();
  const navigate = useNavigate();
  function logout() {
    removeUser();
    navigate("/");
  }

  return (
    <nav className="fixed top-0 bg-bg z-30 w-screen px-20 py-1 flex items-center justify-between border-b-[1px] border-stone-500 ">
      {user.isManager ? (
        <div className="flex gap-2 items-center ">
          {" "}
          <img src={logo} alt="book my pitch logo" />
          <h2 className="text-xl font-bold text-accent">BOOK MY PITCH</h2>
        </div>
      ) : (
        <Link to={"/"} className="flex gap-2 items-center ">
          <img src={logo} alt="book my pitch logo" />
          <h2 className="text-xl font-bold text-accent">BOOK MY PITCH</h2>
        </Link>
      )}


      <div className="flex items-center gap-16 font-medium text-lg">
        {user.isManager ? (
          <Link to={`/manager`}>DashBoard</Link>
        ) : (
          <Link to={`/turfListing?minPrice=0&maxPrice=10000`}>Book Turf</Link>
        )}
        {/* <Link to={`/turfListing?minPrice:0&&maxPrice:10000`}>Book Turf</Link > */}
        <button onClick={() => logout()}>Logout</button>
        {user ? <Link className="font-medium text-lg" to={"/profile"} >{user.firstName}</Link> : <h2>User</h2>}
        {/* <h2>{user ? user.firstName : "user"}</h2> */}
      </div>
    </nav>
  );
}
export default UserNav;
