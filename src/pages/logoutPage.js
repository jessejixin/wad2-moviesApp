import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import LogOut from "../components/logout"
import SiteHeader from "../components/siteHeader"





const logOutPage = (props) => {
  return (
    <>
    <SiteHeader/>
      <LogOut/>
      </>
  );
}

export default logOutPage; 