import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import $ from "jquery";
import { Preview, print } from "react-html2pdf";

export const Successresponse = () => {
  const history = useHistory();
  const location = useLocation();
  var profile = location.state.profile;
  var email = location.state.email;
  var password = location.state.password;
  var mobile = location.state.mobile;
  var bookingdate = location.state.bookingdate;
  var totalSeats = location.state.totalSeats;
  var seatNames = location.state.seatNames;
  var name = location.state.name;
  var movieName = location.state.movieName;
  var ticketcost = location.state.ticketcost;

  const downloadTicket = () => {
    print("AK-CINEMAS", "booking-pdf");
  };
  const returnHome = () => {
    history.push({
      pathname: "/homepage",
      state: {
        profile: profile,
        name: name,
        email: email,
        password: password,
        mobile: mobile,
      },
    });
  };

  useEffect(() => {
    // $(".booking-pdf").hide();
  }, []);

  return (
    <div>
      <br />
      <div className="booking-pdf">
        <Preview id={"booking-pdf"}>
          <h1 style={{ marginLeft: "30%" }}>AK CINEMAS</h1>
          <p style={{ marginLeft: "30%" }}>Booking Date : {bookingdate}</p>
          <p style={{ marginLeft: "30%" }}>Ticket Booked By : {email}</p>
          <p style={{ marginLeft: "30%" }}>Total Seat : {totalSeats}</p>
          <p style={{ marginLeft: "30%" }}>Seat Number : {seatNames}</p>
          <p style={{ marginLeft: "30%" }}>Movie Name : {movieName}</p>
          <p style={{ marginLeft: "30%" }}>
            Total Cost : {ticketcost * totalSeats}
          </p>
        </Preview>
      </div>
      <br />
      <button style={{ marginLeft: "27%" }} onClick={downloadTicket}>
        Download Ticket
      </button>
      <br />
      <br />
      <button style={{ marginLeft: "27%" }} onClick={returnHome}>
        Return To Home
      </button>
    </div>
  );
};
