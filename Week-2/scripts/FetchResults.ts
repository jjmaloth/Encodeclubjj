import { createPublicClient, http, hexToString } from 'viem';
import { sepolia } from 'viem/chains';
import { abi } from '../artifacts/contracts/Ballot.sol/Ballot.json';
import * as dotenv from 'dotenv';
dotenv.config();

const providerApiKey = process.env.ALCHEMY_API_KEY || '';
const ballotAddress = process.env.BALLOT_CONTRACT_ADDRESS || '';

async function main() {
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
  });

  const winningProposalIndex = await publicClient.readContract({
    address: ballotAddress as `0x${string}`,
    abi,
    functionName: 'winningProposal',
  }) as bigint;

  const winnerNameBytes = await publicClient.readContract({
    address: ballotAddress as `0x${string}`,
    abi,
    functionName: 'winnerName',
  });

  const winnerProposal = await publicClient.readContract({
    address: ballotAddress as `0x${string}`,
    abi,
    functionName: 'proposals',
    args: [winningProposalIndex],
  }) as [string, bigint];

  console.log('Winning Proposal Index:', winningProposalIndex.toString());
  console.log('Winner Name:', hexToString(winnerNameBytes as `0x${string}`, { size: 32 }));
  console.log('Winner Vote Count:', winnerProposal[1].toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
