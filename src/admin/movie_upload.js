import React, { useState } from "react";
import ReactDropdown from "react-dropdown";
import { useHistory, useLocation, Link } from "react-router-dom";
import "react-dropdown/style.css";

import fire from "../files/firebase";
import "../movie_details.css";

export const Movieupload = () => {
  const movieGenderList = ["Comedy", "Drama", "Action"];
  const [image, setimage] = useState(
    "https://static1.colliderimages.com/wordpress/wp-content/uploads/2021/11/teen-wolf-seasons-ranked.jpg"
  );
  const [moviename, setMovieName] = useState("Default name");
  const [movieGender, setMovieGender] = useState("Comedie");
  const [ticketcost, setTicketCost] = useState("100");
  const [description, setdescription] = useState("Default description");
  const [actorname, setactorname] = useState("Default Actor Name");
  const [directorname, setdirectorname] = useState("Default director name");
  const [releasedate, setreleasedate] = useState("2022-03-22");
  const [outdate, setoutdate] = useState("2022-03-22");
  const [viedo, setviedo] = useState(
    "https://www.youtube.com/watch?v=vXf3gVYXlHg"
  );
  const history = useHistory();
  const location = useLocation();
  const profile = location.state.profile;
  const name = location.state.name;
  const email = location.state.email;
  const password = location.state.password;
  const mobile = location.state.mobile;
  const movieUpload = (e) => {
    e.preventDefault();
    if (
      moviename === "" ||
      image === "" ||
      viedo === "" ||
      description === "" ||
      actorname === "" ||
      directorname === "" ||
      releasedate === "" ||
      outdate === ""
    ) {
      alert("please fill all fields");
    } else {
      fire
        .firestore()
        .collection("currentmovies")
        .add({
          moviename: moviename,
          image: image,
          viedourl: viedo,
          ticketcost: ticketcost,
          description: description,
          movieGender: movieGender,
          actorname: actorname,
          directorname: directorname,
          releasedate: releasedate,
          outdate: outdate,
        })
        .then(() => {
          alert("Movie Added Successfully");
          setimage("");
          setviedo("");
          setMovieName("");
          setTicketCost("");
          setdescription("");
          setactorname("");
          setdirectorname("");
          setreleasedate("");
          setoutdate("");
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="wrapper ">
      <link
        href="../assets/css/material-dashboard.css?v=2.1.2"
        rel="stylesheet"
      />
      <div
        className="sidebar"
        data-color="purple"
        data-background-color="white"
        data-image="../assets/img/sidebar-1.jpg"
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
            <li className="nav-item">
              <Link
                to={{
                  pathname: "/adminpage",
                  state: {
                    profile: profile,
                    name: name,
                    email: email,
                    password: password,
                    mobile: mobile,
                  },
                }}
                className="nav-link"
              >
                <i className="material-icons">home</i>
                <p>Home</p>
              </Link>
            </li>
            <li className="nav-item active">
              <Link
                to={{
                  pathname: "/movieupload",
                  state: {
                    profile: profile,
                    name: name,
                    email: email,
                    password: password,
                    mobile: mobile,
                  },
                }}
                className="nav-link"
              >
                <i className="material-icons">dashboard</i>
                <p>Movie Upload</p>
              </Link>
            </li>
            <li className="nav-item ">
              <Link
                to={{
                  pathname: "/adminbooking",
                  state: {
                    profile: profile,
                    name: name,
                    email: email,
                    password: password,
                    mobile: mobile,
                  },
                }}
                className="nav-link"
              >
                <i className="material-icons">content_paste</i>
                <p>Retrieve Bookings</p>
              </Link>
            </li>
            <li className="nav-item ">
              <Link
                to={{
                  pathname: "/adminprofile",
                  state: {
                    profile: profile,
                    name: name,
                    email: email,
                    password: password,
                    mobile: mobile,
                  },
                }}
                className="nav-link"
              >
                <i className="material-icons">person</i>
                <p>User Profile</p>
              </Link>
            </li>
            <li className="nav-item ">
              <Link
                to={{
                  pathname: "/retrievefeedback",
                  state: {
                    profile: profile,
                    name: name,
                    email: email,
                    password: password,
                    mobile: mobile,
                  },
                }}
                className="nav-link"
              >
                <i className="material-icons">notifications</i>
                <p>Feedback</p>
              </Link>
            </li>
            <li className="nav-item ">
              <Link to="" className="nav-link">
                <i className="material-icons">logout</i>
                <p>Logout</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="main-panel">
        <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
          <div class="container-fluid">
            <div class="navbar-wrapper"></div>
            <button
              class="navbar-toggler"
              id="upload"
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
            class="form-container sign-in-container"
            style={{
              height: "auto",
              left: "0",
              width: "max-content",
              zIndex: 2,
              marginLeft: "33%",
              marginTop: "9%",
            }}
          >
            <form
              className="upload-form"
              style={{
                background: "#f6f5f7",
                marginLeft: "-50%",
                marginTop: "inherit",
              }}
            >
              <h2 className="upload-font" style={{ fontWeight: "bold" }}>
                Upload Theater Movies
              </h2>
              <br />
              <div className="rowContainer">
                <div className="labelInputWrapper">
                  <label className="formLabel" for="name">
                    Image Url
                  </label>
                  <input
                    className="formInput"
                    type="text"
                    placeholder="movie image url"
                    value={image}
                    onChange={(e) => setimage(e.target.value)}
                  />
                </div>

                <div className="labelInputWrapper">
                  <label className="formLabel" for="name">
                    Video Url
                  </label>
                  <input
                    className="formInput"
                    type="text"
                    placeholder="movie viedo url"
                    value={viedo}
                    onChange={(e) => setviedo(e.target.value)}
                  />
                </div>

                <div className="labelInputWrapper">
                  <label className="formLabel" for="name">
                    Movie Name
                  </label>
                  <input
                    className="formInput"
                    type="text"
                    placeholder="Movie name"
                    value={moviename}
                    onChange={(e) => setMovieName(e.target.value)}
                  />
                </div>

                <div className="labelInputWrapper">
                  <label className="formLabel" for="name">
                    Ticket Cost
                  </label>
                  <input
                    className="formInput"
                    type="text"
                    placeholder="Ticket Cost"
                    value={ticketcost}
                    onChange={(e) => setTicketCost(e.target.value)}
                  />
                </div>

                <div className="labelInputWrapper">
                  <label className="formLabel" for="name">
                    Description
                  </label>
                  <input
                    className="formInput"
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}
                  />
                </div>
                <div className="labelInputWrapper">
                  <label className="formLabel" for="name">
                    Movie Gender
                  </label>
                  <ReactDropdown
                    controlClassName="myControlClassName"
                    options={movieGenderList}
                    onChange={(e) => {
                      setMovieGender(e.value);
                    }}
                    value={movieGender}
                    placeholder="Select an option"
                  />
                </div>

                <div className="labelInputWrapper">
                  <label className="formLabel" for="name">
                    Actor Name
                  </label>
                  <input
                    className="formInput"
                    type="text"
                    placeholder="Actor Name"
                    value={actorname}
                    onChange={(e) => setactorname(e.target.value)}
                  />
                </div>

                <div className="labelInputWrapper">
                  <label className="formLabel" for="name">
                    Director Name
                  </label>
                  <input
                    className="formInput"
                    type="text"
                    placeholder="Director Name"
                    value={directorname}
                    onChange={(e) => setdirectorname(e.target.value)}
                  />
                </div>

                <div className="labelInputWrapper">
                  <label className="formLabel" for="name">
                    Release Date
                  </label>
                  <input
                    className="formInput"
                    type="date"
                    placeholder="Pick release Date"
                    value={releasedate}
                    onChange={(e) => setreleasedate(e.target.value)}
                  />
                </div>

                <div className="labelInputWrapper">
                  <label className="formLabel" for="name">
                    Pick Out Date
                  </label>
                  <input
                    className="formInput"
                    type="date"
                    placeholder="Pick out Date"
                    value={outdate}
                    onChange={(e) => setoutdate(e.target.value)}
                  />
                </div>
                <input
                  type="button"
                  style={{ background: "#ff4b2b", color: "white" }}
                  value="Upload Movie"
                  onClick={movieUpload}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
