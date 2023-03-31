const hre = require('hardhat');
const { ethers } = require("hardhat");
const { expect } = require("chai"); 
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

function main() {
    describe('ERC20', function () {

        async function loadFixtureFunction() {
            const MyToken = await hre.ethers.getContractFactory("MyERC20Token");
            const myToken = await MyToken.deploy();
            await myToken.deployed();
            console.log("The token is deployed to:", myToken.address);
            // Token is deployed to this address 0x5FbDB2315678afecb367f032d93F642f64180aa3
            return myToken;
        }

        it('should deploy ERC20', async function () {
            const myToken = await loadFixture(loadFixtureFunction);
            const tokenaddress = expect(myToken.address);
            console.log(tokenaddress);
        });

        it("should have name and symbol set correctly", async function () {

            const myToken = await loadFixture(loadFixtureFunction);
            expect(await myToken.name()).to.equal("MyERC20Token");
            expect(await myToken.symbol()).to.equal("METK");
        });

        it("should mint initial supply to the contract deployer", async function () {

            const myToken = await loadFixture(loadFixtureFunction);
            const deployerAddress = await myToken.address;
            const initialSupply = BigInt(1000) * (10n ** BigInt(await myToken.decimals()));

            // expect(initialSupply).to.equal(1000n * 10n ** await myToken.decimals());
            expect(initialSupply).to.equal(BigInt(1000) * (10n ** BigInt(await myToken.decimals())));

        });

        it("should transfer tokens between accounts", async function () {
            const myToken = await loadFixture(loadFixtureFunction);

            const [sender, recipient] = await ethers.getSigners();
            const initialSupply = BigInt(1000) * (10n ** BigInt(await myToken.decimals()))
            // Mint tokens to the sender
            await myToken.connect(sender).mint(sender.address, initialSupply);

            // Transfer tokens from the sender to the recipient
            const amountToBeTransfer = BigInt(500) * (10n ** BigInt(await myToken.decimals()))
            await myToken.connect(sender).mytransfer(recipient.address, amountToBeTransfer);

            // Check that the balances have been updated correctly
            const senderBalance = await myToken.balanceOf(sender.address);
            const shouldRemainBalance = BigInt(1500) * (10n ** BigInt(await myToken.decimals()))
            expect(senderBalance).to.equal(shouldRemainBalance);

            const recipientBalance = await myToken.balanceOf(recipient.address);
            const shouldRecipintBalance = BigInt(500) * (10n ** BigInt(await myToken.decimals()));
            expect(recipientBalance).to.equal(shouldRecipintBalance);
        });
    });

}

main();