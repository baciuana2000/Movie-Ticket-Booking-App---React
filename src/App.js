import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Signup from "./pages/signup";
import { Home } from "./pages/home";
import { HomePage } from "./user/HomePage";
import { DashboardUser } from "./user/DashboardUser";
import { Userprofile } from "./user/UserProfile";
import { Booking } from "./user/BookingUser";
import { Ticketbookingform } from "./pages/ticket_booking_form";
import { Bookingform } from "./pages/booking_form";
import { MovieUpload } from "./admin/MovieUpload";
import { MovieDetails } from "./pages/movie_details";
import { Successresponse } from "./response/success_response";
import { AdminHome } from "./admin/AdminHome";
import { FeedbackAdmin } from "./admin/FeedbackAdmin";
import { AdminProfile } from "./admin/AdminProfile";
import { AdminRetreiveBooking } from "./admin/AdminRetreiveBooking";
import { FeedbackUser } from "./user/FeedbackUser";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Signup />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/homepage">
            <HomePage />
          </Route>
          <Route exact path="/dashboard">
            <DashboardUser />
          </Route>
          <Route exact path="/bookings">
            <Booking />
          </Route>
          <Route exact path="/userprofile">
            <Userprofile />
          </Route>
          <Route exact path="/feedback">
            <FeedbackUser />
          </Route>
          <Route exact path="/bookingform">
            <Bookingform />
          </Route>
          {/* <Route exact path="/pickceat">
            <Ticketbookingform />
          </Route> */}
          <Route exact path="/movieupload">
            <MovieUpload />
          </Route>
          <Route exact path="/details">
            <MovieDetails />
          </Route>
          <Route exact path="/success">
            <Successresponse />
          </Route>
          <Route exact path="/adminpage">
            <AdminHome />
          </Route>
          <Route exact path="/retrievefeedback">
            <FeedbackAdmin />
          </Route>
          <Route exact path="/AdminProfile">
            <AdminProfile />
          </Route>
          <Route exact path="/adminbooking">
            <AdminRetreiveBooking />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
