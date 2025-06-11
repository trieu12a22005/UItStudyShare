// import React, { useState, useEffect } from "react";

// function Profile({ user, onSave }) {
//   const [formData, setFormData] = useState({
//     username: "",
//     phone: "",
//     address: "",
//     birthday: "",
//     password: "",
//     avatarUrl: "",
//   });
//   const [data, setData] = useState({});

//   useEffect(() => {
//     const fetchApi = async () => {
//       try {
//         const response = await fetch("https://be-ltw.vercel.app/api/v1/users/detail", {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//           credentials: "include",
//         });
//         const result = await response.json();
//         if (!response.ok) throw new Error(`Lỗi ${result.code}: ${result.message}`);
//         setData(result);
//         setFormData({
//           username: result.username || "",
//           phone: result.phone || "",
//           address: result.address || "",
//           birthday: result.birthday ? result.birthday.slice(0, 10) : "",
//           password: "",
//           avatarUrl: result.avatarUrl || "",
//         });
//       } catch (error) {
//         console.error("Fetch user error:", error);
//       }
//     };
//     fetchApi();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData);
//   };

//   const handleAvatarChange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setFormData((prev) => ({ ...prev, avatarUrl: reader.result }));
//     };
//     if (file) reader.readAsDataURL(file);
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-10 bg-white rounded-lg shadow-md">
//       <div className="relative">
//         <div className="h-40 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-t-lg"></div>
//         <div className="absolute -bottom-12 left-6">
//           <div className="relative group w-32 h-32">
//             <img
//               src={formData.avatarUrl || "https://via.placeholder.com/150"}
//               alt="Avatar"
//               className="rounded-full border-4 border-white shadow-lg w-full h-full object-cover"
//             />
//             <div
//               className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition cursor-pointer"
//               onClick={() => document.getElementById("avatarInput").click()}
//             >
//               <i className="fas fa-camera text-white text-xl"></i>
//             </div>
//             <input
//               type="file"
//               id="avatarInput"
//               accept="image/*"
//               onChange={handleAvatarChange}
//               className="hidden"
//             />
//           </div>
//         </div>
//       </div>

//       <form className="pt-20 px-6 pb-6 space-y-6" onSubmit={handleSubmit}>
//         <div>
//           <label className="block font-medium text-gray-700">Username</label>
//           <input
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             disabled
//             className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//           />
//         </div>

//         <div>
//           <label className="block font-medium text-gray-700">Phone</label>
//           <input
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//           />
//         </div>

//         <div>
//           <label className="block font-medium text-gray-700">Address</label>
//           <input
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//           />
//         </div>

//         <div>
//           <label className="block font-medium text-gray-700">Birthday</label>
//           <input
//             type="date"
//             name="birthday"
//             value={formData.birthday}
//             onChange={handleChange}
//             className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//           />
//         </div>

//         <div className="pt-4">
//           <button
//             type="submit"
//             className="bg-indigo-600 text-white px-6 py-2 rounded-md font-medium hover:bg-indigo-700 transition"
//           >
//             Save Profile
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Profile;



import React, { useState, useEffect } from "react";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import AboutSidebar from "../../components/Profile/AboutSidebar";
import DocumentFilters from "../../components/Profile/DocumentFilters";
import DocumentCard from "../../components/Profile/DocumentCard";
import EditProfileModal from "../../components/Profile/EditProfileModal.";
import Tabs from "../../components/Profile/Tabs";
import Footer from "../../components/Footer/Footer";
import ProfileDocList from "../../components/Profile/Profiledoclist";

function Profile({ user, onSave }) {




  return (
    <>
      <ProfileHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT: Sidebar */}
          <div className="w-full lg:w-1/3">
            <AboutSidebar />
          </div>

          {/* RIGHT: Content */}
          <div className="w-full lg:w-2/3">
            {/* <DocumentFilters /> */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
            <ProfileDocList />
          </div>
          {/* </div> */}
        </div>
      </div>

      <EditProfileModal />
    </>
  );
}

export default Profile;






