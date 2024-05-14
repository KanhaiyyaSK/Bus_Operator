import React, { useState } from "react";

const BusSeats = ({ seats, onSeatClick }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seatId) => {
    // Toggle seat selection
    const isSelected = selectedSeats.includes(seatId);
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }

    // Pass the seatId to the parent component
    onSeatClick(seatId);
  };

  return (
    <div className="bus-seats">
      <h2>Bus Seats</h2>
      <div className="seats-container">
        {Object.keys(seats).map((seatId) => (
          <div
            key={seatId}
            className={`seat ${
              seats[seatId] === "booked"
                ? "booked"
                : selectedSeats.includes(seatId)
                ? "selected"
                : "available"
            }`}
            onClick={() => handleSeatClick(seatId)}
          >
            {seatId}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusSeats;
