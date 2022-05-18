import React, { useEffect, useState } from "react";
import ReactDropdown from "react-dropdown";
import { useHistory, useLocation, Link } from "react-router-dom";
import "react-dropdown/style.css";
import "./MovieUpload.css";
import fire from "../files/firebase";
import "../movie_details.css";
import { CenterFocusStrong } from "@material-ui/icons";
import NavbarAdmin from "../components/NavbarAdmin";
import { toast } from "react-toastify";

export const MovieUpload = () => {
  const movieGenderList = ["Comedy", "Drama", "Action"];
  const [image, setimage] = useState(
    "https://blog.starzplay.com/wp-content/uploads/2016/02/teenwolf.jpg"
  );
  const [theaterList, setTheaterList] = useState([]);
  const [movieName, setmovieName] = useState("Default name");
  const [movieGender, setMovieGender] = useState("Comedie");
  const [theater, setTheater] = useState("Pitesti");
  const [newTheater, setNewTheater] = useState("");
  const [ticketcost, setTicketCost] = useState("100");
  const [description, setdescription] = useState("Default description");
  const [actorname, setactorname] = useState("Default Actor Name");
  const [directorname, setdirectorname] = useState("Default director name");
  const [releasedate, setreleasedate] = useState("2022-03-22");
  const [outdate, setoutdate] = useState("2022-03-22");
  //const [viedo, setviedo] = useState(
  //   "https://www.youtube.com/watch?v=vXf3gVYXlHg"
  // );
  const [availableHoursList, setAvailableHoursList] = useState([
    8, 10, 12, 14, 16, 18, 20, 22,
  ]);
  const [selectedHour, setSelectedHour] = useState("");

  const [openModal, setOpenModal] = useState(false);
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
      // viedo === "" ||
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
          //https://mediaguidegroup.com/wp-content/uploads/2021/10/city-hunter-review-action-packed-korean-drama-to-watch_616be1af4c0ab.jpeg
          // viedourl: viedo,
          ticketcost: ticketcost,
          description: description,
          movieGender: movieGender,
          theater: theater,
          actorname: actorname,
          directorname: directorname,
          releasedate: releasedate,
          outdate: outdate,
          selectedHour: selectedHour,
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

  const addTheater = (e) => {
    e.preventDefault();
    setOpenModal(!openModal);
  };

  const saveTheater = (e) => {
    e.preventDefault();
    fire
      .firestore()
      .collection("theater")
      .add({
        theater: newTheater,
      })
      .then(() => {
        toast.success("Movie Added Successfully");
        setOpenModal(false);
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
      .catch((err) => toast.error(err));
  };
  const getAvailableHours = (e) => {
    fire
      .firestore()
      .collection("currentmovies")
      .where("outdate", "==", outdate)
      .where("theater", "==", theater)
      .get()
      .then((snapshot) => {
        var tempHours = [];
        snapshot.forEach((doc) => {
          tempHours = tempHours
            ? [...tempHours, doc.data().selectedHour]
            : [doc.data().selectedHour];
        });
        setAvailableHoursList(
          [8, 10, 12, 14, 16, 18, 20, 22].filter((n) => !tempHours.includes(n))
        );
        console.log(tempHours);
      });
  };

  useEffect(() => {
    console.log("availableHoursList", availableHoursList);
  }, [availableHoursList]);
  useEffect(() => {
    fire
      .firestore()
      .collection("theater")
      .get()
      .then((snapshot) => {
        var tempTheater = [];
        snapshot.forEach((doc) => {
          tempTheater = tempTheater
            ? [...tempTheater, doc.data().theater]
            : [doc.data().theater];
        });
        setTheaterList(tempTheater);
      });
  }, [openModal]);

  // sa imi afiseze ora la click pe data - ca sa nu mai parcurga tot codul
  useEffect(() => {
    getAvailableHours();
  }, [outdate, theater]);

  console.log("🚀 ~ theaterList", theaterList);

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

                {/* <div className="labelInputWrapper">
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
                </div> */}

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
                <div className="labelInputWrapper theater">
                  <label className="formLabel" for="theater">
                    Theater
                  </label>
                  <ReactDropdown
                    controlClassName="myControlClassName"
                    options={theaterList}
                    onChange={(e) => {
                      setTheater(e.value);
                    }}
                    value={theater}
                    placeholder="Select an option"
                  />
                  <button className="buttonAdd" onClick={(e) => addTheater(e)}>
                    +
                  </button>
                </div>

                {openModal && (
                  <div className="labelInputWrapper">
                    <label className="formLabel" for="addtheater">
                      Add Theater
                    </label>
                    <input
                      className="formInput"
                      type="text"
                      placeholder="Add Theater"
                      value={newTheater}
                      onChange={(e) => setNewTheater(e.target.value)}
                    />
                    <button
                      onClick={(e) => {
                        saveTheater(e);
                      }}
                    >
                      Save
                    </button>
                  </div>
                )}

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
                    Theater Date
                  </label>
                  <input
                    className="formInput"
                    type="date"
                    placeholder="Pick out Date"
                    value={outdate}
                    onChange={(e) => {
                      setoutdate(e.target.value);
                    }}
                  />
                </div>
                <div className="labelInputWrapper pickHour">
                  <label className="formLabel" for="pickHour">
                    Pick Hour
                  </label>
                  <ReactDropdown
                    controlClassName="myControlClassName"
                    options={availableHoursList}
                    onChange={(e) => {
                      setSelectedHour(e.value);
                    }}
                    value={selectedHour.toString()}
                    placeholder="Select an option"
                  />
                </div>
                <input
                  type="button"
                  style={{ background: "#ff4b2b", color: "white" }}
                  value="Upload Movie"
                  onClick={(e) => {
                    movieUpload(e);
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
