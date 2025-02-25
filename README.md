# Airline-dApp

Airline-dApp is a decentralized application (dApp) designed to manage airline ticketing on the Polygon blockchain. It leverages smart contracts written in Solidity, with a backend powered by Node.js and a frontend built using React.js.

## Project Structure

The project is organized into the following directories:

```
airline-dapp/
├── backend/                # Node.js backend server
│   ├── index.js            # Main server file
│   ├── package.json        # Backend dependencies
├── frontend/               # React.js frontend application
│   ├── src/
│   │   ├── App.js          # Main React component
│   │   ├── index.js        # Entry point for React
│   ├── package.json        # Frontend dependencies
├── src/                    # Solidity smart contracts
│   ├── AirlineTicketing.sol # Main smart contract
├── script/                 # Deployment scripts
│   ├── DeployAirlineTicketing.s.sol # Deployment script for the smart contract
├── test/                   # Test scripts for smart contracts
│   ├── AirlineTicketing.t.sol # Test cases for the smart contract
├── foundry.toml            # Foundry configuration file
├── package.json            # Root package file for managing scripts
├── README.md               # Project documentation
```

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.20.6 or later)
- [Foundry](https://book.getfoundry.sh/) (for smart contract development)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Setup Instructions

Follow these steps to set up and run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/airline-dapp.git
cd airline-dapp
```

### 2. Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

### 3. Compile and Deploy Smart Contracts

Ensure Foundry is installed and set up correctly. Compile and deploy the smart contracts using the provided scripts.

```bash
forge build
forge script script/DeployAirlineTicketing.s.sol --broadcast
```


This will compile the `AirlineTicketing.sol` contract and deploy it to the specified network. Ensure you have configured your deployment script with the correct network settings.

### 4. Configure Backend

After deploying the smart contract, note the deployed contract address. Update the backend configuration to interact with this contract. In `backend/index.js`, set the contract address and ensure the ABI matches the deployed contract.

```javascript
const contractAddress = 'YOUR_DEPLOYED_CONTRACT_ADDRESS';
const abi = [/* ABI array */];
```

### 5. Run the Backend Server

```bash
cd backend
node index.js
```


The backend server should now be running, ready to handle requests from the frontend.

### 6. Configure Frontend

In the frontend React application, update the configuration to point to the deployed contract and backend server. Ensure the contract address and ABI are correctly set in the frontend code.

### 7. Run the Frontend Application

```bash
cd frontend
npm start
```


This will start the React development server. Open your browser and navigate to `http://localhost:3000` to access the Airline-dApp.

## Testing

To run tests for the smart contracts:

```bash
forge test
```


Ensure all tests pass to confirm the smart contracts behave as expected.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.

---

For more information on building full-stack dApps, consider exploring the following resources:

- [Building Full Stack dApps with React, Ethers.js, Solidity, and Hardhat](https://github.com/asfandyar-malik/React-Dapp)
- [Creating Your First Full-Stack dApp with Solidity, Hardhat, and React](https://barrettk.hashnode.dev/creating-your-first-full-stack-dapp-with-solidity-hardhat-and-react)

These resources provide comprehensive guides and examples to enhance your understanding and development of decentralized applications. 