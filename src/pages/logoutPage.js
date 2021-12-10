import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import LogOut from "../components/logout"
import SiteHeader from "../components/siteHeader"
import UpdateProfile from "../components/updateProfile"




const logOutPage = (props) => {
  return (
    <>
    <SiteHeader/>
      <LogOut/>
      <UpdateProfile/>
      </>
  );
}

export default logOutPage; 