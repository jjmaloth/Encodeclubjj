# Deployed Script




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
