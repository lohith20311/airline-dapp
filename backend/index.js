require('dotenv').config();
const express = require('express');
const { ethers } = require('ethers');
const cors = require('cors');

const app = express();
const port = 3000;

// Load environment variables
const RPC_URL = process.env.RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

// Contract ABI (From your provided ABI)
const contractABI = [
    {
        "type": "function",
        "name": "addFlight",
        "inputs": [
            { "name": "_flightNumber", "type": "string" },
            { "name": "_destination", "type": "string" },
            { "name": "_departureTime", "type": "uint256" },
            { "name": "_price", "type": "uint256" },
            { "name": "_availableSeats", "type": "uint256" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "bookFlight",
        "inputs": [{ "name": "_flightId", "type": "uint256" }],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "cancelBooking",
        "inputs": [{ "name": "_flightId", "type": "uint256" }],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "getFlight",
        "inputs": [{ "name": "_flightId", "type": "uint256" }],
        "outputs": [
            {
                "name": "",
                "type": "tuple",
                "components": [
                    { "name": "flightNumber", "type": "string" },
                    { "name": "destination", "type": "string" },
                    { "name": "departureTime", "type": "uint256" },
                    { "name": "price", "type": "uint256" },
                    { "name": "availableSeats", "type": "uint256" }
                ]
            }
        ],
        "stateMutability": "view"
    }
];

// Connect to blockchain
const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, wallet);

app.use(express.json());
app.use(cors());

// Add a Flight
app.post('/addFlight', async (req, res) => {
    const { flightNumber, destination, departureTime, price, availableSeats } = req.body;
    try {
        const tx = await contract.addFlight(flightNumber, destination, departureTime, ethers.parseEther(price), availableSeats);
        await tx.wait();
        res.json({ message: 'Flight added successfully', txHash: tx.hash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Book a Flight
app.post('/bookFlight', async (req, res) => {
    const { flightId, value } = req.body;
    try {
        const tx = await contract.bookFlight(flightId, { value: ethers.parseEther(value) });
        await tx.wait();
        res.json({ message: 'Flight booked successfully', txHash: tx.hash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Cancel Booking
app.post('/cancelBooking', async (req, res) => {
    const { flightId } = req.body;
    try {
        const tx = await contract.cancelBooking(flightId);
        await tx.wait();
        res.json({ message: 'Booking cancelled successfully', txHash: tx.hash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Flight Details
app.get('/getFlight/:flightId', async (req, res) => {
    const { flightId } = req.params;
    try {
        const flight = await contract.getFlight(flightId);
        res.json({
            flightNumber: flight[0],
            destination: flight[1],
            departureTime: Number(flight[2]),
            price: ethers.formatEther(flight[3]),
            availableSeats: Number(flight[4]),
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
