import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./styles/ScheduleBus.css";
import { toast, ToastContainer } from "react-toastify";
const ScheduleBus = () => {
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [conductors, setConductors] = useState([]);
  const [selectedBusId, setSelectedBusId] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedConductor, setSelectedConductor] = useState(null);
  const [showSelected, setShowSelected] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const [staticFare, setStaticFare] = useState({});
  const [restStops, setRestStops] = useState([]);
  const [newStopLocation, setNewStopLocation] = useState("");
  const [newStopTime, setNewStopTime] = useState("");
  const [newFareSeater, setNewFareSeater] = useState("");
  const [newFareSingleSleeper, setNewFareSingleSleeper] = useState("");
  const [newFareDoubleSleeper, setNewFareDoubleSleeper] = useState("");

  const agencyId = "6591aa7f08a3d6c7634951a3"; // Your agency id

  useEffect(() => {
    fetchBuses();
    fetchRoutes();
    fetchEmployees();
  }, []);

  const fetchBuses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/bus/agency/${agencyId}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1Y2Y4NTc2YjcwMWZlOTM0MTc5ZjMwMyIsImFnZW5jeUlkIjpudWxsLCJpc1ZhbGlkYXRlZCI6dHJ1ZSwibmFtZSI6IlNhbmtldCBIYWtlIiwibW9iaWxlIjoiODM1Njk5NDk4MSIsInBob25lT3RwIjoiIiwib3RwRXhwaXJlVGltZSI6bnVsbCwidXNlclR5cGUiOiJDdXN0b21lciIsIl9fdiI6MTQsImNvcGFzc2VuZ2VyIjpbeyJuYW1lIjoiVHVzaGFyIFNoaXJiaGF0ZSIsImFnZSI6IjI1IiwiZ2VuZGVyIjoiTWFsZSJ9XSwiZG9iIjoiMTAvMDcvMjAwMiIsImVtYWlsIjoic2Fua2V0aGFrZTQ4NDdAZ21haWwuY29tIiwiZ2VuZGVyIjoiTWFsZSIsIm15VHJpcHMiOltdfSwiaWF0IjoxNzEzNzkxMTQ2LCJleHAiOjE3MTUwODcxNDZ9.hh2JC0OSiFlty6YOfVemxio0rvRmG4ojz2bZu4RnwAU`,
          },
        }
      );
      setBuses(response.data.buses);
    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  };

  const fetchRoutes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/route/getAllRoutes/${agencyId}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1Y2Y4NTc2YjcwMWZlOTM0MTc5ZjMwMyIsImFnZW5jeUlkIjpudWxsLCJpc1ZhbGlkYXRlZCI6dHJ1ZSwibmFtZSI6IlNhbmtldCBIYWtlIiwibW9iaWxlIjoiODM1Njk5NDk4MSIsInBob25lT3RwIjoiIiwib3RwRXhwaXJlVGltZSI6bnVsbCwidXNlclR5cGUiOiJDdXN0b21lciIsIl9fdiI6MTQsImNvcGFzc2VuZ2VyIjpbeyJuYW1lIjoiVHVzaGFyIFNoaXJiaGF0ZSIsImFnZSI6IjI1IiwiZ2VuZGVyIjoiTWFsZSJ9XSwiZG9iIjoiMTAvMDcvMjAwMiIsImVtYWlsIjoic2Fua2V0aGFrZTQ4NDdAZ21haWwuY29tIiwiZ2VuZGVyIjoiTWFsZSIsIm15VHJpcHMiOltdfSwiaWF0IjoxNzEzNzkxMTQ2LCJleHAiOjE3MTUwODcxNDZ9.hh2JC0OSiFlty6YOfVemxio0rvRmG4ojz2bZu4RnwAU`,
          },
        }
      );
      setRoutes(response.data.routes);
    } catch (error) {
      console.error("Error fetching routes:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/employee/getByAgency/${agencyId}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1Y2Y4NTc2YjcwMWZlOTM0MTc5ZjMwMyIsImFnZW5jeUlkIjpudWxsLCJpc1ZhbGlkYXRlZCI6dHJ1ZSwibmFtZSI6IlNhbmtldCBIYWtlIiwibW9iaWxlIjoiODM1Njk5NDk4MSIsInBob25lT3RwIjoiIiwib3RwRXhwaXJlVGltZSI6bnVsbCwidXNlclR5cGUiOiJDdXN0b21lciIsIl9fdiI6MTQsImNvcGFzc2VuZ2VyIjpbeyJuYW1lIjoiVHVzaGFyIFNoaXJiaGF0ZSIsImFnZSI6IjI1IiwiZ2VuZGVyIjoiTWFsZSJ9XSwiZG9iIjoiMTAvMDcvMjAwMiIsImVtYWlsIjoic2Fua2V0aGFrZTQ4NDdAZ21haWwuY29tIiwiZ2VuZGVyIjoiTWFsZSIsIm15VHJpcHMiOltdfSwiaWF0IjoxNzEzNzkxMTQ2LCJleHAiOjE3MTUwODcxNDZ9.hh2JC0OSiFlty6YOfVemxio0rvRmG4ojz2bZu4RnwAU`,
          },
        }
      );
      console.log("Response:", response.data);
      const employees = response.data.empData;
      const driverList = employees.filter((emp) => emp.empType === 0);
      const conductorList = employees.filter((emp) => emp.empType === 1);
      setDrivers(driverList);
      setConductors(conductorList);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleBusSelect = (event) => {
    setSelectedBusId(event.target.value);
  };

  const handleRouteSelect = (event) => {
    setSelectedRoute(event.target.value);
  };

  const handleDriverSelect = (event) => {
    setSelectedDriver(event.target.value);
  };

  const handleConductorSelect = (event) => {
    setSelectedConductor(event.target.value);
  };

  const handleButtonClick = () => {
    fetchBuses();
    fetchRoutes();
    fetchEmployees();
    setShowSelected(true);
  };

  const handleDateClick = (date) => {
    setSelectedDates((prevDates) => [...prevDates, date]);
  };

  const handleAddStop = () => {
    setRestStops((prevStops) => [
      ...prevStops,
      { location: newStopLocation, time: newStopTime },
    ]);
    setNewStopLocation("");
    setNewStopTime("");
  };

  const handleAddFare = () => {
    setStaticFare({
      fareForSeater: newFareSeater,
      fareForSingleSleeper: newFareSingleSleeper,
      fareForDoubleSleeper: newFareDoubleSleeper,
    });
    setNewFareSeater("");
    setNewFareSingleSleeper("");
    setNewFareDoubleSleeper("");
  };

  const handleScheduleBus = async () => {
    console.log({
      busId: selectedBusId,
      routeName: selectedRoute,
      driver: selectedDriver,
      conductor: selectedConductor,
      dates: selectedDates,
      restStops: restStops,
      staticFare: staticFare,
    });
    try {
      const selectedDriverObj = selectedDriver
        ? drivers.find((driver) => driver.name === selectedDriver)
        : null;
      const selectedConductorObj = selectedConductor
        ? conductors.find((conductor) => conductor.name === selectedConductor)
        : null;
      const selectedRouteObj = selectedRoute
        ? routes.find((route) => route.routeName === selectedRoute)
        : null;

      if (!selectedDriverObj || !selectedConductorObj || !selectedRouteObj) {
        console.error("Selected driver, conductor, or route not found.");
        return;
      }
      const response = await axios.post(
        "https://pravas-path.onrender.com/busSchedule/create",
        {
          busId: selectedBusId,
          routeId: selectedRouteObj._id,
          staticFare: staticFare,
          employeeList: [selectedConductorObj._id, selectedDriverObj._id], // Assuming you have the IDs available in state
          operatingDays: selectedDates.map((date) =>
            date.toISOString().slice(0, 10)
          ),
          restStops: restStops,
        },

        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1Y2Y4NTc2YjcwMWZlOTM0MTc5ZjMwMyIsImFnZW5jeUlkIjpudWxsLCJpc1ZhbGlkYXRlZCI6dHJ1ZSwibmFtZSI6IlNhbmtldCIsIm1vYmlsZSI6IjgzNTY5OTQ5ODEiLCJwaG9uZU90cCI6IiIsIm90cEV4cGlyZVRpbWUiOm51bGwsInVzZXJUeXBlIjoiQ3VzdG9tZXIiLCJfX3YiOjE5LCJjb3Bhc3NlbmdlciI6W3sibmFtZSI6IlR1c2hhciBTaGlyYmhhdGUiLCJhZ2UiOiIyNSIsImdlbmRlciI6Ik1hbGUifSx7Im5hbWUiOiJTYW5rZXQiLCJhZ2UiOiIyNSIsImdlbmRlciI6Ik1hbGUifSx7Im5hbWUiOiJQcmFuamFsIFBhd2FyIiwiYWdlIjoiMjMiLCJnZW5kZXIiOiJGZW1hbGUifSx7Im5hbWUiOiJzaHJlZSAiLCJhZ2UiOiIyNCIsImdlbmRlciI6Ik1hbGUifSx7Im5hbWUiOiJQaXl1c2ggIiwiYWdlIjoiMjUiLCJnZW5kZXIiOiJNYWxlIn0seyJuYW1lIjoiS2FuaGFpeWEgIiwiYWdlIjoiMjUiLCJnZW5kZXIiOiJNYWxlIn1dLCJkb2IiOiIxMCIsImVtYWlsIjoic2Fua2V0aGFrZTQ4NDdAZ21haWwuY29tIiwiZ2VuZGVyIjoiTWFsZSIsIm15VHJpcHMiOltdfSwiaWF0IjoxNzE1MTA1NDE2LCJleHAiOjE3MTY0MDE0MTZ9.Dq6pXj0AbfzdC7ClP-y34OBfdMll97k9bXbMMz94hK4", // Replace 'x' with your actual bearer token
          },
        }
      );
      console.log("Response:", response.data);
      toast.success("Bus scheduled successfully");
      // Handle success response as needed
    } catch (error) {
      console.error("Error scheduling bus:", error);
      toast.error(error.message ? error.message : "Error scheduling bus");
      // Handle error as needed
    }
  };

  return (
    <div className="container1">
      <div>
        <button className="button" onClick={handleButtonClick}>
          Fetch Buses, Routes, and Employees
        </button>
      </div>
      <div className="f1">
        {showSelected && (
          <div>
            <div>
              <label>Select Bus:</label>
              <select onChange={handleBusSelect}>
                <option value="">Select a Bus</option>
                {buses.map((bus) => (
                  <option key={bus.busId} value={bus.busId}>
                    {bus.busId}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Select Route:</label>
              <select onChange={handleRouteSelect}>
                <option value="">Select a Route</option>
                {routes.map((route) => (
                  <option key={route.routeId} value={route.routeName}>
                    {route.routeName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Select Driver:</label>
              <select onChange={handleDriverSelect}>
                <option value="">Select a Driver</option>
                {drivers.map((driver) => (
                  <option key={driver._id} value={driver.name}>
                    {driver.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Select Conductor:</label>
              <select onChange={handleConductorSelect}>
                <option value="">Select a Conductor</option>
                {conductors.map((conductor) => (
                  <option key={conductor._id} value={conductor.name}>
                    {conductor.name}
                  </option>
                ))}
              </select>
            </div>
            {selectedBusId && <p>Selected Bus ID: {selectedBusId}</p>}
            {selectedRoute && <p>Selected Route Name: {selectedRoute}</p>}
            {selectedDriver && <p>Selected Driver: {selectedDriver}</p>}
            {selectedConductor && (
              <p>Selected Conductor: {selectedConductor}</p>
            )}
          </div>
        )}
        <div>
          <Calendar onChange={handleDateClick} value={selectedDates} />
        </div>
        {selectedDates.length > 0 && (
          <div>
            <h3>Working Days:</h3>
            <ul>
              {selectedDates.map((date, index) => (
                <li key={index}>{date.toISOString().slice(0, 10)}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="f2">
        <div>
          <h3>Enter Rest Stops</h3>
          <input
            type="text"
            placeholder="Location"
            value={newStopLocation}
            onChange={(e) => setNewStopLocation(e.target.value)}
          />
          <input
            type="text"
            placeholder="Time"
            value={newStopTime}
            onChange={(e) => setNewStopTime(e.target.value)}
          />
          <button onClick={handleAddStop}>Add Stop</button>
          {restStops.length > 0 && (
            <ul>
              {restStops.map((stop, index) => (
                <li key={index}>
                  Location: {stop.location}, Time: {stop.time}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h3>Enter Static Fare</h3>
          <input
            type="text"
            placeholder="Fare for Seater"
            value={newFareSeater}
            onChange={(e) => setNewFareSeater(e.target.value)}
          />
          <input
            type="text"
            placeholder="Fare for Single Sleeper"
            value={newFareSingleSleeper}
            onChange={(e) => setNewFareSingleSleeper(e.target.value)}
          />
          <input
            type="text"
            placeholder="Fare for Double Sleeper"
            value={newFareDoubleSleeper}
            onChange={(e) => setNewFareDoubleSleeper(e.target.value)}
          />
          <button onClick={handleAddFare}>Add Fare</button>
          {Object.keys(staticFare).length > 0 && (
            <ul>
              <li>Fare for Seater: {staticFare.fareForSeater}</li>
              <li>
                Fare for Single Sleeper: {staticFare.fareForSingleSleeper}
              </li>
              <li>
                Fare for Double Sleeper: {staticFare.fareForDoubleSleeper}
              </li>
            </ul>
          )}
        </div>
      </div>
      <div>
        <button onClick={handleScheduleBus}>Schedule Bus</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ScheduleBus;
