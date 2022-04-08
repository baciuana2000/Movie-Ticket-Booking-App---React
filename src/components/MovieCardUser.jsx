import React, { useState } from "react";
import "./MovieCardUser.css";
import { useHistory } from "react-router";

export default function MovieCardUser({ movie, index }) {
  const history = useHistory();
  const [displayCardDetails, setDisplayCardDetails] = useState(false);
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
      <div className="actorName">{movie.actorname}</div>
      <button
        className="bookNowButton"
        onClick={() =>
          history.push({
            pathname: "/bookingform",
            state: {
              releasedate: movie.releasedate,
              outdate: movie.outdate,
              movieimage: movie.image,
              moviename: movie.moviename,
              ticketcost: movie.ticketcost,
              // name: name,
              // email: email,
              // password: password,
              // mobile: mobile,
            },
          })
        }
      >
        Buy
      </button>
      <div
        className="col-4"
        key={index}
        style={{ marginLeft: "auto", marginRight: "auto" }}
      ></div>
    </div>
  );
}
