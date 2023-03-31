const { expect } = require("chai");
const hre = require("hardhat");
const { time, loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");

//Reuseable function
async function deployContract() {
    const lockedAmount = 1_000_000_000;
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

    // deploy a lock contract where funds can be withdrawn
    // one year in the future
    const Lock = await hre.ethers.getContractFactory("Lock");
    const lock = await Lock.deploy(unlockTime, { value: lockedAmount });
    return { lock, unlockTime };
}
function errorWithdrawTimeTest() {

    describe("Lock", function () {
        it("Should revert the right error of called before time", async function () {
            const lock = await deployContract()

            // 2nd test check the unlock time condition of the contract
            await expect(lock.withdraw()).to.be.revertedWith("You can't withdraw yet");
        });
    });
}

function withdrawByTimeManu() {
    describe('Lock', function () {

        it("Should transfer the funds to the owner", async function () {
            const getVars = await deployContract();
            let lock = getVars.lock;
            let unlockTime = getVars.unlockTime;
            await time.increaseTo(unlockTime)

            await lock.withdraw();
        });
    })
}

function withdrawByDiffAddress() {
    describe('Lock', function () {
        it("Should revert with the right error if called form another account", async function () {
            const getVars = deployContract();
            let lock = getVars.lock;
            let unlockTime = getVars.unlockTime;
            const [owner, otherAccount] = await ethers.getSigners();
            //time of the chain is increased to pass the first check
            await time.increaseTo(unlockTime);

            //lock.connect is used to send the transaciton from another acount
            // await expect(lock.connect(owner).withdraw()).to.be.revertedWith("You aren't the owner");
            await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
                "You aren't the owner"
            );
        });
    });
}
//Written to test the function ability
function testTimeManu() {
    describe("Lock", function () {
        it("The function should withdraw the amount", async function () {
            var getVars = await deployContract();
            let lock = getVars.lock;
            let unlockTime = getVars.unlockTime;

            await time.increaseTo(unlockTime);

            await lock.withdraw();
        })
    })
}
// errorWithdrawTimeTest();
// withdrawByTimeManu();
// testTimeManu();
//withdrawByDiffAddress(); //typeError

// Use the load fixture funciton to prevent deploying smart contract repeatedly, to avoid i already created a seperate function,
// but that function will be called with every test function and will make the processing slow.

function mainFunctionWithFixture() {
    describe("Lock", function () {
        async function deployWithLockFixture() {
            const lockedAmount = 1_000_000_000;
            const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
            const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

            const Lock = await ethers.getContractFactory("Lock");
            const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

            return { lock, unlockTime, lockedAmount };
        }

        it("Should withdraw by setting required time", async function () {
            const { lock, unlockTime } = await loadFixture(deployWithLockFixture);
            await time.increaseTo(unlockTime);
            await lock.withdraw();
        })

        it("Should set the right unlockTime", async function () {
            const { lock, unlockTime } = await loadFixture(deployWithLockFixture);

            // assert that the value is correct
            expect(await lock.unlockTime()).to.equal(unlockTime);
        });

        it("Should revert with the right error if called too soon", async function () {
            const { lock } = await loadFixture(deployWithLockFixture);

            await expect(lock.withdraw()).to.be.revertedWith("You can't withdraw yet");
        });
    });
}

mainFunctionWithFixture();
