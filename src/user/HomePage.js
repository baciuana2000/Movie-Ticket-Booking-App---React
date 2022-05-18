import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import fire from "../files/firebase";
import "../movie_details.css";
import "./HomePage.css";
import "./home.css";
import MovieCardUser from "./MovieCardUser";
import FilterMovies from "./FilterMovies";
import NavbarUser from "../components/NavbarUser";

export const HomePage = () => {
  const history = useHistory();
  const location = useLocation();
  const profile = location.state.profile;
  const name = location.state.name;
  const email = location.state.email;
  const password = location.state.password;
  const mobile = location.state.mobile;
  const [ungroupedMovieData, setUngroupedMovieData] = useState([]);
  const [movieData, setMovieData] = useState({});
  const [movieFilterValue, setMovieFilterValue] = useState("");

  const handleOnInputChange = (value) => {
    setMovieFilterValue(value);

    const filtredMovies = ungroupedMovieData.filter((movie) => {
      return movie.actorname.includes(value);
    });
    setUngroupedMovieData(filtredMovies);
  };
  // movieData = {
  //   Action:[{film1},{film2},...],
  //   Comedy:[{film1},{film2},...],
  //   Romance:[{film1},{film2},...]
  // }

  useEffect(() => {
    console.log("🚀 ~ email", email);
  }, []);

  useEffect(() => {
    let allMovies = [];
    fire
      .firestore()
      .collection("currentmovies")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          allMovies = [...allMovies, data];
          // return allMovies;
          // moviesGroupedByGender = { ...moviesGroupedByGender, [data.movieGender]: [...moviesGroupedByGender.[data.movieGender], data] };
        });
      })
      .then(() => {
        setUngroupedMovieData(allMovies);
      });
  }, []);

  useEffect(() => {
    let moviesGroupedByGender = {
      // Comedie: [],
      // Action: [],
      // Romance: [],
    };

    ungroupedMovieData.forEach((el) => {
        moviesGroupedByGender = { ...moviesGroupedByGender, [el.movieGender]: moviesGroupedByGender.[el.movieGender]?[...moviesGroupedByGender.[el.movieGender], el] :[el] };
    });
    setMovieData(moviesGroupedByGender);
  }, [ungroupedMovieData]);

  return (
    <div className="homePage">
      <link
        href="../assets/css/material-dashboard.css?v=2.1.2"
        rel="stylesheet"
      />

      <NavbarUser profile={profile} email={email} />

      <div className="posters">
        <FilterMovies
          setMovieFilterValue={setMovieFilterValue}
          movieFilterValue={movieFilterValue}
          handleOnInputChange={handleOnInputChange}
        />
        {Object.keys(movieData).map((key) => {
          return (
            <>
              <h1>{key}</h1>
              <div className="movieRow">
                {movieData[key].map((movie, index) => {
                  return (
                    <MovieCardUser movie={movie} index={index} email={email} />
                  );
                })}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};
