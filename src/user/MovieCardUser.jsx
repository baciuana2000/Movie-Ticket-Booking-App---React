import React, { useState } from "react";
import "./MovieCardUser.css";
import { useHistory } from "react-router";
import fire from "../files/firebase";

export default function MovieCardUser({
  movie,
  index,
  email,
  admin = false,
  movieDeleted,
  setMovieDeleted,
}) {
  const history = useHistory();
  const [displayCardDetails, setDisplayCardDetails] = useState(false);
  const deleteMovie = (movieName) => {
    fire
      .firestore()
      .collection("currentmovies")
      .where("moviename", "==", movieName)
      .get()
      .then((doc) => doc.docs[0].ref.delete())
      .then(() => setMovieDeleted(!movieDeleted)); // trigger the refresh
  };
  return (
    <div
      className="movieCardUser"
      key={index}
      onMouseOver={() => {
        setDisplayCardDetails(true);
      }}
      onMouseOut={() => {
        setDisplayCardDetails(false);
      }}
    >
      <img
        className="cardImg"
        src={movie.image}
        style={{ width: "30vh", height: "15vh", borderRadius: "10px" }}
      />
      {admin ? (
        <button
          className="bookNowButton"
          onClick={() => {
            console.log("🚀 ~ movie", movie);
            deleteMovie(movie.movieName);
          }}
        >
          Delete
        </button>
      ) : (
        <button
          className="bookNowButton"
          onClick={() =>
            history.push({
              pathname: "/bookingform",
              state: {
                releasedate: movie.releasedate,
                outdate: movie.outdate,
                movieimage: movie.image,
                moviename: movie.movieName,
                ticketcost: movie.ticketcost,
                theater: movie.theater,
                email: email,
              },
            })
          }
        >
          Buy
        </button>
      )}
      <div
        className="col-4"
        key={index}
        style={{ marginLeft: "auto", marginRight: "auto" }}
      ></div>
    </div>
  );
}
