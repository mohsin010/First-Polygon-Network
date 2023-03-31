const { privateKey, mumbai_URL } = require("./config/config");

require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers")
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    mumbai: {
      url: mumbai_URL,
      chainId: 80001,
      accounts: [privateKey],
    },
  },
};
