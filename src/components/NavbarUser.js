import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
export default function Navbar({ profile, email }) {
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
        <ul className="nav">
          <NavLink
            activeClassName="is-active"
            to={{
              pathname: "/homepage",
              state: {
                profile: profile,
                //   name: name,
                email: email,
                //   password: password,
                //   mobile: mobile,
              },
            }}
            className="navbarItem"
          >
            <div>
              <i className="material-icons">home</i>
              <p>Home</p>
            </div>
          </NavLink>
          <NavLink
            activeClassName="is-active"
            to={{
              pathname: "/dashboard",
              state: {
                profile: profile,
                //   name: name,
                email: email,
                //   password: password,
                //   mobile: mobile,
              },
            }}
            className="navbarItem"
          >
            <div>
              <i className="material-icons">dashboard</i>
              <p>Dashboard</p>
            </div>
          </NavLink>

          <NavLink
            activeClassName="is-active"
            to={{
              pathname: "/bookings",
              state: {
                profile: profile,
                //   name: name,
                email: email,
                //   password: password,
                //   mobile: mobile,
              },
            }}
            className="navbarItem"
          >
            <div>
              <i className="material-icons">content_paste</i>
              <p>Bookings</p>
            </div>
          </NavLink>

          <NavLink
            activeClassName="is-active"
            to={{
              pathname: "/userprofile",
              state: {
                profile: profile,
                //   name: name,
                email: email,
                //   password: password,
                //   mobile: mobile,
              },
            }}
            className="navbarItem"
          >
            <div>
              <i className="material-icons">person</i>
              <p>User Profile</p>
            </div>
          </NavLink>
          <NavLink
            activeClassName="is-active"
            to={{
              pathname: "/feedback",
              state: {
                profile: profile,
                //   name: name,
                email: email,
                //   password: password,
                //   mobile: mobile,
              },
            }}
            className="navbarItem"
          >
            <div>
              <i className="material-icons">notifications</i>
              <p>Feedback</p>
            </div>
          </NavLink>
          <NavLink to="" className="navbarItem">
            <div>
              <i className="material-icons">logout</i>
              <p>Logout</p>
            </div>
          </NavLink>
        </ul>
      </div>
    </div>
  );
}
