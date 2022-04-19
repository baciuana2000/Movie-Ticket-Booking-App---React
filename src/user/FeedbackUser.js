import React, { useState } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import NavbarUser from "../components/NavbarUser";
import fire from "../files/firebase";
import "../movie_details.css";

export const FeedbackUser = () => {
  const location = useLocation();
  const profile = location.state.profile;
  const name = location.state.name;
  const email = location.state.email;
  const password = location.state.password;
  const mobile = location.state.mobile;
  const [feedback, setfeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || feedback === "") {
      alert("please enter feedback");
    } else {
      fire
        .firestore()
        .collection("feedback")
        .add({
          email: email,
          feedback: feedback,
        })
        .then(() => alert("feedback submitted successfully"))
        .catch((err) => console.log(err));
      setfeedback("");
    }
  };
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
              className="navbar-toggler"
              id="navbar"
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
        <div
          class="form-container sign-in-container"
          className="feedback-form"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <form
            className="feedback"
            style={{
              background: "#f6f5f7",
              display: "flinline flow-root list-item",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              padding: "0 50px",
              height: "100%",
              textAlign: "center",
              width: "max-content",
            }}
          >
            <h1
              style={{
                fontWeight: "bold",
                margin: "0",
                fontSize: "2em",
              }}
            >
              Give Your Feedback
            </h1>
            <span></span>
            <br />

            <input
              type="text"
              placeholder="email"
              value={email}
              style={{
                backgroundColor: "#eee",
                border: "none",
                padding: "12px 15px",
                margin: "8px 0",
                width: "100%",
              }}
            />
            <textarea
              placeholder="Give feedback"
              value={feedback}
              onChange={(e) => setfeedback(e.target.value)}
              style={{
                backgroundColor: "#eee",
                border: "none",
                padding: "12px 15px",
                margin: "8px 0",
                width: "100%",
              }}
            />
            <br />
            <button
              style={{
                borderRadius: "100px",
                border: "1px solid #ff4b2b",
                backgroundColor: "#ff4b2b",
                color: "#ffffff",
                fontSize: "12px",
                fontWeight: "bold",
                padding: "12px 45px",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
