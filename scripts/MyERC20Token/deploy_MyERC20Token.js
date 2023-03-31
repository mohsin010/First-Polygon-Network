// const { deployContract } = require('@nomiclabs/hardhat-ethers/types');
const { deployContract } = require('ethereum-waffle');
const { ethers } = require('hardhat');
const MyToken = require('../../artifacts/contracts/ERC20.sol/MyERC20Token.json');

async function main() {
    // Note: I deployed using 2nd script, have to try 1st one.
    /*  const [deployer] = await ethers.getSigners();
     console.log('Deploying contracts with the account:', deployer.address);
 
     const myToken = await deployContract(deployer, MyToken, ["MyERC20Token", "METK", ethers.utils.parseEther("1000")]);
     console.log("MyToken contract deployed to:", myToken.address); */

    const MyToken = await ethers.getContractFactory("MyERC20Token");
    const myToken = await MyToken.deploy();
    await myToken.deployed();
    // const myToken = await deployContract(deployer, MyToken, ["MyERC20Token", "METK", ethers.utils.parseEther("1000")]);
    console.log("MyToken contract deployed to:", myToken.address);
}

main();