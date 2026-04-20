import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";
import { useRouter } from "next/router";

// INTERNAL IMPORT
import { VotingAddress, VotingAddressABI } from "./constants";



const fetchContract = (signerOrProvider) =>
  new ethers.Contract(
    VotingAddress,
    VotingAddressABI,
    signerOrProvider
  );

export const VotingContext = React.createContext();

export const VotingProvider = ({ children }) => {
  const VotingTitle = "My first smart contract app";
  const router = useRouter();
  const [currentAccount, setCurrentAccount] = useState('');
  const [candidateLength, setCandidateLength] = useState('');
  const pushCandidate = [];
  const candidateIndex = [];
  const [candidateArray, setCandidateArray] = useState(pushCandidate);

  //---------END OF CANDIDATE

  const [error, setError] = useState('');
  const highestVote = [];

  //------VOTER SECTION
  const pushVoter = [];
  const [voterArray, setVoterArray] = useState(pushVoter);
  const [voterLength, setVoterLength] = useState('');
  const [voterAddress, setVoterAddress] = useState([]);

  //-----CONNECTING METAMASK

  const checkIfWalletIsConnected = async()=>{
    if (!window.ethereum) return setError("Please Install MetaMask");

    const account = await window.ethereum.request({method: "eth_accounts"});

    if(account.length){
        setCurrentAccount(account[0]);
    } else {
        setError("Please Install MetaMask & Connect, Reload");
    }
  };

  //-------CONNECT WALLET
  const connectWallet = async()=>{
    if(!window.ethereum) return setError("Please Install MetaMask");

    const account = await window.ethereum.request({method: "eth_requestAccounts",});

    setCurrentAccount(account[0]);
  };

  //UPLOAD TO IPFS VOTER IMAGE
  const uploadToIPFS = async (file) => {
  try {
    const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
    const data = new FormData();
    data.append("file", file);
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        pinata_api_key: "19f4d8a1a68934b915a0",
        pinata_secret_api_key: "aaab4e1aa2d1fce87c20c27e90cd09ba3416a31c0912dc9a84d39947540ffabc",
      },
    });
    const fileURL =
      "https://gateway.pinata.cloud/ipfs/" +
      response.data.IpfsHash;
    return fileURL;
  } catch (error) {
    setError("Error uploading file");
  }
  };

  const uploadJSONToIPFS = async (formInput, fileUrl) => {
  try {
    const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
    const metadata = {
      name: formInput.name,
      address: formInput.address,
      position: formInput.position,
      image: fileUrl,
    };
    const response = await axios.post(url, metadata, {
      headers: {
        pinata_api_key: "19f4d8a1a68934b915a0",
        pinata_secret_api_key: "aaab4e1aa2d1fce87c20c27e90cd09ba3416a31c0912dc9a84d39947540ffabc",
        "Content-Type": "application/json",
      },
    });
    const metadataURL =
      "https://gateway.pinata.cloud/ipfs/" +
      response.data.IpfsHash;
    // console.log("Metadata URL:", metadataURL);
    return metadataURL;
  } catch (error) {
    console.log(error);
  }
  };

  const uploadToIPFSCandidate = async (file) => {
  try {
    const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
    const data = new FormData();
    data.append("file", file);
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        pinata_api_key: "19f4d8a1a68934b915a0",
        pinata_secret_api_key: "aaab4e1aa2d1fce87c20c27e90cd09ba3416a31c0912dc9a84d39947540ffabc",
      },
    });
    const fileURL =
      "https://gateway.pinata.cloud/ipfs/" +
      response.data.IpfsHash;
    return fileURL;
  }
  catch (error) {
    setError("Error uploading candidate image");
  }

  };

  const uploadJSONToIPFSCandidate = async (candidateForm, fileUrl) => {
  try {
    // console.log("uploading candidate metadata to ipfs");
    const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
    const metadata = {
      name: candidateForm.name,
      address: candidateForm.address,
      age: candidateForm.age,
      image: fileUrl
    };
    const response = await axios.post(url, metadata, {
      headers: {
        "Content-Type": "application/json",
        pinata_api_key: "19f4d8a1a68934b915a0",
        pinata_secret_api_key: "aaab4e1aa2d1fce87c20c27e90cd09ba3416a31c0912dc9a84d39947540ffabc",
      },
    });
    const metadataURL =
      "https://gateway.pinata.cloud/ipfs/" +
      response.data.IpfsHash;
      // console.log("metadataURL:", metadataURL);
    return metadataURL;
  }
  catch (error) {
    console.log(error);
  }
  };

  //-----CREATE VOTER

  const createVoter = async(formInput, fileUrl, router)=>{
    try {
      const {name, address, position} = formInput;
      
      if (!name || !address || !position || !fileUrl)
        return setError("Input data is missing");

      // console.log("image url from ipfs:", fileUrl);
      const metadataURL = await uploadJSONToIPFS(formInput, fileUrl);
      // console.log("Full voter data stored at:", metadataURL);
      //CONNECTING SMART CONTRACT
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const transaction = await contract.voterRight(
        address,
        name,
        fileUrl,
        metadataURL
      );
      // console.log("Transaction submitted 🚀");
      // console.log("Transaction hash:", transaction.hash);
      const receipt = await transaction.wait();
      // console.log("Transaction confirmed ✅");
      // console.log("Transaction receipt:", receipt);
      // console.log("Block number:", receipt.blockNumber);
      // console.log("Gas used:", receipt.gasUsed.toString());
      router.push("/voterList");

    } catch (error) {
      setError("Error in creating voter")
    }
  };

  //----------GET VOTER DATA ------//
  const getAllVoterData = async()=>{
    try{
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      //VOTER LIST
      const voterListData = await contract.getVoterList();
      setVoterAddress(voterListData);
      
      const voterData = await Promise.all(
      voterListData.map((el) => contract.getVoterdata(el))
      );
      // console.log("voter address:", voterListData);
      setVoterArray(voterData);

      //VOTER length
      const voterList = await contract.getVoterLength();
      setVoterLength(voterList.toNumber());
    }
    catch (error) {
      console.log("FETCH ERROR:", error);
      setError("Something went wrong fetching data");
    }
  };
    

  useEffect(() => {
    getAllVoterData();
  }, []);

  useEffect(() => {
    // console.log("VOTER ARRAY UPDATED:", voterArray);
  }, [voterArray]);

  //----GIVE VOTE
  const giveVote = async(id) => {
    try{
      const voterAddress = id.address;
      const voterId = id.id;
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const voteredList = await contract.vote(voterAddress, voterId);
      // console.log(voteredList);
    } catch(error) {
      console.log(error)
    }
  };

  //---------------CANDIDATE SECTION----------------

  const setCandidate = async(candidateForm, fileUrl, router)=>{
    try {
      // console.log("starting candidate creation");
      const { name, address, age } = candidateForm;
      
      if (!name || !address || !age || !fileUrl)
        return setError("Input data is missing");
      //upload metadata
      const metadataURL = await uploadJSONToIPFSCandidate(
        candidateForm,
        fileUrl
      );
      // console.log("metadata uploaded");
      //CONNECTING SMART CONTRACT
      // console.log("before wallet connect");
      const web3Modal = new Web3Modal();
      // console.log("opening metamask");
      const connection = await web3Modal.connect();
      // console.log("wallet connected");
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      // console.log("calling contract");

      const candidate = await contract.setCandidate( address, age.toString(), name, fileUrl, metadataURL);
      await candidate.wait();
      // console.log(candidate);
      // console.log("metadata uploaded", metadataURL);
      router.push("/");

    } catch (error) {
      console.log(error);
      setError("Error in creating candidate")
    }
  };

  //--GET CANDIDATE DATA
  const getNewCandidate = async()=>{
    try {
      //CONNECTING SMART CONTRACT
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      //----ALL CANDIDATE addressess
      const allCandidate = await contract.getCandidate();
      // console.log("candidate addresses:", allCandidate);

      //get full candidate data
      const candidateData = await Promise.all(
        allCandidate.map((el) => contract.getCandidatedata(el))
      );
      
      console.log("candidate data", candidateData);
      setCandidateArray(candidateData);
        

      //-------CANDIDATE length
      const allCandidateLength = await contract.getCandidateLength();
      setCandidateLength(allCandidateLength.toNumber());
    } catch (error) {
      console.error
    }
  };

  useEffect(()=> {
    getNewCandidate();
  }, []);

  return (
    <VotingContext.Provider value={{ VotingTitle, checkIfWalletIsConnected, connectWallet, uploadToIPFS,uploadJSONToIPFS, createVoter, getAllVoterData, giveVote, setCandidate, getNewCandidate, error, voterArray, voterLength, voterAddress, currentAccount, candidateLength, candidateArray, uploadToIPFSCandidate, uploadJSONToIPFSCandidate}}>
      {children}
    </VotingContext.Provider>
  );
};