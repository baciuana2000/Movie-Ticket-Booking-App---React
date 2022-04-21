import React, { useState } from "react";
import ReactDropdown from "react-dropdown";
import { useHistory, useLocation, Link } from "react-router-dom";
import "react-dropdown/style.css";

import fire from "../files/firebase";
import "../movie_details.css";
import { CenterFocusStrong } from "@material-ui/icons";
import NavbarAdmin from "../components/NavbarAdmin";

export const MovieUpload = () => {
  const movieGenderList = ["Comedy", "Drama", "Action"];
  const [image, setimage] = useState(
    "https://blog.starzplay.com/wp-content/uploads/2016/02/teenwolf.jpg"
  );
  const [movieName, setmovieName] = useState("Default name");
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
      movieName === "" ||
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
          movieName: movieName,
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
          console.log("Movie Added Successfully");
          // setimage("");
          // setviedo("");
          // setmovieName("");
          // setTicketCost("");
          // setdescription("");
          // setactorname("");
          // setdirectorname("");
          // setreleasedate("");
          // setoutdate("");
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
      <NavbarAdmin profile={profile} email={email} />

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
              height: "100%",
              width: "100%",
              left: "0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <form
              className="upload-form"
              style={{
                background: "#f6f5f7",
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
                    value={movieName}
                    onChange={(e) => setmovieName(e.target.value)}
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
