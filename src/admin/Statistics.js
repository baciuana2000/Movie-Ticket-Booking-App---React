import React, { useEffect, useState } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import NavbarAdmin from "../components/NavbarAdmin";
import fire from "../files/firebase";
import "../movie_details.css";
import "./AdminRetreiveBooking.css";
import {
  // main component
  Chart,
  // graphs
  Bars,
  Cloud,
  Dots,
  Labels,
  Lines,
  Pies,
  RadialLines,
  Ticks,
  Title,
  // wrappers
  Layer,
  Animate,
  Transform,
  Handlers,
  // helpers
  helpers,
  DropShadow,
  Gradient,
} from "rumble-charts";

export const Statistics = () => {
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
  const series = [
    {
      data: [1, 2, 3],
    },
    {
      data: [5, 7, 11],
    },
    {
      data: [13, 17, 19],
    },
  ];
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
    }
  };

  return (
    <div className="wrapper">
      <link
        href="../assets/css/material-dashboard.css?v=2.1.2"
        rel="stylesheet"
      />

      <NavbarAdmin profile={profile} email={email} />

      <div className="main-panel">
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
            <Chart width={600} height={250} series={series} minY={0} maxY={20}>
              <Bars innerPadding={5} groupPadding={10} />
              <Lines />
              <Dots />
            </Chart>
          </div>
        </div>
      </div>
    </div>
  );
};
