import React, { useEffect, useState } from "react";
import "../bookingform.css";
import $ from "jquery";
import { useHistory, useLocation } from "react-router-dom";
import fire from "../files/firebase";
import "../movie_details.css";

export const Ticketbookingform = () => {
  //   const releasedate = location.state.releasedate;
  //   const outdate = location.state.outdate;

  const [bookingdate, setbookingdate] = useState("");
  const history = useHistory();
  const location = useLocation();
  var profile = location.state.profile;
  var password = location.state.password;
  var mobile = location.state.mobile;
  var movieName = location.state.movieName;
  var ticketcost = location.state.ticketcost;
  var movieimage = location.state.movieimage;
  var email = location.state.email;
  const [name, setname] = useState("");
  const [seats, setceats] = useState("");
  const allSeatarray = [];
  const [bookedceats, setbookedceats] = useState([]);

  const startSelect = (e) => {
    e.preventDefault();
    if (name === "" || seats === "") {
      alert("please enter name and seats");
    } else {
      $(".inputForm *").prop("disabled", true);
      $(".seatStructure *").prop("disabled", false);
      $(".title").hide();
      $(".sub-title").hide();
      $(".inputForm *").hide();
      $(".confirm-selection").show();

      document.getElementById("notification").innerHTML =
        "<p class='alert-message'style='margin-bottom:0px;background:yellow;'>Please Select your Seats NOW!</p>";
      fire
        .firestore()
        .collection("movieceats")
        .where("movieName", "==", movieName)
        .where("bookingdate", "==", bookingdate)
        .get()
        .then((snapshot) =>
          snapshot.forEach((el) => {
            var data = el.data();
            console.log(data.seatNames);
            //$("#" + data.seatNames).attr("disabled", true);
            $("#" + data.seatNames).attr("disabled", true);
            // $("#" + data.seatNames).css("background-color", "red");
            setbookedceats((arr) => [...arr, { data: data }]);
          })
        );
    }
  };

  const confirmSelection = () => {
    if ($("input:checked").length == seats) {
      $(".seatStructure *").prop("disabled", true);
      $(".confirm-selection").hide();
      $(".pay-btn").show();
      var allNameVals = [];
      var allNumberVals = [];
      var allSeatsVals = [];

      //Storing in Array
      allNameVals.push(name);
      allNumberVals.push(seats);
      $("#seatsBlock :checked").each(function () {
        allSeatsVals.push($(this).val());
        allSeatarray.push($(this).val());
      });

      //Displaying
      $("#nameDisplay").val(allNameVals);
      $("#NumberDisplay").val(allNumberVals);
      $("#seatsDisplay").val(allSeatsVals);
    } else {
      alert("Please select " + seats + " seats");
    }
  };

  const paymentFunction = (e) => {
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var fullyear = currentDate.getFullYear();
    var fulldate = day + "-0" + month + "-" + fullyear;
    e.preventDefault();
    var options = {
      key: "rzp_test_xz4tqVIIc6MRSi", // Enter the Key ID generated from the Dashboard
      key_secret: "7kMiCxUxaQrhuPQ7WJFs8AKn",
      amount: ticketcost * 100 * seats, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "AK CINEMAS ",
      description: movieName,
      image: movieimage,
      handler: function (response) {
        //alert(response.razorpay_payment_id);
        //alert(response.razorpay_order_id);
        //alert(response.razorpay_signature)
        //alert("working");
        fire
          .firestore()
          .collection("Bookings")
          .add({
            currentdate: fulldate,
            email: email,
            mobile: mobile,
            bookingdate: bookingdate,
            movieName: movieName,
            moviewatchers: name,
            totalceats: seats,
            seatNames: allSeatarray,
            totalcost: ticketcost * seats,
          })
          .then(() => {
            fire.firestore().collection("movieceats").add({
              bookingdate: bookingdate,
              movieName: movieName,
              seatNames: allSeatarray,
            });
            alert("Your Booking Was Successfull");
            history.push({
              pathname: "/success",
              state: {
                profile: profile,
                email: email,
                password: password,
                mobile: mobile,
                bookingdate: bookingdate,
                totalceats: seats,
                seatNames: allSeatarray,
                name: name,
                movieName: movieName,
                ticketcost: ticketcost,
              },
            });
          })
          .catch((err) => console.log(err));
      },
      prefill: {
        email: email,
        contact: mobile,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var pay = new window.Razorpay(options);
    pay.open();
  };

  //   useEffect(() => {
  //     $(".seatStructure *").prop("disabled", true);
  //     $(".displayerBoxes *").prop("disabled", true);
  //     $(".pay-btn").hide();
  //     $(".confirm-selection").hide();

  //     //$(".booking-pdf").hide();
  //   }, []);
  return (
    <div class="form-container sign-in-container" className="ticket-booking">
      <form className="ceat-pick">
        <br />
        <h1>Book Your Ticket</h1>
        <div className="inputForm">
          <br />
          <input type="text" placeholder="Movie name" value={movieName} />
          <input type="text" placeholder="Ticket Amount" value={ticketcost} />
          <input
            type="date"
            placeholder="Pick Booking Date"
            // max={outdate}
            // min={releasedate}
            value={bookingdate}
            onChange={(e) => setbookingdate(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setname(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter Number Of Seats"
            value={seats}
            onChange={(e) => setceats(e.target.value)}
          />
          {/* <input
            type="button"
            value="Pick Cetas"
            className="pick-seats"
            onClick={startSelect}
          /> */}
        </div>

        <div class="seatStructure">
          <center>
            <p id="notification"></p>
            <table id="seatsBlock" style={{ marginLeft: "15%" }}>
              <tr>
                <td colspan="14">
                  <div
                    class="screen"
                    style={{
                      width: "100%",
                      height: "20px",
                      background: "#ff4b2b",
                      color: "#fff",
                      lineHeight: "20px",
                      fontSize: "15px",
                    }}
                  >
                    SCREEN
                  </div>
                </td>
                <td rowspan="20">
                  <div
                    class="smallBox greenBox"
                    style={{ width: "max-content" }}
                  >
                    {" "}
                    Selected Seat
                  </div>{" "}
                  <br />
                  <div class="smallBox redBox" style={{ width: "max-content" }}>
                    {" "}
                    Reserved Seat
                  </div>
                  <br />
                  <div
                    class="smallBox emptyBox"
                    style={{ width: "max-content" }}
                  >
                    {" "}
                    Empty Seat
                  </div>
                  <br />
                </td>

                <br />
              </tr>
              <tr>
                <td></td>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td></td>
                <td>6</td>
                <td>7</td>
                <td>8</td>
                <td>9</td>
                <td>10</td>
                <td>11</td>
                <td>12</td>
              </tr>
              <tr>
                <td>A</td>
                <td>
                  <input type="checkbox" class="seats" value="A1" id="A1" />
                </td>
                <td>
                  <input type="checkbox" class="seats" value="A2" id="A2" />
                </td>
                <td>
                  <input type="checkbox" class="seats" value="A3" id="A3" />
                </td>
                <td>
                  <input type="checkbox" class="seats" value="A4" id="A4" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="A5" value="A5" />
                </td>
                <td class="seatGap"></td>
                <td>
                  <input type="checkbox" class="seats" id="A6" value="A6" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="A7" value="A7" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="A8" value="A8" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="A9" value="A9" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="A10" value="A10" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="A11" value="A11" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="A12" value="A12" />
                </td>
              </tr>
              <tr>
                <td>B</td>
                <td>
                  <input type="checkbox" class="seats" id="B1" value="B1" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="B2" value="B2" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="B3" value="B3" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="B4" value="B4" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="B5" value="B5" />
                </td>
                <td></td>
                <td>
                  <input type="checkbox" class="seats" id="B6" value="B6" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="B7" value="B7" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="B8" value="B8" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="B9" value="B9" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="B10" value="B10" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="B11" value="B11" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="B12" value="B12" />
                </td>
              </tr>
              <tr>
                <td>C</td>
                <td>
                  <input type="checkbox" class="seats" id="C1" value="C1" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="C2" value="C2" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="C3" value="C3" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="C4" value="C4" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="C5" value="C5" />
                </td>
                <td></td>
                <td>
                  <input type="checkbox" class="seats" id="C6" value="C6" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="C7" value="C7" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="C8" value="C8" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="C9" value="C9" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="C10" value="C10" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="C11" value="C11" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="C12" value="C12" />
                </td>
              </tr>
              <tr>
                <td>D</td>
                <td>
                  <input type="checkbox" class="seats" id="D1" value="D1" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="D2" value="D2" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="D3" value="D3" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="D4" value="D4" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="D5" value="D5" />
                </td>
                <td></td>
                <td>
                  <input type="checkbox" class="seats" id="D6" value="D6" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="D7" value="D7" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="D8" value="D8" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="D9" value="D9" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="D10" value="D10" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="D11" value="D11" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="D12" value="D12" />
                </td>
              </tr>
              <tr>
                <td>E</td>
                <td>
                  <input type="checkbox" class="seats" id="E1" value="E1" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="E2" value="E2" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="E3" value="E3" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="E4" value="E4" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="E5" value="E5" />
                </td>
                <td></td>
                <td>
                  <input type="checkbox" class="seats" id="E6" value="E6" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="E7" value="E7" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="E8" value="E8" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="E9" value="E9" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="E10" value="E10" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="E11" value="E11" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="E12" value="E12" />
                </td>
              </tr>
              <tr class="seatVGap"></tr>
              <tr>
                <td>F</td>
                <td>
                  <input type="checkbox" class="seats" id="F1" value="F1" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="F2" value="F2" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="F3" value="F3" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="F4" value="F4" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="F5" value="F5" />
                </td>
                <td></td>
                <td>
                  <input type="checkbox" class="seats" id="F6" value="F6" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="F7" value="F7" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="F8" value="F8" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="F9" value="F9" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="F10" value="F10" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="F11" value="F11" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="F12" value="F12" />
                </td>
              </tr>
              <tr>
                <td>G</td>
                <td>
                  <input type="checkbox" class="seats" id="G1" value="G1" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="G2" value="G2" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="G3" value="G3" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="G4" value="G4" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="G5" value="G5" />
                </td>
                <td></td>
                <td>
                  <input type="checkbox" class="seats" id="G6" value="G6" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="G7" value="G7" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="G8" value="G8" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="G9" value="G9" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="G10" value="G10" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="G11" value="G11" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="G12" value="G12" />
                </td>
              </tr>

              <tr>
                <td>H</td>
                <td>
                  <input type="checkbox" class="seats" id="H1" value="H1" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="H2" value="H2" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="H3" value="H3" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="H4" value="H4" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="H5" value="H5" />
                </td>
                <td></td>
                <td>
                  <input type="checkbox" class="seats" id="H6" value="H6" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="H7" value="H7" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="H8" value="H8" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="H9" value="H9" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="H10" value="H10" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="H11" value="H11" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="H12" value="H12" />
                </td>
              </tr>

              <tr>
                <td>I</td>
                <td>
                  <input type="checkbox" class="seats" id="I1" value="I1" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="I2" value="I2" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="I3" value="I3" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="I4" value="I4" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="I5" value="I5" />
                </td>
                <td></td>
                <td>
                  <input type="checkbox" class="seats" id="I6" value="I6" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="I7" value="I7" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="I8" value="I8" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="I9" value="I9" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="I10" value="I10" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="I11" value="I11" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="I12" value="I12" />
                </td>
              </tr>

              <tr>
                <td>J</td>
                <td>
                  <input type="checkbox" class="seats" id="J1" value="J1" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="J2" value="J2" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="J3" value="J3" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="J4" value="J4" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="J5" value="J5" />
                </td>
                <td></td>
                <td>
                  <input type="checkbox" class="seats" id="J6" value="J6" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="J7" value="J7" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="J8" value="J8" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="J9" value="J9" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="J10" value="J10" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="J11" value="J11" />
                </td>
                <td>
                  <input type="checkbox" class="seats" id="J12" value="J12" />
                </td>
              </tr>
            </table>
            <br />
            <input
              type="button"
              value="Confirm Selection"
              className="confirm-selection"
              id="con-select"
              onClick={confirmSelection}
              onclick="updateTextArea()"
            />
          </center>
        </div>
        <br />
        <br />
        <div class="displayerBoxes">
          <center>
            <table
              class="Displaytable"
              style={{ marginLeft: "auto", marginRight: "auto" }}
            >
              <tr>
                <th>Name</th>
                <th>Number of Seats</th>
                <th>Seats</th>
              </tr>
              <tr>
                <td>
                  <textarea id="nameDisplay"></textarea>
                </td>
                <td>
                  <textarea id="NumberDisplay"></textarea>
                </td>
                <td>
                  <textarea id="seatsDisplay"></textarea>
                </td>
              </tr>
            </table>
          </center>
        </div>
      </form>

      <br />
      <button
        className="pay-btn"
        style={{ marginLeft: "39%" }}
        onClick={paymentFunction}
      >
        Pay Now
      </button>
    </div>
  );
};
