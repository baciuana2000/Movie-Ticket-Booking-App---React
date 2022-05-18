import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
export default function NavbarAdmin({ profile, email }) {
  return (
    <div
      className="sidebar"
      data-color="purple"
      data-background-color="white"
      data-image="../assets/img/sidebar-1.jpg"
      style={{ width: "200px" }}
    >
      <div className="logo">
        <a
          href="http://www.creative-tim.com"
          className="simple-text logo-normal"
        >
          AK CINEMAS
        </a>
      </div>
      <div className="sidebar-wrapper">
        <NavLink
          activeClassName="is-active"
          to={{
            pathname: "/adminpage",
            state: {
              profile: profile,
              // name: name,
              email: email,
              // password: password,
              // mobile: mobile,
            },
          }}
          className="navbarItem"
        >
          <div className="navbarNameAndIcon">
            <i className="material-icons">home</i>
            <p className="navbarItemText">Home</p>
          </div>
        </NavLink>
        <NavLink
          activeClassName="is-active"
          to={{
            pathname: "/movieupload",
            state: {
              profile: profile,
              // name: name,
              email: email,
              // password: password,
              // mobile: mobile,
            },
          }}
          className="navbarItem"
        >
          <div className="navbarNameAndIcon">
            <i className="material-icons">dashboard</i>
            <p className="navbarItemText">Movie Upload</p>
          </div>
        </NavLink>
        <NavLink
          activeClassName="is-active"
          to={{
            pathname: "/statistics",
            state: {
              profile: profile,
              // name: name,
              email: email,
              // password: password,
              // mobile: mobile,
            },
          }}
          className="navbarItem"
        >
          <div className="navbarNameAndIcon">
            <i className="material-icons">dashboard</i>
            <p className="navbarItemText">Statistics</p>
          </div>
        </NavLink>
        <NavLink
          activeClassName="is-active"
          to={{
            pathname: "/adminbooking",
            state: {
              profile: profile,
              // name: name,
              email: email,
              // password: password,
              // mobile: mobile,
            },
          }}
          className="navbarItem"
        >
          <div className="navbarNameAndIcon">
            <i className="material-icons">content_paste</i>
            <p className="navbarItemText">Retrieve Bookings</p>
          </div>
        </NavLink>
        <NavLink
          activeClassName="is-active"
          to={{
            pathname: "/AdminProfile",
            state: {
              profile: profile,
              // name: name,
              email: email,
              // password: password,
              // mobile: mobile,
            },
          }}
          className="navbarItem"
        >
          <div className="navbarNameAndIcon">
            <i className="material-icons">person</i>
            <p className="navbarItemText">User Profile</p>
          </div>
        </NavLink>
        <NavLink
          activeClassName="is-active"
          to={{
            pathname: "/retrievefeedback",
            state: {
              profile: profile,
              // name: name,
              email: email,
              // password: password,
              // mobile: mobile,
            },
          }}
          className="navbarItem"
        >
          <div className="navbarNameAndIcon">
            <i className="material-icons">notifications</i>
            <p className="navbarItemText">Feedback</p>
          </div>
        </NavLink>
        <NavLink to="" className="navbarItem">
          <div className="navbarNameAndIcon">
            <i className="material-icons">logout</i>
            <p className="navbarItemText">Logout</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
}
