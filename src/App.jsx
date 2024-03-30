import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import BusBooking from "./components/BusBooking";
import Buses from "./components/Buses";
import Paths from "./components/AddRoute";
import ScheduleBus from "./components/ScheduleBus";
import Employees from "./components/Employees";
import Combine from "./components/Combine";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Combine} />
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/busbooking" Component={BusBooking} />
        <Route path="/buses" Component={Buses} />
        <Route path="/paths" Component={Paths} />
        <Route path="/schedulebus" Component={ScheduleBus} />
        <Route path="/employees" Component={Employees} />
      </Routes>
    </Router>
  );
}

export default App;
