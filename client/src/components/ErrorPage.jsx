import errorimg  from "../assets/404.png"
import UserNav from "./UserNav"

const ErrorPage = ( ) => {
    return <div className="flex items-center justify-center h-screen">
        <UserNav />
        <img src={errorimg} alt="eror 404 page not found" className="w-[40vw]" />
    </div>
}

export default ErrorPage