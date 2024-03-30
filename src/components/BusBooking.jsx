// components/BusBooking.js
import { useState } from "react";
import "./styles/BusBooking.css"

function BusBooking() {
  const [busMake, setBusMake] = useState("");
  const [busCapacity, setBusCapacity] = useState("");
  const [seatingType, setSeatingType] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [permitNumber, setPermitNumber] = useState("");
  const [insuranceNumber, setInsuranceNumber] = useState("");
  const [busAmenities, setBusAmenities] = useState([]);
  const [busPhotos, setBusPhotos] = useState([]);

  const handleBusMakeChange = (event) => {
    setBusMake(event.target.value);
  };

  const handleBusCapacityChange = (event) => {
    setBusCapacity(event.target.value);
  };

  const handleSeatingTypeChange = (event) => {
    setSeatingType(event.target.value);
  };

  const handleRegistrationNumberChange = (event) => {
    setRegistrationNumber(event.target.value);
  };

  const handlePermitNumberChange = (event) => {
    setPermitNumber(event.target.value);
  };

  const handleInsuranceNumberChange = (event) => {
    setInsuranceNumber(event.target.value);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission, you can send data to the backend or perform other actions here
  };

  return (
    <div>
      <h1>Bus Booking</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Bus Make:
          <select value={busMake} onChange={handleBusMakeChange}>
            <option value="">Select Bus Make</option>
            <option value="Bus Make 1">Bus Make 1</option>
            <option value="Bus Make 2">Bus Make 2</option>
            {/* Add more options as needed */}
          </select>
        </label>
        <br />
        <label>
          Bus Capacity:
          <input
            type="text"
            value={busCapacity}
            onChange={handleBusCapacityChange}
          />
        </label>
        <br />
        <label>
          Seating Type:
          <select value={seatingType} onChange={handleSeatingTypeChange}>
            <option value="">Select Seating Type</option>
            <option value="AC seater (2+2)">AC seater (2+2)</option>
            <option value="AC seater (2+1)">AC seater (2+1)</option>
            <option value="AC sleeper (2+1)">AC sleeper (2+1)</option>
            <option value="AC seater/sleeper (2+1)">
              AC seater/sleeper (2+1)
            </option>
            {/* Add more options as needed */}
          </select>
        </label>
        <br />
        <label>
          Registration Number:
          <input
            type="text"
            value={registrationNumber}
            onChange={handleRegistrationNumberChange}
          />
        </label>
        <br />
        <label>
          Permit Number:
          <input
            type="text"
            value={permitNumber}
            onChange={handlePermitNumberChange}
          />
        </label>
        <br />
        <label>
          Insurance Number:
          <input
            type="text"
            value={insuranceNumber}
            onChange={handleInsuranceNumberChange}
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
            {/* Add more options as needed */}
          </select>
        </label>
        <br />
        <label>
          Bus Photos:
          <input type="file" multiple onChange={handleBusPhotosChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default BusBooking;
