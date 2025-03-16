import { createPublicClient, http, createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import { abi } from "../artifacts/contracts/Ballot.sol/Ballot.json";
import * as dotenv from "dotenv";
dotenv.config();

const providerApiKey = process.env.ALCHEMY_API_KEY || "";
const deployerPrivateKey = process.env.PRIVATE_KEY || "";

async function main() {
    const parameters = process.argv.slice(2);
    if (!parameters || parameters.length < 1)
        throw new Error("Parameters not provided");

    const contractAddress = parameters[0] as `0x${string}`;
    if (!contractAddress) 
        throw new Error("Contract address not provided");
    if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress)) 
        throw new Error("Invalid contract address");

    const voterAddress = parameters[1] as `0x${string}`;
    if (!voterAddress) 
        throw new Error("Voter address not provided");
    if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress)) 
        throw new Error("Invalid voter address");

    const _COMMANDS = ["giveRightToVote", "delegate"];
    const command = parameters[2];
    if (!command) 
        throw new Error("Command not provided");
    if (!_COMMANDS.includes(command)) 
        throw new Error(`Invalid command '${command}'. Must be one of ${_COMMANDS}`);

    const publicClient = createPublicClient({
        chain: sepolia,
        transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
    });

    const account = privateKeyToAccount(`0x${deployerPrivateKey}`);
    const deployer = createWalletClient({
        account: account,
        chain: sepolia,
        transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
    });

    const hash = await deployer.writeContract({
        address: contractAddress,
        abi,
        functionName: command,
        args: [voterAddress],
    });
    console.log("Transaction hash:", hash);
    console.log("Waiting for confirmations...");
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    console.log("Transaction confirmed.");
    console.log(`Receipt: ${receipt}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});