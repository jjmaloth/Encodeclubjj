#Deployed Contract



// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
contract HelloWorld {
    string private text;
    address public owner;

    modifier onlyOwner()
    {
        require (msg.sender == owner, "Caller is not the owner");
        _;
    }

    constructor() {
        text = "Hello World";
        owner = msg.sender;
    }

    function helloWorld() public view returns (string memory) {
        return text;
    }

    function setText(string calldata newText) public onlyOwner {
        text = newText;
    }
    
    function transferOwnership(address newOwner) public onlyOwner {
        owner = newOwner;
    }
}

#Deployed Script


import { viem } from "hardhat";
import { toHex, hexToString } from "viem";

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

async function main() {
    try {
        console.log("Starting deployment process...");
        
        console.log("Initial Proposals: ");
        PROPOSALS.forEach((element, index) => {
          console.log(`Proposal N. ${index + 1}: ${element}`);
        });
        
        console.log("\nGetting deployment wallet...");
        const publicClient = await viem.getPublicClient();
        const [deployer] = await viem.getWalletClients();
        console.log("Deploying from address:", deployer.account.address);
        
        console.log("\nDeploying Ballot contract...");
        const contract = await viem.deployContract("Ballot", [
          PROPOSALS.map((prop) => toHex(prop, { size: 32 }))
        ]);
        
        console.log("\nDeployment Transaction Details:");
        console.log("Contract Address:", contract.address);
        
        // Check if deployer is chairperson
        const chairperson = await contract.read.chairperson();
        console.log("\nChairperson address:", chairperson);
        
        // Display initial vote counts
        console.log("\nInitial Vote Counts:");
        for (let index = 0; index < PROPOSALS.length; index++) {
          const proposal = await contract.read.proposals([BigInt(index)]);
          const name = hexToString(proposal[0], { size: 32 });
          const voteCount = proposal[1];  // voteCount is the second element in the proposal struct
          console.log(`${name}: ${voteCount} vote(s)`);
        }
        
        // Vote for proposal 1 (the deployer is automatically given voting rights as chairperson)
        console.log("\nVoting for Proposal 1...");
        await contract.write.vote([BigInt(0)]);  // 0 is the index for Proposal 1
        console.log("Vote cast for Proposal 1");
        
        // Display updated vote counts
        console.log("\nUpdated Vote Counts:");
        for (let index = 0; index < PROPOSALS.length; index++) {
          const proposal = await contract.read.proposals([BigInt(index)]);
          const name = hexToString(proposal[0], { size: 32 });
          const voteCount = proposal[1];
          console.log(`${name}: ${voteCount} vote(s)`);
        }
        
        // Display winning proposal
        const winningProposal = await contract.read.winningProposal();
        const winnerName = await contract.read.winnerName();
        console.log("\nWinning Proposal:", hexToString(winnerName, { size: 32 }));
        
    } catch (error) {
        console.error("Operation failed:", error);
        throw error;
    }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

**Taufik - JH2nHs**
Created the smart contract for Vote TRX 0x037366a1b364b48917e58f1b038c6c0dc8d4fc4f to vote

**Svart Galla - HSWW8s**
Interacted with Contract 0x037366a1b364b48917e58f1b038c6c0dc8d4fc4f and voting rights implemented

**CryptoWin - GMm8Id**
1.	https://sepolia.etherscan.io/address/0x317f14ff4b06f92abe9c1a16f1b3177c4c1ebc7d
2.	Deployed the contract to address: 0x317f14ff4b06f92abe9c1a16f1b3177c4c1ebc7d
2.	Confirmed the deployer (0x475Eed7198DAa36E46936095EFaf8417AA6F0242) is the chairperson
3.	Showed initial vote counts (all 0)
4.	Cast a vote for Proposal 1
5.	Showed updated vote counts
6.	Displayed the winning proposal





