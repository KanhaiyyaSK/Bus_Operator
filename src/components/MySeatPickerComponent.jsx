import React, { useState, useEffect } from "react";
import "./styles/MySeatPickerComponent.css"; // Import CSS file for styling
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate and useLocation hooks from react-router-dom
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
const MySeatPickerComponent = () => {
  const [seatData, setSeatData] = useState(
    Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => ""))
  );
  const [busSeats, setSeatPositions] = useState({});
  const navigate = useNavigate(); // Use useNavigate hook to navigate between pages
  const location = useLocation(); // Use useLocation hook to get location state

  const sendDataToBackend = async () => {
    try {
      const {
        busId,
        busName,
        busModel,
        busType,
        busRegistrationNumber,
        busPermitNumber,
        busInsuranceNumber,
        busAmenities,
        busPhotos,
        agencyId,
      } = location.state.formData;

      const data = {
        busId,
        busName,
        busModel,
        busType,
        busRegistrationNumber,
        busPermitNumber,
        busInsuranceNumber,
        busAmenities,
        busPhotos,
        busSeats,
        agencyId,
      };

      console.log("Data to send:", data);

      // Set up headers for the request, including the bearer token
      const headers = {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1Y2Y4NTc2YjcwMWZlOTM0MTc5ZjMwMyIsImFnZW5jeUlkIjpudWxsLCJpc1ZhbGlkYXRlZCI6dHJ1ZSwibmFtZSI6IlNhbmtldCIsIm1vYmlsZSI6IjgzNTY5OTQ5ODEiLCJwaG9uZU90cCI6IiIsIm90cEV4cGlyZVRpbWUiOm51bGwsInVzZXJUeXBlIjoiQ3VzdG9tZXIiLCJfX3YiOjE5LCJjb3Bhc3NlbmdlciI6W3sibmFtZSI6IlR1c2hhciBTaGlyYmhhdGUiLCJhZ2UiOiIyNSIsImdlbmRlciI6Ik1hbGUifSx7Im5hbWUiOiJTYW5rZXQiLCJhZ2UiOiIyNSIsImdlbmRlciI6Ik1hbGUifSx7Im5hbWUiOiJQcmFuamFsIFBhd2FyIiwiYWdlIjoiMjMiLCJnZW5kZXIiOiJGZW1hbGUifSx7Im5hbWUiOiJzaHJlZSAiLCJhZ2UiOiIyNCIsImdlbmRlciI6Ik1hbGUifSx7Im5hbWUiOiJQaXl1c2ggIiwiYWdlIjoiMjUiLCJnZW5kZXIiOiJNYWxlIn0seyJuYW1lIjoiS2FuaGFpeWEgIiwiYWdlIjoiMjUiLCJnZW5kZXIiOiJNYWxlIn1dLCJkb2IiOiIxMCIsImVtYWlsIjoic2Fua2V0aGFrZTQ4NDdAZ21haWwuY29tIiwiZ2VuZGVyIjoiTWFsZSIsIm15VHJpcHMiOltdfSwiaWF0IjoxNzE1MTA1NDE2LCJleHAiOjE3MTY0MDE0MTZ9.Dq6pXj0AbfzdC7ClP-y34OBfdMll97k9bXbMMz94hK4",
        "Content-Type": "application/json", // Specify content type if necessary
      };

      // Send post request to backend using Axios with headers
      const response = await axios.post(
        "https://pravas-path.onrender.com/bus/addBus",
        data,
        { headers }
      );

      // Log response from backend
      console.log("Backend Response:", response.data);

      // Display success message using toast
      
      // Reset seat data and positions after successful submission
      setSeatPositions(
        Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => ""))
      );
      setSeatPositions({});
      toast.success("Bus added successfully!");
  
      

      // Navigate back to BusBooking page after successful submission
    } catch (error) {
      // Handle error
      console.error("Error:", error);
      toast.error(
        `${error.response.data.message}` || "Error adding bus. Please try again"
      );
    }
  };

  const handleInputChange = (rowIndex, colIndex, value) => {
    if (/^[0-9A-Za-z]{0,2}$/.test(value)) {
      // Update regex to allow only 0-9 and A-Z with max length of 2
      const newData = seatData.map((row, i) =>
        row.map((cell, j) => (i === rowIndex && j === colIndex ? value : cell))
      );
      setSeatData(newData);
      const newPositions = { ...busSeats };
      if (newPositions[value]) {
        newPositions[value].push([rowIndex, colIndex]);
      } else {
        newPositions[value] = [[rowIndex, colIndex]];
      }
      setSeatPositions(newPositions);
    }
  };

  const handleCreateSeatDesign = () => {
    // Call function to send data to backend
    sendDataToBackend();
  };

  return (
    <div className="seat-picker-container">
      <h2>Bus Seat Picker</h2>
      <table className="seat-table">
        <tbody>
          {seatData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  className={`${busSeats[cell] ? "occupied" : ""} seat-cell`}
                >
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) =>
                      handleInputChange(
                        rowIndex,
                        colIndex,
                        e.target.value.toUpperCase()
                      )
                    }
                    className={`${busSeats[cell] ? "occupied" : ""} cell-input`}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button className="create-button" onClick={handleCreateSeatDesign}>
        Create Seat Design
      </button>
      <ToastContainer />
    </div>
  );
};

export default MySeatPickerComponent;
