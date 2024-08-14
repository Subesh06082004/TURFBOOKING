import { Link } from "react-router-dom"
import logo from "../assets/bookMyPitch.png"

function Nav() {
  return (
    <nav className="fixed top-0 bg-bg z-30 w-screen px-20 py-2 flex items-center justify-between border-b-[1px] border-stone-500 ">
        <Link to={"/"} className="flex gap-2 items-center ">
            <img src={logo} alt="book my pitch logo" />
            <h2 className="text-xl font-bold text-accent">BOOK MY PITCH</h2>
        </Link>
        <div className="flex items-center gap-16 font-medium text-lg">
            <Link  to={"/registerTurf"}>Register Your Turf</Link>
            <Link to={"/login"}>Login</Link>
            <Link to={"/register"}>Signup</Link>

        </div>
    </nav>
  )
}

export default Nav