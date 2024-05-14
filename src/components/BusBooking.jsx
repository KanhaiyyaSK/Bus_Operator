import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/BusBooking.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BusBooking() {
  const [busId, setBusId] = useState("");
  const [busName, setBusName] = useState("");
  const [busModel, setBusModel] = useState("");
  const [busType, setBusType] = useState("");
  const [busRegistrationNumber, setBusRegistrationNumber] = useState("");
  const [busPermitNumber, setBusPermitNumber] = useState("");
  const [busInsuranceNumber, setBusInsuranceNumber] = useState("");
  const [busAmenities, setBusAmenities] = useState([]);
  const [busPhotos, setBusPhotos] = useState([]);
  const [busSeats, setBusSeats] = useState({});
  const [agencyId, setAgencyId] = useState("");
  const navigate = useNavigate(); // Replaced useHistory with useNavigate

  const handleBusIdChange = (event) => {
    setBusId(event.target.value);
  };

  const handleBusNameChange = (event) => {
    setBusName(event.target.value);
  };

  const handleBusModelChange = (event) => {
    setBusModel(event.target.value);
  };

  const handleBusTypeChange = (event) => {
    setBusType(event.target.value);
  };

  const handleBusRegistrationNumberChange = (event) => {
    setBusRegistrationNumber(event.target.value);
  };

  const handleBusPermitNumberChange = (event) => {
    setBusPermitNumber(event.target.value);
  };

  const handleBusInsuranceNumberChange = (event) => {
    setBusInsuranceNumber(event.target.value);
  };

  const handleBusAmenitiesChange = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setBusAmenities(selectedOptions);
  };

  const handleBusPhotosChange = (event) => {
    const files = Array.from(event.target.files);
    setBusPhotos(files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = {
        agencyId,
        busId,
        busName,
        busModel,
        busType,
        busRegistrationNumber,
        busPermitNumber,
        busInsuranceNumber,
        busAmenities,
        busPhotos,
      };

      console.log("Data:", data); // Log the data before sending the request

      const response = await axios.post(
        "https://pravas-path.onrender.com/bus/addBus",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1Y2Y4NTc2YjcwMWZlOTM0MTc5ZjMwMyIsImFnZW5jeUlkIjpudWxsLCJpc1ZhbGlkYXRlZCI6dHJ1ZSwibmFtZSI6IlNhbmtldCIsIm1vYmlsZSI6IjgzNTY5OTQ5ODEiLCJwaG9uZU90cCI6IiIsIm90cEV4cGlyZVRpbWUiOm51bGwsInVzZXJUeXBlIjoiQ3VzdG9tZXIiLCJfX3YiOjE5LCJjb3Bhc3NlbmdlciI6W3sibmFtZSI6IlR1c2hhciBTaGlyYmhhdGUiLCJhZ2UiOiIyNSIsImdlbmRlciI6Ik1hbGUifSx7Im5hbWUiOiJTYW5rZXQiLCJhZ2UiOiIyNSIsImdlbmRlciI6Ik1hbGUifSx7Im5hbWUiOiJQcmFuamFsIFBhd2FyIiwiYWdlIjoiMjMiLCJnZW5kZXIiOiJGZW1hbGUifSx7Im5hbWUiOiJzaHJlZSAiLCJhZ2UiOiIyNCIsImdlbmRlciI6Ik1hbGUifSx7Im5hbWUiOiJQaXl1c2ggIiwiYWdlIjoiMjUiLCJnZW5kZXIiOiJNYWxlIn0seyJuYW1lIjoiS2FuaGFpeWEgIiwiYWdlIjoiMjUiLCJnZW5kZXIiOiJNYWxlIn1dLCJkb2IiOiIxMCIsImVtYWlsIjoic2Fua2V0aGFrZTQ4NDdAZ21haWwuY29tIiwiZ2VuZGVyIjoiTWFsZSIsIm15VHJpcHMiOltdfSwiaWF0IjoxNzE1MTA1NDE2LCJleHAiOjE3MTY0MDE0MTZ9.Dq6pXj0AbfzdC7ClP-y34OBfdMll97k9bXbMMz94hK4`,
          },
        }
      );

      console.log("Response:", response.data);
      toast.success("Bus added successfully!");
      // Reset form fields after successful submission
      resetForm();
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        `${error.response.data.message}` || "Error adding bus. Please try again"
      );
    }
  };

  const resetForm = () => {
    setBusId("");
    setBusName("");
    setBusModel("");
    setBusType("");
    setBusRegistrationNumber("");
    setBusPermitNumber("");
    setBusInsuranceNumber("");
    setBusAmenities([]);
    setBusPhotos([]);
    setBusSeats({});
    setAgencyId("");
  };

  const handleSeatDesign = () => {
    // Navigate to "/BusDesign" and pass form data as state
    navigate("/BusDesign", {
      state: {
        formData: {
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
        },
      },
    });
  };

  return (
    <div>
      <h1>Bus Booking</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Bus ID:
          <input type="text" value={busId} onChange={handleBusIdChange} />
        </label>
        <br />
        <label>
          Bus Name:
          <input type="text" value={busName} onChange={handleBusNameChange} />
        </label>
        <br />
        <label>
          Bus Model:
          <input type="text" value={busModel} onChange={handleBusModelChange} />
        </label>
        <br />
        <label>
          Bus Type:
          <input type="text" value={busType} onChange={handleBusTypeChange} />
        </label>
        <br />
        <label>
          Registration Number:
          <input
            type="text"
            value={busRegistrationNumber}
            onChange={handleBusRegistrationNumberChange}
          />
        </label>
        <br />
        <label>
          Agency ID:
          <input
            type="text"
            value={agencyId}
            onChange={(event) => setAgencyId(event.target.value)}
          />
        </label>
        <br />
        <label>
          Permit Number:
          <input
            type="text"
            value={busPermitNumber}
            onChange={handleBusPermitNumberChange}
          />
        </label>
        <br />
        <label>
          Insurance Number:
          <input
            type="text"
            value={busInsuranceNumber}
            onChange={handleBusInsuranceNumberChange}
          />
        </label>
        <br />
        <label>
          Bus Amenities:
          <select
            multiple
            value={busAmenities}
            onChange={handleBusAmenitiesChange}
          >
            <option value="Wifi">Wifi</option>
            <option value="Entertainment System">Entertainment System</option>
            <option value="AC">AC</option>
            <option value="Charging Ports">Charging Ports</option>{" "}
            {/* Additional option */}
            <option value="Restroom">Restroom</option> {/* Additional option */}
            {/* Add more options as needed */}
          </select>
        </label>
        <br />
        {/*
    <label>
    Bus Photos:
    <input type="file" multiple onChange={handleBusPhotosChange} />
    </label>
    <br />
  */}

        <button type="button" onClick={handleSeatDesign}>
          Seat Design
        </button>
      
      </form>
      <ToastContainer />
    </div>
  );
}

export default BusBooking;
