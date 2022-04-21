import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import NavbarUser from "../components/NavbarUser";
import fire from "../files/firebase";
import "../movie_details.css";

export const Booking = () => {
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
      .get()
      .then((snapshot) =>
        snapshot.forEach((ele) => {
          const data = ele.data();
          setuserbookings((arr) => [...arr, { data: data }]);
          // console.log(data);
        })
      );
  }, []);
  //console.log(userbookings);
  return (
    <div className="wrapper ">
      <link
        href="../assets/css/material-dashboard.css?v=2.1.2"
        rel="stylesheet"
      />
      <NavbarUser profile={profile} email={email} />

      <div className="main-panel">
        <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
          <div class="container-fluid">
            <div class="navbar-wrapper"></div>
            <button
              class="navbar-toggler"
              id="table-nav"
              type="button"
              data-toggle="collapse"
              aria-controls="navigation-index"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="sr-only">Toggle navigation</span>
              <span class="navbar-toggler-icon icon-bar"></span>
              <span class="navbar-toggler-icon icon-bar"></span>
              <span class="navbar-toggler-icon icon-bar"></span>
            </button>
          </div>
        </nav>
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header card-header-primary">
                    <h4 className="card-title">Bookings</h4>
                    <p className="card-category" id="card-category">
                      Movie Bookings Appear Here
                    </p>
                  </div>
                  <div className="card-body" id="movie-table-card">
                    <div className="table-responsive" id="movie-table">
                      <table className="table">
                        <thead className=" text-primary">
                          <th>Booking Date</th>
                          <th>Movie Name</th>
                          <th>Ceats Available</th>
                          <th>Movie Date</th>
                        </thead>
                        <tbody>
                          {userbookings.map((data, index) => {
                            console.log("🚀 ~ data", data);

                            return (
                              <tr key={index}>
                                <td>{data.data.bookingdate}</td>
                                <td>{data.data.movieName}</td>
                                <td>{data.data.seatNames}</td>
                                <td>{data.data.bookingdate}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
