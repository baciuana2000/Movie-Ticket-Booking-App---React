import React, { useEffect, useState } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import NavbarAdmin from "../components/NavbarAdmin";
import fire from "../files/firebase";
import "../movie_details.css";
import "./AdminRetreiveBooking.css";

export const AdminRetreiveBooking = () => {
  const history = useHistory();
  const location = useLocation();
  const profile = location.state.profile;
  const password = location.state.password;
  const name = location.state.name;
  const mobile = location.state.mobile;
  const email = location.state.email;
  const [progress, setprogress] = useState(false);
  const [bookingdate, setbookingdate] = useState("");
  const [userEmail, setuseremail] = useState("");
  const [userBooking, setUserBooking] = useState([]);
  const [selectedSerchField, setSelectedSerchField] = useState("bookingdate");
  const [checkedValue, setCheckedValue] = useState(true);

  const getData = (e) => {
    e.preventDefault();
    if (selectedSerchField === "email") {
      // if (userEmail === "") {
      //   alert("please fill date and username");
      // }
      setprogress(!progress);
      setUserBooking([]);
      fire
        .firestore()
        .collection("Bookings")
        .where("email", "==", userEmail)
        // .where("username", "==", username)
        .get()
        .then((snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setprogress(progress);
          snapshot.forEach((el) => {
            var data = el.data();
            setUserBooking((arr) => [...arr, { data: data }]);
          });
        });
    } else {
      setprogress(!progress);
      setUserBooking([]);
      fire
        .firestore()
        .collection("Bookings")
        .where("bookingdate", "==", bookingdate)
        .get()
        .then((snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setprogress(progress);
          snapshot.forEach((el) => {
            var data = el.data();
            setUserBooking((arr) => [...arr, { data: data }]);
          });
        });
      // fire
      //   .firestore()
      //   .collection("Bookings")
      //   .where("email ", "==", userEmail)
      //   // .where("username", "==", username)
      //   .get()
      //   .then((snapshot) => {
      //     const progress = Math.round(
      //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      //     );
      //     setprogress(progress);
      //     snapshot.forEach((el) => {
      //       var data = el.data();
      //       setUserBooking((arr) => [...arr, { data: data }]);
      //     });
      //   });
    }
  };

  const selectSerchedField = (e) => {
    setCheckedValue(!checkedValue);
    setSelectedSerchField(e.target.id);
  };

  useEffect(() => {
    console.log(
      "🚀 ~ file: AdminRetreiveBooking.js ~ line 80 ~ AdminRetreiveBooking ~ userBooking",
      userBooking
    );
  }, [userBooking]);

  return (
    <div className="wrapper">
      <link
        href="../assets/css/material-dashboard.css?v=2.1.2"
        rel="stylesheet"
      />

      <NavbarAdmin profile={profile} email={email} />

      <div className="main-panel">
        <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
          <div class="container-fluid">
            <div class="navbar-wrapper"></div>
            <button
              class="navbar-toggler"
              id="admin-book-nav"
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
        <div className="main-panel">
          <div
            class="form-container sign-in-container form-class"
            style={{
              height: "100%",
              left: "0",
              width: "100%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <form className="retrieve-form">
              <h2 className="retrieve-bookings" style={{ fontWeight: "bold" }}>
                Retrieve Bookings
              </h2>
              <br />
              <div
                style={{
                  width: "100%",
                  height: "auto",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <div>
                  <input
                    type="radio"
                    name="searchedField"
                    id="bookingdate"
                    className="checkbox"
                    onClick={selectSerchedField}
                    value={selectedSerchField}
                    checked={checkedValue}
                  />
                  <label>Booking date</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="searchedField"
                    id="email"
                    className="checkbox"
                    value={selectedSerchField}
                    onClick={selectSerchedField}
                  />
                  <label>Email</label>
                </div>
              </div>

              {selectedSerchField === "bookingdate" ? (
                <input
                  type="date"
                  placeholder="Pick Booking Date"
                  value={bookingdate}
                  onChange={(e) => setbookingdate(e.target.value)}
                />
              ) : (
                <input
                  type="text"
                  placeholder="email"
                  value={userEmail}
                  onChange={(e) => setuseremail(e.target.value)}
                />
              )}
              <input
                type="button"
                style={{ background: "#ff4b2b", color: "white" }}
                value="Get Data"
                onClick={getData}
              />
              <br />
              {progress == true ? (
                <progress max="100" label={`${progress}%`} value={progress} />
              ) : (
                <p></p>
              )}
            </form>
            <div>
              {userBooking.map((bookingdata, index) => {
                return (
                  <div key={index} className="card" id="retrieve-card">
                    <p>Booking Date : {bookingdata.data.bookingdate}</p>
                    <p>Email : {bookingdata.data.email}</p>
                    <p>movieName : {bookingdata.data.movieName}</p>
                    <p>Total Seats : {bookingdata.data.totalSeats}</p>
                    <p>Seat Names : {bookingdata.data.seatNames}</p>
                    <p>Total Cost : {bookingdata.data.totalCost}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
