import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register/register.jsx";
import Login from "./pages/Login/Login.jsx";
import Otp from "./pages/otp/otp.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPassword from "./pages/Login/resetPassword/resetPassword.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Home from "./pages/Home/Home.jsx";
import EditProfile from "./pages/EditProfile/EditProfile.jsx";
import ChangePassword from "./pages/ChangePassword/ChangePassword.jsx";
import DocumentDetail from "./components/DocumentDetail/DocumentDetail.jsx";
import Document from "./components/Document/Document.jsx";
import Header from "./components/Headers/Header.jsx";
function App() {
  return (
    <>
    <Header />
      <ToastContainer /> {/* Di chuyển ra ngoài Routes */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<Otp />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
        <Route path="/password/change" element={<ChangePassword/>} />
        <Route path="/profile/edit" element= {<EditProfile />} />
        <Route path="/document" element={<Document />} />
        <Route path="/document/detail/:id"  element={<DocumentDetail />} />
      </Routes>
    </>
  );
}

export default App;
