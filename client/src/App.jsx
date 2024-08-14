import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RegisterTurf1 from "./pages/RegisterTurf1";
import Register from "./pages/Register";
import TurfListingPage from "./pages/turfListingPage";
import TurfDetailPage from "./pages/TurfDetailPage";
import Manager from "./pages/manager";
import RegisterTurf from "./pages/RegisterTurf.jsx"
import Cancel from "./pages/cancel.jsx";
import Success from "./pages/Success.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import UpdateUser from "./pages/UpdateUser.jsx";
import UpdateManager from "./pages/UpdateManager.jsx";

function App() {
  return (
    <div className=" bg-bg h-max ">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/registerTurf" element={<RegisterTurf />} />
          <Route path="/turfListing" element={<TurfListingPage />} />
          <Route path="/turf/:turfId" element={<TurfDetailPage />} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/success/:bookingId" element={<Success />} />
          <Route path="/cancel/:bookingId" element={<Cancel />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/update/user" element={<UpdateUser />} />
          <Route path="/update/manager" element={<UpdateManager />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
