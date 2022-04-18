import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Signup from "./pages/signup";
import { Home } from "./pages/home";
import { HomePage } from "./components/HomePage";
import { Dashboard } from "./components/dashboard";
import { Userprofile } from "./components/UserProfile";
import { Booking } from "./components/booking";
import { Ticketbookingform } from "./pages/ticket_booking_form";
import { Bookingform } from "./pages/booking_form";
import { MovieUpload } from "./admin/MovieUpload";
import { Feedback } from "./pages/feedback_page";
import { MovieDetails } from "./pages/movie_details";
import { Successresponse } from "./response/success_response";
import { Adminpage } from "./admin/admin_page";
import { Retrievefeedback } from "./admin/retrieve_feedback";
import { AdminProfile } from "./admin/AdminProfile";
import { AdminRetreiveBooking } from "./admin/AdminRetreiveBooking";

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
            <Dashboard />
          </Route>
          <Route exact path="/bookings">
            <Booking />
          </Route>
          <Route exact path="/userprofile">
            <Userprofile />
          </Route>
          <Route exact path="/feedback">
            <Feedback />
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
            <Adminpage />
          </Route>
          <Route exact path="/retrievefeedback">
            <Retrievefeedback />
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
