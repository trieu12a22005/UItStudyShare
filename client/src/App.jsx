import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register/register.jsx";
import Login from "./pages/Login/Login.jsx";
import Otp from "./pages/otp/otp.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPassword from "./pages/Login/resetPassword/resetPassword.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Home from "./pages/Home/Home.jsx";
import ChangePassword from "./pages/ChangePassword/ChangePassword.jsx";
import Document from "./pages/Document/Document.jsx";
import Header from "./components/Headers/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import DocumentDetail from "./pages/DocumentDetail/DocumentDetail.jsx";
import UploadFlow from "./pages/uploadFile/upload.jsx";
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
        <Route path="/documents" element={<Document />} />
        <Route path="/documents/detail/:id"  element={<DocumentDetail />} />
        <Route path="/documents/upload" element={<UploadFlow />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
