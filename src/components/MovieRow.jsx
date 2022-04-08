import React from "react";
import MovieCardUser from "./MovieCardUser";
import "./MovieRow.css";
import { Swiper, SwiperSlide } from "swiper/react";

export default function MovieRow({ movies }) {
  return (
    <div className="movieRow">
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {/* {movies.map((movie, index) => { */}
        {/* return ( */}
        <SwiperSlide>
          <MovieCardUser movie={movies[0]} index={1} />
          <MovieCardUser movie={movies[0]} index={1} />
          <MovieCardUser movie={movies[0]} index={1} />
          <MovieCardUser movie={movies[0]} index={1} />
          <MovieCardUser movie={movies[0]} index={1} />
        </SwiperSlide>
        {/* ); */}
        {/* })} */}
      </Swiper>
    </div>
  );
}

/* <div
                className="col-4"
                key={index}
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
                <div className="card">
                  <div className="card-img-top img-fluid">
                    <img
                      src={data.data.image}
                      style={{ width: "18rem", height: "20rem" }}
                    />
                  </div>
                  <button
                    onClick={() =>
                      history.push({
                        pathname: "/details",
                        state: {
                          viedourl: data.data.viedourl,
                          moviename: data.data.moviename,
                          description: data.data.description,
                          actorname: data.data.actorname,
                          directorname: data.data.directorname,
                          releasedate: data.data.releasedate,
                          outdate: data.data.outdate,
                        },
                      })
                    }
                  >
                    View Details
                  </button>
                  <button
                    onClick={() =>
                      history.push({
                        pathname: "/bookingform",
                        state: {
                          releasedate: data.data.releasedate,
                          outdate: data.data.outdate,
                          movieimage: data.data.image,
                          moviename: data.data.moviename,
                          ticketcost: data.data.ticketcost,
                          profile: profile,
                          name: name,
                          email: email,
                          password: password,
                          mobile: mobile,
                        },
                      })
                    }
                  >
                    Book Now
                  </button>
                </div>
              </div> */
