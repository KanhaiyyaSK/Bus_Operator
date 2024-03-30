import React, { useState } from "react";

const AddRoute = () => {
  const [routeData, setRouteData] = useState({
    routeName: "",
    sourceList: [],
    destinationList: [],
    agencyId: "",
  });

  const [newSourceMain, setNewSourceMain] = useState("");
  const [newSourceNearby, setNewSourceNearby] = useState("");
  const [newDestinationMain, setNewDestinationMain] = useState("");
  const [newDestinationNearby, setNewDestinationNearby] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRouteData({ ...routeData, [name]: value });
  };

  const handleSourceMainChange = (e) => {
    setNewSourceMain(e.target.value);
  };

  const handleSourceNearbyChange = (e) => {
    setNewSourceNearby(e.target.value);
  };

  const handleDestinationMainChange = (e) => {
    setNewDestinationMain(e.target.value);
  };

  const handleDestinationNearbyChange = (e) => {
    setNewDestinationNearby(e.target.value);
  };

  const addSource = () => {
    if (newSourceMain.trim() !== "" && newSourceNearby.trim() !== "") {
      const newSource = `${newSourceMain} - ${newSourceNearby}`;
      setRouteData({
        ...routeData,
        sourceList: [...routeData.sourceList, newSource],
      });
      setNewSourceMain("");
      setNewSourceNearby("");
    }
  };

  const addDestination = () => {
    if (
      newDestinationMain.trim() !== "" &&
      newDestinationNearby.trim() !== ""
    ) {
      const newDestination = `${newDestinationMain} - ${newDestinationNearby}`;
      setRouteData({
        ...routeData,
        destinationList: [...routeData.destinationList, newDestination],
      });
      setNewDestinationMain("");
      setNewDestinationNearby("");
    }
  };

  const removeSource = (index) => {
    const newSourceList = [...routeData.sourceList];
    newSourceList.splice(index, 1);
    setRouteData({ ...routeData, sourceList: newSourceList });
  };

  const removeDestination = (index) => {
    const newDestinationList = [...routeData.destinationList];
    newDestinationList.splice(index, 1);
    setRouteData({ ...routeData, destinationList: newDestinationList });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can send the routeData to your backend endpoint using fetch or any other method
    console.log(routeData);
    // Reset the form after submission if needed
    setRouteData({
      routeName: "",
      sourceList: [],
      destinationList: [],
      agencyId: "",
    });
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
          Source Main Location:
          <input
            type="text"
            value={newSourceMain}
            onChange={handleSourceMainChange}
          />
        </label>
        <label>
          Source Nearby Location:
          <input
            type="text"
            value={newSourceNearby}
            onChange={handleSourceNearbyChange}
          />
        </label>
        <button type="button" onClick={addSource}>
          Add Source
        </button>
        <ul>
          {routeData.sourceList.map((source, index) => (
            <li key={index}>
              {source}
              <button type="button" onClick={() => removeSource(index)}>
                X
              </button>
            </li>
          ))}
        </ul>
        <br />
        <label>
          Destination Main Location:
          <input
            type="text"
            value={newDestinationMain}
            onChange={handleDestinationMainChange}
          />
        </label>
        <label>
          Destination Nearby Location:
          <input
            type="text"
            value={newDestinationNearby}
            onChange={handleDestinationNearbyChange}
          />
        </label>
        <button type="button" onClick={addDestination}>
          Add Destination
        </button>
        <ul>
          {routeData.destinationList.map((destination, index) => (
            <li key={index}>
              {destination}
              <button type="button" onClick={() => removeDestination(index)}>
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
    </div>
  );
};

export default AddRoute;
