import React from "react";
import fire from "../files/firebase";

export default function MovieCard({ data, movieDeleted, setMovieDeleted }) {
  const deleteMovie = (data) => {
    fire
      .firestore()
      .collection("currentmovies")
      .where("movieName", "==", data.data.movieName)
      .get()
      .then((doc) => doc.docs[0].ref.delete())
      .then(() => setMovieDeleted(!movieDeleted)); // trigger the refresh
  };

  return (
    <div
      //   className="col-2"
      key={1}
      style={{
        margin: "5px 5px",
        width: "20rem",
        height: "10rem",
        borderRadius: "10%",
      }}
    >
      <div className="card" style={{ width: "100%", height: "100%" }}>
        <div
          className="card-img-top img-fluid"
          style={{ borderRadius: "10%", width: "100%", height: "100%" }}
        >
          <img
            src={data.data.image}
            ti
            style={{ width: "100%", height: "100%", borderRadius: "1%" }}
          />
        </div>
        <button onClick={() => deleteMovie(data)}>Delete</button>
      </div>
    </div>
  );
}
