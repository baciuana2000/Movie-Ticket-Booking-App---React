import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import LocalMoviesIcon from "@material-ui/icons/LocalMovies";
import DateRange from "@material-ui/icons/DateRange";
import WeekendSharpIcon from "@material-ui/icons/WeekendSharp";
import AttachMoneySharpIcon from "@material-ui/icons/AttachMoneySharp";
import fire from "../files/firebase";
import "../movie_details.css";
import "./DashboardUser.css";
import NavbarUser from "../components/NavbarUser";

export const DashboardUser = () => {
  const location = useLocation();
  const profile = location.state.profile;
  const name = location.state.name;
  const email = location.state.email;
  const password = location.state.password;
  const mobile = location.state.mobile;
  const [userbookings, setuserbookings] = useState([]);

  useEffect(() => {
    fire
      .firestore()
      .collection("Bookings")
      .where("email", "==", email)
      // .limit(1)
      .get()
      .then((snapshot) =>
        snapshot.forEach((ele) => {
          const data = ele.data();
          setuserbookings((arr) => [...arr, { data: data }]);
          // console.log(data);
        })
      );
  }, []);
  return (
    <div className="wrapper ">
      <link
        href="../assets/css/material-dashboard.css?v=2.1.2"
        rel="stylesheet"
      />
      <NavbarUser profile={profile} email={email} />

      <div className="main-panel">
        <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
          <div className="container-fluid">
            <div className="navbar-wrapper"></div>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              aria-controls="navigation-index"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="navbar-toggler-icon icon-bar"></span>
              <span className="navbar-toggler-icon icon-bar"></span>
              <span className="navbar-toggler-icon icon-bar"></span>
            </button>
          </div>
        </nav>
        <div className="content">
          <div className="container-fluid" id="dashboard">
            {userbookings.map((data, index) => {
              return (
                <div class="row dashboardCardsContainer" key={index}>
                  <div class="col-lg-3 col-md-6 col-sm-6 dashboardCard"></div>
                  <div class="col-lg-2 col-md-6 col-sm-6 dashboardCard">
                    <div class="card card-stats">
                      <div class="card-header card-header-warning card-header-icon">
                        <div class="card-icon">
                          <i class="material-icons">
                            <LocalMoviesIcon />
                          </i>
                        </div>
                        <p class="card-category">Movie Name</p>
                        <p class="card-title">{data.data.movieName}</p>
                      </div>
                      <div class="card-footer">
                        <div class="stats">
                          <i class="material-icons text-danger">warning</i>
                          Movie Name
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-2 col-md-6 col-sm-6 dashboardCard">
                    <div class="card card-stats">
                      <div class="card-header card-header-success card-header-icon">
                        <div class="card-icon">
                          <i class="material-icons">
                            <DateRange />
                          </i>
                        </div>
                        <p class="card-category">Movie Date</p>
                        <p class="card-title">{data.data.bookingdate}</p>
                      </div>
                      <div class="card-footer">
                        <div class="stats">
                          <i class="material-icons">date_range</i> Movie Date
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-2 col-md-6 col-sm-6 dashboardCard">
                    <div class="card card-stats">
                      <div class="card-header card-header-danger card-header-icon">
                        <div class="card-icon">
                          <i class="material-icons">
                            <WeekendSharpIcon />
                          </i>
                        </div>
                        <p class="card-category">Ceat Number</p>
                        <p class="card-title">{data.data.seatNames}</p>
                      </div>
                      <div class="card-footer">
                        <div class="stats">
                          <i class="material-icons">local_offer</i> Ceat Number
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-2 col-md-6 col-sm-6 dashboardCard">
                    <div class="card card-stats">
                      <div class="card-header card-header-info card-header-icon">
                        <div class="card-icon">
                          <i class="material-icons">
                            <AttachMoneySharpIcon />
                          </i>
                        </div>
                        <p class="card-category">Total Amount</p>
                        <p class="card-title">{data.data.totalCost}</p>
                      </div>
                      <div class="card-footer">
                        <div class="stats">
                          <i class="material-icons">update</i> Total Amount
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
