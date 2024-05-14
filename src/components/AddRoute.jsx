import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddRoute = () => {
  const [routeData, setRouteData] = useState({
    routeName: "",
    sourceList: {},
    destinationList: {},
    agencyId: "",
  });

  const [newSource, setNewSource] = useState("");
  const [newSourceTime, setNewSourceTime] = useState("");
  const [newDestination, setNewDestination] = useState("");
  const [newDestinationTime, setNewDestinationTime] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRouteData({ ...routeData, [name]: value });
  };

  const addSource = () => {
    if (newSource.trim() !== "" && newSourceTime.trim() !== "") {
      setRouteData({
        ...routeData,
        sourceList: { ...routeData.sourceList, [newSource]: newSourceTime },
      });
      setNewSource("");
      setNewSourceTime("");
    }
  };

  const addDestination = () => {
    if (newDestination.trim() !== "" && newDestinationTime.trim() !== "") {
      setRouteData({
        ...routeData,
        destinationList: {
          ...routeData.destinationList,
          [newDestination]: newDestinationTime,
        },
      });
      setNewDestination("");
      setNewDestinationTime("");
    }
  };

  const removeSource = (location) => {
    const newSourceList = { ...routeData.sourceList };
    delete newSourceList[location];
    setRouteData({ ...routeData, sourceList: newSourceList });
  };

  const removeDestination = (location) => {
    const newDestinationList = { ...routeData.destinationList };
    delete newDestinationList[location];
    setRouteData({ ...routeData, destinationList: newDestinationList });
  };

  const handleSubmit = async (e) => {
    console.log("routeData", routeData);
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/route/addRoute",
        routeData,
        {
          headers: {
            Authorization: `Bearer yourAccessToken`,
          },
        }
      );
      console.log("Response:", response.data);
      toast.success("Route added successfully!");
      // Reset the form after successful submission
      setRouteData({
        routeName: "",
        sourceList: {},
        destinationList: {},
        agencyId: "",
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error(
         `${error.response.data.message}` ||
          " Error adding route.Please try again"
      );
    }
  };

  return (
    <div>
      <h2>Add Route</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Route Name:
          <input
            type="text"
            name="routeName"
            value={routeData.routeName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Source Location:
          <input
            type="text"
            value={newSource}
            onChange={(e) => setNewSource(e.target.value)}
          />
        </label>
        <label>
          Source Time:
          <input
            type="text"
            value={newSourceTime}
            onChange={(e) => setNewSourceTime(e.target.value)}
          />
        </label>
        <button type="button" onClick={addSource}>
          Add Source
        </button>
        <ul>
          {Object.entries(routeData.sourceList).map(([location, time]) => (
            <li key={location}>
              {location} - {time}
              <button type="button" onClick={() => removeSource(location)}>
                X
              </button>
            </li>
          ))}
        </ul>
        <br />
        <label>
          Destination Location:
          <input
            type="text"
            value={newDestination}
            onChange={(e) => setNewDestination(e.target.value)}
          />
        </label>
        <label>
          Destination Time:
          <input
            type="text"
            value={newDestinationTime}
            onChange={(e) => setNewDestinationTime(e.target.value)}
          />
        </label>
        <button type="button" onClick={addDestination}>
          Add Destination
        </button>
        <ul>
          {Object.entries(routeData.destinationList).map(([location, time]) => (
            <li key={location}>
              {location} - {time}
              <button type="button" onClick={() => removeDestination(location)}>
                X
              </button>
            </li>
          ))}
        </ul>
        <br />
        <label>
          Agency ID:
          <input
            type="text"
            name="agencyId"
            value={routeData.agencyId}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Add Route</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddRoute;
