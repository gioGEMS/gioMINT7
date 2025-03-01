'use client';

import React from 'react';
import { useWalletState } from '@coinbase/onchainkit/wallet';

// Create a simplified wallet button component
const SimpleWalletButton = ({ onConnect }) => {
  const [clicked, setClicked] = React.useState(false);
  
  const handleClick = () => {
    setClicked(true);
    // Simulate a wallet connection for beta testing
    setTimeout(() => {
      const simulatedWallet = {
        address: '0x' + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
        chainId: 84532, // Base Sepolia
      };
      if (onConnect) onConnect(simulatedWallet);
    }, 1000);
  };
  
  return (
    <button
      onClick={handleClick}
      className="p-3 bg-[#0052CC] text-white rounded-lg hover:bg-[#003087] transition duration-300"
      disabled={clicked}
    >
      {clicked ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
};

export default SimpleWalletButton;