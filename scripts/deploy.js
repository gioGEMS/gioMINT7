async function main() {
    const gioMINT = await ethers.getContractFactory("gioMINT");
    const gioMint = await gioMINT.deploy();
    await gioMint.waitForDeployment();
    console.log("Contract deployed to:", await gioMint.getAddress());
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });