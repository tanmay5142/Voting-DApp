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

Installation & Setup
**Clone the repository
git clone https://github.com/tanmay5142/Voting-DApp.git
cd decentralized-voting-dapp
**Install dependencies
npm install
**Install Hardhat dependencies
npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers
**Setup environment variables
Create a .env file:
PRIVATE_KEY=your_metamask_private_key
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY
5️Compile smart contract
npx hardhat compile
6️Deploy contract on Sepolia
npx hardhat run scripts/deploy.js --network sepolia
After deployment, copy the contract address and update:
context/constants.js
export const VotingAddress = "DEPLOYED_CONTRACT_ADDRESS";
**Run the frontend
npm run dev
App will run at:
http://localhost:3000

🔑 Wallet Setup
Install MetaMask browser extension:
https://metamask.io/
Add Sepolia network:
Network Name: Sepolia
RPC URL: https://ethereum-sepolia.publicnode.com
Chain ID: 11155111
Currency Symbol: ETH
Block Explorer: https://sepolia.etherscan.io
Get free test ETH:
https://sepoliafaucet.com/
🧠 How the System Works
Step 1: Deploy Smart Contract

Organizer deploys the contract on Sepolia blockchain.

Step 2: Register Candidates

Organizer registers candidates with:

Name
Age
Wallet address
Image (stored on IPFS)
Step 3: Register Voters

Organizer adds voters using wallet addresses.

Each voter is given permission to vote.

Step 4: Vote

Registered voters connect MetaMask and vote for candidates.

Each voter can vote only once.

Step 5: Count Votes

Votes are stored on blockchain and can be viewed transparently.

📸 Screenshots (optional)

You can add screenshots here:

Home Page
Candidate List
Voter List
MetaMask Transaction
🔒 Smart Contract Features
Mapping for storing candidates and voters
Prevents duplicate voting
Stores candidate metadata on IPFS
Uses Ethereum wallet address as unique identity
Transparent vote count
🌐 IPFS Storage

Images and metadata are stored using Pinata IPFS:

Image → IPFS hash
Metadata → IPFS hash

Example:

https://gateway.pinata.cloud/ipfs/<hash>
🧪 Example Workflow
Deploy contract
Register candidates
Register voters
Connect MetaMask as voter
Cast vote
View vote count
📌 Important Notes
Each voter must use a unique wallet address
Candidate and voter should not use the same address
Sepolia ETH is required for transaction gas
Contract address must match frontend configuration
📈 Future Improvements
Display winning candidate
Voting deadline timer
Admin dashboard
Prevent duplicate candidate registration
Deploy frontend on Vercel
Add wallet authentication roles
👨‍💻 Author

Tanmay Anand

📜 License

This project is open-source and available under the MIT License.

If you want, I can also provide:

README with screenshots section formatted
short README version
project description for resume
viva explanation notes
