const { privateKey, privateKey2, mumbai_URL, goerli_URL } = require("./config/config");

require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers")
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    goerli: {
      url: goerli_URL,
      accounts: [privateKey2],
    },
  },
};
