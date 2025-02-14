// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Test} from "forge-std/Test.sol";
import {AirlineTicketing} from "../src/AirlineTicketing.sol";

contract AirlineTicketingTest is Test {
    AirlineTicketing public airlineTicketing;

    address public customer = address(0x123);
    uint256 public flightId;

    function setUp() public {
        airlineTicketing = new AirlineTicketing();
        airlineTicketing.addFlight("AI202", "New York", block.timestamp + 1 days, 1 ether, 100);
        flightId = 0; // Assuming the first flight added has ID 0
    }
                function testAddFlight() public {
                    AirlineTicketing.Flight memory flight = airlineTicketing.getFlight(flightId);
                    assertEq(flight.flightNumber, "AI202");
                    assertEq(flight.destination, "New York");
                    assertEq(flight.departureTime, block.timestamp + 1 days);
                    assertEq(flight.price, 1 ether);
                    assertEq(flight.availableSeats, 100);
                }


    function testBookFlight() public {
        vm.deal(customer, 1 ether);
        vm.prank(customer);
        airlineTicketing.bookFlight{value: 1 ether}(flightId);

        (address bookedCustomer, uint256 bookedFlightId, bool isCancelled) = airlineTicketing.bookings(flightId, 0);
        assertEq(bookedCustomer, customer);
        assertEq(bookedFlightId, flightId);
        assertEq(isCancelled, false);
    }

    function testCancelBooking() public {
        vm.deal(customer, 1 ether);
        vm.prank(customer);
        airlineTicketing.bookFlight{value: 1 ether}(flightId);

        vm.prank(customer);
        airlineTicketing.cancelBooking(flightId);

        (address bookedCustomer, uint256 bookedFlightId, bool isCancelled) = airlineTicketing.bookings(flightId, 0);
        assertEq(bookedCustomer, customer);
        assertEq(bookedFlightId, flightId);
        assertEq(isCancelled, true);
    }
}
