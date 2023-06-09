const { ethers } = require('ethers');
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers')
const Mycontract = require('../../artifacts/contracts/ERC20.sol/MyERC20Token.json');
const { privateKey, contractAddress, mumbai_URL, goerli_URL, goreliContractAddress, privateKey2 } = require('../../config/config');
const Web3 = require('web3');



//This funciton loads the necessary configurations
const loadFixtureFunction = async () => {
    //connect to the deployed contract with ether.js
    //Following line is used to connect with the polygon testnet
    const provider = new ethers.providers.JsonRpcProvider(goerli_URL);

    //Used to cereate a wallet instance using private key and provider. the wallet will be used to sign transactions and messages.
    const signer = new ethers.Wallet(privateKey2, provider);

    //Create a contract instance using the contract address, ABI (stored in MyToken.interface) and signer.
    const myToken = new ethers.Contract(goreliContractAddress, Mycontract.abi, signer);
    const web3 = new Web3(goerli_URL);

    return { myToken, web3 };
}

async function mintTokens() {

    const { myToken, web3 } = await loadFixtureFunction();
    // mint 100 tokens to a specific address
    const mintAmount = BigInt(100) * (10n ** BigInt(18));
    const estimateGasLimit = await myToken.estimateGas.mint("0x18dFf63fE34589C72b930CB8772dB5c1042bfb0a", mintAmount);

    // const web3 = new Web3(mumbai_URL);
    //Get gas price from ethereum in Wei. This is the actual gas price of tranaction.
    const gasPrice = await web3.eth.getGasPrice();
    const transactionFee = estimateGasLimit * gasPrice;
    const feeinMatic = web3.utils.fromWei(transactionFee.toString(), 'ether');
    console.log(feeinMatic);

    const transaction = await myToken.mint("0x18dFf63fE34589C72b930CB8772dB5c1042bfb0a", mintAmount); //First argument is sender address

}

async function transferToken() {
    const { myToken, web3 } = await loadFixtureFunction();
    const amountTotransfer = 200n * 10n ** 18n;
       const gasPriceLimit = await myToken.estimateGas.transfer("0x18dFf63fE34589C72b930CB8772dB5c1042bfb0a", amountTotransfer);
       const gasPrice = await web3.eth.getGasPrice();
       const transacionFee = gasPriceLimit * gasPrice;
       const feeInMatic = web3.utils.fromWei(transacionFee.toString(), 'ether');
    const transferToken = await myToken.transfer("0xC97baeA3E2a9A80dBfaD0258c82962BC95392e78", amountTotransfer);
    console.log(feeInMatic);
}

// mintTokens();
transferToken();