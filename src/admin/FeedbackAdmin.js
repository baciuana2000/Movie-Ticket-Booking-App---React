import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import fire from "../files/firebase";
import { Link } from "react-router-dom";
import "./FeedbackAdmin.css";
import { WidgetsTwoTone } from "@material-ui/icons";
import NavbarAdmin from "../components/NavbarAdmin";

export const FeedbackAdmin = () => {
  const history = useHistory();
  const location = useLocation();
  const profile = location.state.profile;
  const name = location.state.name;
  const email = location.state.email;
  const password = location.state.password;
  const mobile = location.state.mobile;
  const [data, setdata] = useState([]);
  useEffect(() => {
    fire
      .firestore()
      .collection("feedback")
      .get()
      .then((snapshot) => {
        snapshot.forEach((ele) => {
          var data = ele.data();
          setdata((arr) => [...arr, { data: data }]);
        });
      });
  }, []);
  return (
    <div className="wrapper ">
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

        <div className="feedbackCardsContainer">
          <h2>User Feedback</h2>
          <div>
            {data.map((datas) => {
              return (
                <div
                  className="card"
                  style={{ padding: "56px", width: "555px" }}
                >
                  <p>Email : {datas.data.email}</p>
                  <p>Feedback : {datas.data.feedback}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
