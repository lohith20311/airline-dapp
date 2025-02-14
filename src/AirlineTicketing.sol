// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract AirlineTicketing {
    struct Flight {
        string flightNumber;
        string destination;
        uint256 departureTime;
        uint256 price;
        uint256 availableSeats;
    }

    struct Booking {
        address customer;
        uint256 flightId;
        bool isCancelled;
    }

    Flight[] public flights;
    mapping(uint256 => Booking[]) public bookings;
    mapping(address => uint256[]) public customerBookings;

    // Flight Management Functions

    function addFlight(
        string memory _flightNumber,
        string memory _destination,
        uint256 _departureTime,
        uint256 _price,
        uint256 _availableSeats
    ) public {
        flights.push(Flight({
            flightNumber: _flightNumber,
            destination: _destination,
            departureTime: _departureTime,
            price: _price,
            availableSeats: _availableSeats
        }));
    }

    function getFlight(uint256 _flightId) public view returns (Flight memory) {
        require(_flightId < flights.length, "Flight does not exist");
        return flights[_flightId];
    }

    // Booking Functionality

    function bookFlight(uint256 _flightId) public payable {
        require(_flightId < flights.length, "Flight does not exist");
        Flight storage flight = flights[_flightId];
        require(msg.value == flight.price, "Incorrect payment amount");
        require(flight.availableSeats > 0, "No available seats");

        flight.availableSeats--;
        bookings[_flightId].push(Booking({
            customer: msg.sender,
            flightId: _flightId,
            isCancelled: false
        }));
        customerBookings[msg.sender].push(_flightId);
    }

    // Cancellation and Refunds

    function cancelBooking(uint256 _flightId) public {
        require(_flightId < flights.length, "Flight does not exist");
        Flight storage flight = flights[_flightId];

        Booking[] storage flightBookings = bookings[_flightId];
        for (uint256 i = 0; i < flightBookings.length; i++) {
            if (flightBookings[i].customer == msg.sender && !flightBookings[i].isCancelled) {
                flightBookings[i].isCancelled = true;
                flight.availableSeats++;
                payable(msg.sender).transfer(flight.price);
                break;
            }
        }
    }
}
