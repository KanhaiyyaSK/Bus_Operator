import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Employees() {
  const [agencyId, setAgencyId] = useState("");
  const [empType, setEmployeeType] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  useEffect(() => {
    // Set the agencyId when the component mounts
    setAgencyId("6591aa7f08a3d6c7634951a3");
  }, []);

  const handleEmployeeTypeChange = (event) => {
    setEmployeeType(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleContactChange = (event) => {
    setContact(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = {
        agencyId,
        empType: empType === "Driver" ? 1 : 0,
        name,
        mobileNumber: contact, // Assuming contact is the mobile number
      };
      console.log("Form Data:", formData);

      const response = await axios.post(
        "https://pravas-path.onrender.com/employee/create",
        formData,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1Y2Y4NTc2YjcwMWZlOTM0MTc5ZjMwMyIsImFnZW5jeUlkIjpudWxsLCJpc1ZhbGlkYXRlZCI6dHJ1ZSwibmFtZSI6IlNhbmtldCIsIm1vYmlsZSI6IjgzNTY5OTQ5ODEiLCJwaG9uZU90cCI6IiIsIm90cEV4cGlyZVRpbWUiOm51bGwsInVzZXJUeXBlIjoiQ3VzdG9tZXIiLCJfX3YiOjE5LCJjb3Bhc3NlbmdlciI6W3sibmFtZSI6IlR1c2hhciBTaGlyYmhhdGUiLCJhZ2UiOiIyNSIsImdlbmRlciI6Ik1hbGUifSx7Im5hbWUiOiJTYW5rZXQiLCJhZ2UiOiIyNSIsImdlbmRlciI6Ik1hbGUifSx7Im5hbWUiOiJQcmFuamFsIFBhd2FyIiwiYWdlIjoiMjMiLCJnZW5kZXIiOiJGZW1hbGUifSx7Im5hbWUiOiJzaHJlZSAiLCJhZ2UiOiIyNCIsImdlbmRlciI6Ik1hbGUifSx7Im5hbWUiOiJQaXl1c2ggIiwiYWdlIjoiMjUiLCJnZW5kZXIiOiJNYWxlIn0seyJuYW1lIjoiS2FuaGFpeWEgIiwiYWdlIjoiMjUiLCJnZW5kZXIiOiJNYWxlIn1dLCJkb2IiOiIxMCIsImVtYWlsIjoic2Fua2V0aGFrZTQ4NDdAZ21haWwuY29tIiwiZ2VuZGVyIjoiTWFsZSIsIm15VHJpcHMiOltdfSwiaWF0IjoxNzE1MTA1NDE2LCJleHAiOjE3MTY0MDE0MTZ9.Dq6pXj0AbfzdC7ClP-y34OBfdMll97k9bXbMMz94hK4`,
          },
        }
      );

      console.log("Response:", response.data);
      toast.success("Employee added successfully!");
      // Reset form fields after successful submission
      resetForm();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error adding employee. Please try again.");
    }
  };

  const resetForm = () => {
    setEmployeeType("");
    setName("");
    setContact("");
  };

  return (
    <div>
      <h1>Employee Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Employee Type:
          <select value={empType} onChange={handleEmployeeTypeChange}>
            <option value="">Select Employee Type</option>
            <option value="Driver">Driver</option>
            <option value="Conductor">Conductor</option>
          </select>
        </label>
        <br />

        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>

        <br />

        <label>
          Contact:
          <input type="text" value={contact} onChange={handleContactChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Employees;
