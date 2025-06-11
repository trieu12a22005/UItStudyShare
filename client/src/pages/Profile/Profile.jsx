import React, { useState, useEffect } from "react";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import AboutSidebar from "../../components/Profile/AboutSidebar";
import DocumentFilters from "../../components/Profile/DocumentFilters";
import DocumentCard from "../../components/Profile/DocumentCard";
import EditProfileModal from "../../components/Profile/EditProfileModal.";
import Tabs from "../../components/Profile/Tabs";
import Footer from "../../components/Footer/Footer";
import ProfileDocList from "../../components/Profile/ProfileDocList";
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






