import React, { useState } from "react";

function Employees() {
  const [employeeType, setEmployeeType] = useState("");
  const [name, setName] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [contact, setContact] = useState("");

  const handleEmployeeTypeChange = (event) => {
    setEmployeeType(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLicenseNumberChange = (event) => {
    setLicenseNumber(event.target.value);
  };

  const handleContactChange = (event) => {
    setContact(event.target.value);
  };
  
  

  return (
    <div>
      <h1>Employee Form</h1>
      <label>
        Employee Type:
        <select value={employeeType} onChange={handleEmployeeTypeChange}>
          <option value="">Select Employee Type</option>
          <option value="Driver">Driver</option>
          <option value="Conductor">Conductor</option>
        </select>
      </label>
      <br />
      {employeeType === "Driver" && (
        <>
          <label>
            Name:
            <input type="text" value={name} onChange={handleNameChange} />
          </label>
          <br />
          <label>
            Licence Number:
            <input
              type="text"
              value={licenseNumber}
              onChange={handleLicenseNumberChange}
            />
          </label>
          <br />
        </>
      )}
      {employeeType === "Conductor" && (
        <>
          <label>
            Name:
            <input type="text" value={name} onChange={handleNameChange} />
          </label>
          <br />
        </>
      )}
      <label>
        Contact:
        <input type="text" value={contact} onChange={handleContactChange} />
      </label>
      <br />
    </div>
  );
}

export default Employees;
