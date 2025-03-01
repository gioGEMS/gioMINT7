require("@nomicfoundation/hardhat-toolbox");
module.exports = {
  solidity: "0.8.24",
  networks: {
    baseSepolia: {
      url: "https://sepolia.base.org",
      accounts: ["0x83de349b42189f8b2a7d5f241422bb9af6fa72cf6eae8e0f4e01e7c9ec6f6ca9"]
    }
  }
};