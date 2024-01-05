require('dotenv').config();
const { hre, ethers } = require("hardhat");


async function main() {

    //Creatig instance of local hardhat network and deploying the contract
    const MyToken = await hre.ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy();
    await myToken.deployed();

    console.log("MyToken deployed to :", myToken.address);

}

main().catch((err) => {
    console.log(err);
    process.exitCode = 1;
});