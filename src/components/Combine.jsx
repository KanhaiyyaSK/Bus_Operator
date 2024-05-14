import { useState } from "react";
import Dashboard from "./Dashboard";
import BusBooking from "./BusBooking";
import Buses from "./Buses";
import AddRoute from "./AddRoute";
import ScheduleBus from "./ScheduleBus";
import Employees from "./Employees";
import "./styles/Combine.css"; // Import CSS file

const Combine = () => {
  const [selectedPage, setSelectedPage] = useState(null);
  const c1 = "Dashboard";
  const c2 = "Bus Registration";
  const c3 = "Buses";
  const c4 = "Add Routes";
  const c5 = "Schedule Bus";
  const c6 = "Employee Registration";

  const handlePageSelect = (page) => {
    setSelectedPage(page);
  };

  return (
    <div className="container">
      {" "}
      {/* Apply container class */}
      <div className="menu">
        {" "}
        {/* Apply menu class */}
        <h3 onClick={() => handlePageSelect(c1)}>Dashboard</h3>
        <h3 onClick={() => handlePageSelect(c2)}>Bus Registration</h3>
        <h3 onClick={() => handlePageSelect(c5)}>Schedule Bus</h3>
        <h3 onClick={() => handlePageSelect(c4)}>Add Routes</h3>
        
        <h3 onClick={() => handlePageSelect(c6)}>Employee Registration</h3>
      </div>
      <div className="page">
        {" "}
        {/* Apply page class */}
        {selectedPage === c1 && <Dashboard />}
        {selectedPage === c2 && <BusBooking />}
        {selectedPage === c3 && <Buses />}
        {selectedPage === c4 && <AddRoute />}
        {selectedPage === c5 && <ScheduleBus />}
        {selectedPage === c6 && <Employees />}
      </div>
    </div>
  );
};

export default Combine;
