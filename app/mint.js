async function mintNFT(itemLink) {
    const web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });

    const contractAddress = "0xb7f2f92d7AF81cF5dfD0F270a76d5AD70c801a33"; // Your deployed address
    const contractABI = [
        {
            "inputs": [
                {"name": "user", "type": "address"},
                {"name": "itemLink", "type": "string"}
            ],
            "name": "mintNFT",
            "outputs": [{"name": "", "type": "uint256"}],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];

    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const accounts = await web3.eth.getAccounts();
    await contract.methods.mintNFT(accounts[0], itemLink).send({ from: accounts[0] });
}