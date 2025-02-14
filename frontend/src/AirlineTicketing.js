import React, { useState } from 'react';
import axios from 'axios';

function AirlineTicketing() {
  const [flightNumber, setFlightNumber] = useState('');
  const [destination, setDestination] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [price, setPrice] = useState('');
  const [availableSeats, setAvailableSeats] = useState('');

  const handleAddFlight = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/addFlight', {
        flightNumber,
        destination,
        departureTime,
        price,
        availableSeats,
      });
      alert(response.data);
    } catch (error) {
      alert('Error adding flight');
    }
  };

  return (
    <div>
      <h1>Add Flight</h1>
      <form onSubmit={handleAddFlight}>
        <input
          type="text"
          placeholder="Flight Number"
          value={flightNumber}
          onChange={(e) => setFlightNumber(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          value={departureTime}
          onChange={(e) => setDepartureTime(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price in ETH"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Available Seats"
          value={availableSeats}
          onChange={(e) => setAvailableSeats(e.target.value)}
          required
        />
        <button type="submit">Add Flight</button>
      </form>
    </div>
  );
}

export default AirlineTicketing;
