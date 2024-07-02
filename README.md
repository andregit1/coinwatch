## Overview

Coinwatch is a React application that tracks and displays cryptocurrency data, including wallet balances and conversions. This README provides instructions on how to run the application using Docker and without Docker, as well as guidance for setting up and using MetaMask.

## Prerequisites

- Node.js (version 18 or higher -- this app using version **20.15.0**)
- Docker and Docker Compose (for Docker setup)

## Running the App

### Without Docker

1. **Clone the Repository**

   ```bash
   git clone https://github.com/andregit1/coinwatch.git
   cd coinwatch
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start the Application**

   ```bash
   npm start
   ```

4. **Open the App in Your Browser**
   ```
   Open http://localhost:3000 in your browser
   ```

### With Docker

1. **Clone the Repository**

   ```bash
   git clone https://github.com/andregit1/coinwatch.git
   cd coinwatch
   ```

2. **Build the Docker Image**

   ```bash
   docker-compose build
   ```

3. **Start the Application**

   ```bash
   docker-compose up
   ```

4. **Open the App in Your Browser**
   ```
   Open http://localhost:3000 in your browser
   ```

## MetaMask Setup and Usage

### Install MetaMask

1. **Download and Install MetaMask**
   - Visit the [MetaMask website](https://metamask.io/) and download the extension for your preferred browser.
   - Follow the installation instructions and add the MetaMask extension to your browser.

### Set Up MetaMask

1. **Create a New Wallet or Import an Existing Wallet**

   - Open the MetaMask extension and follow the instructions to create a new wallet or import an existing wallet using your seed phrase.

2. **Connect to Ethereum Mainnet or a Test Network**
   - Ensure MetaMask is connected to the Ethereum Mainnet or a test network (e.g., Ropsten, Rinkeby) depending on your use case.

### Using MetaMask with Coinwatch

1. **Connect Your Wallet**

   - Open Coinwatch in your browser.
   - Click on the wallet icon in the header to connect your MetaMask wallet to Coinwatch.
   - Follow the MetaMask prompts to approve the connection.

2. **View Wallet Information**

   - Once connected, your wallet address and balance will be displayed in the WalletCard component.
   - Use the eye icons to toggle the visibility of your address and balance.

3. **Fetch Cryptocurrency Data**
   - Coinwatch fetches and displays cryptocurrency data using the CoinGecko API. Ensure you have an internet connection to fetch the latest data.
