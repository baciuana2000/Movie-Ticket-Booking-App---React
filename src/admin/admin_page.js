import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Icon } from "semantic-ui-react";

import MovieCard from "../components/MovieCard";
import MovieCardUser from "../components/MovieCardUser";
import fire from "../files/firebase";
import "./adminPage.css";

export const Adminpage = () => {
  const history = useHistory();
  const location = useLocation();
  const profile = location.state.profile;
  const name = location.state.name;
  const email = location.state.email;
  const password = location.state.password;
  const mobile = location.state.mobile;
  const [movieData, setMovieData] = useState([]);
  const [movieDeleted, setMovieDeleted] = useState(false);

  useEffect(() => {
    let moviesGroupedByGender = {
      Comedie: [],
      Action: [],
      // Romance: [],
    }
    fire
      .firestore()
      .collection("currentmovies")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          moviesGroupedByGender = { ...moviesGroupedByGender, [data.movieGender]: [...moviesGroupedByGender.[data.movieGender], data] };
        });
        setMovieData(moviesGroupedByGender)
      });
    console.log(movieData);
  }, [movieDeleted]);

  console.log('locstiom', location.state);

  return (
    <div className="wrapper">
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
            <li className="nav-item active  ">
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
            <li className="nav-item">
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
        <div className="row-wrapper">
          {Object.keys(movieData).map((key) => {
            console.log("🚀 ~ movieData", movieData);
            return (
              <>
                <h1>{key}</h1>
                <div className="movieRow">
                  {movieData[key].map((movie, index) => {
                    return (
                      <MovieCardUser
                        movie={movie}
                        index={index}
                        email={email}
                        admin = {true}  
                        setMovieDeleted={setMovieDeleted}
                        movieDeleted={movieDeleted}

                      />
                    );
                  })}
                </div>
              </>
            );
          })}

          {/* {movieData.map((data, index) => {
            return (
              <MovieCard
                data={data}
                movieDeleted={movieDeleted}
                setMovieDeleted={setMovieDeleted}
              />
            );
          })} */}
          <Icon name="angle right" size="mini" />
        </div>
        {/* <div className="row-wrapper">
          <h1>Drama</h1>
          {movieData.map((data, index) => {
            return (
              <MovieCard
                data={data}
                movieDeleted={movieDeleted}
                setMovieDeleted={setMovieDeleted}
              />
            );
          })}
        </div>
        <div className="row-wrapper">
          <h1>Action</h1>
          {movieData.map((data, index) => {
            return (
              <MovieCard
                data={data}
                movieDeleted={movieDeleted}
                setMovieDeleted={setMovieDeleted}
              />
            );
          })}
        </div>
        <div className="row-wrapper">
          <h1>Romance</h1>
          {movieData.map((data, index) => {
            return (
              <MovieCard
                data={data}
                movieDeleted={movieDeleted}
                setMovieDeleted={setMovieDeleted}
              />
            );
          })}
        </div> */}
      </div>
    </div>
  );
};
