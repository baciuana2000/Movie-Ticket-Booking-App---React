import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import fire from "../files/firebase";
import "../movie_details.css";
import MovieRow from "./MovieRow";
import "./home.css";
import Nav from "./Nav";

export const Homepage = () => {
  const history = useHistory();
  const location = useLocation();
  const profile = location.state.profile;
  const name = location.state.name;
  const email = location.state.email;
  const password = location.state.password;
  const mobile = location.state.mobile;
  const [movieData, setMovieData] = useState({});
  // movieData = {
  //   Action:[{film1},{film2},...],
  //   Comedy:[{film1},{film2},...],
  //   Romance:[{film1},{film2},...]
  // }

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
  }, []);

  useEffect(()=>{
    console.log("🚀 ~ movieData", movieData)
  },[movieData])

  return (
    <div className="homePage">
            <link href="../assets/css/material-dashboard.css?v=2.1.2" rel="stylesheet" />

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
                  pathname: "/homepage",
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
                  pathname: "/dashboard",
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
                <p>Dashboard</p>
              </Link>
            </li>
            <li className="nav-item ">
              <Link
                to={{
                  pathname: "/bookings",
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
                <p>Bookings</p>
              </Link>
            </li>
            <li className="nav-item ">
              <Link
                to={{
                  pathname: "/userprofile",
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
                  pathname: "/feedback",
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
      <div className="posters">
        {Object.keys(movieData).map((key) => {
          return <>
          <h1>{key}</h1>
           <MovieRow movies={movieData[key]}  />
          </>
        })}
      </div>
    </div>
  );
};
