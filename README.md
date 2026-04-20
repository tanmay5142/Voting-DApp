Decentralized Voting Application (DApp):

A Blockchain-based Voting System built using Solidity, Next.js, Ethers.js, and IPFS that ensures secure, transparent, and tamper-proof voting.
The application allows an organizer to register candidates and voters, and enables authorized voters to cast votes through MetaMask on the Sepolia Ethereum Test Network.

Features:
* Secure voting using Ethereum Smart Contracts
* Register voters with wallet addresses
* Register candidates with image and metadata
* One vote per voter (prevents double voting)
* Automatic vote counting
* Data stored on IPFS (Pinata)
* MetaMask wallet integration
* Transparent and immutable voting records
* Deployed on Sepolia Testnet

Tech Stack:

Blockchain:
*Solidity
*Hardhat
*Ethers.js
*Sepolia Test Network

Frontend:
*Next.js (React Framework)
*JavaScript
*CSS Modules
Web3 Tools:

*MetaMask Wallet
*Infura RPC
*Pinata IPFS

📂 Project Structure
  Decentralized-Voting-DApp
  │
  ├── contracts
  │   └── Create.sol
  │
  ├── context
  │   └── Voter.js
  │
  ├── pages
  │   ├── index.js
  │   ├── candidate-registration.js
  │   └── allowed-voters.js
  │
  ├── components
  │   ├── NavBar
  │   └── Card
  │
  ├── scripts
  │   └── deploy.js
  │
  ├── styles
  │
  └── README.md