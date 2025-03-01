'use client';

// This file can be imported to provide Coinbase Wallet specific functionality

import { useEffect, useState } from 'react';

// Add TypeScript declarations for Ethereum provider
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      isCoinbaseWallet?: boolean;
      request: (args: {method: string; params?: any[]}) => Promise<any>;
      on: (eventName: string, callback: (...args: any[]) => void) => void;
      removeListener: (eventName: string, callback: (...args: any[]) => void) => void;
    }
  }
}

// Type for hook return value
interface CoinbaseWalletHook {
  isCoinbaseAvailable: boolean;
  isConnected: boolean;
  account: string;
  chainId: string;
  connect: () => Promise<{account: string, chainId: string}>;
  switchToBaseSepolia: () => Promise<boolean>;
}

// Helper hook for Coinbase Wallet
export function useCoinbaseWallet(): CoinbaseWalletHook {
  const [isCoinbaseAvailable, setIsCoinbaseAvailable] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [account, setAccount] = useState<string>('');
  const [chainId, setChainId] = useState<string>('');
  
  useEffect(() => {
    // Check if Coinbase Wallet is available
    const checkCoinbaseWallet = () => {
      if (typeof window !== 'undefined') {
        // Check for window.ethereum provided by Coinbase Wallet extension
        if (window.ethereum?.isCoinbaseWallet) {
          setIsCoinbaseAvailable(true);
          
          // Check if already connected
          window.ethereum.request({ method: 'eth_accounts' })
            .then(accounts => {
              if (accounts.length > 0) {
                setIsConnected(true);
                setAccount(accounts[0]);
                return window.ethereum!.request({ method: 'eth_chainId' });
              }
            })
            .then(chainId => {
              if (chainId) {
                setChainId(chainId);
              }
            })
            .catch(console.error);
        }
      }
    };
    
    checkCoinbaseWallet();
  }, []);

  // Connect to Coinbase Wallet
  const connect = async (): Promise<{account: string, chainId: string}> => {
    if (!isCoinbaseAvailable) {
      throw new Error('Coinbase Wallet is not available');
    }
    
    try {
      const accounts = await window.ethereum!.request({ method: 'eth_requestAccounts' });
      setIsConnected(true);
      setAccount(accounts[0]);
      
      const chainId = await window.ethereum!.request({ method: 'eth_chainId' });
      setChainId(chainId);
      
      return { account: accounts[0], chainId };
    } catch (error) {
      console.error('Error connecting to Coinbase Wallet', error);
      throw error;
    }
  };

  // Switch to Base Sepolia network
  const switchToBaseSepolia = async (): Promise<boolean> => {
    if (!isConnected) {
      throw new Error('Connect wallet first');
    }
    
    const BASE_SEPOLIA_CHAIN_ID = '0x14a34'; // 84532 in decimal
    
    try {
      // Check if already on Base Sepolia
      if (chainId === BASE_SEPOLIA_CHAIN_ID) {
        return true;
      }
      
      // Try to switch to Base Sepolia
      await window.ethereum!.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: BASE_SEPOLIA_CHAIN_ID }],
      });
      
      setChainId(BASE_SEPOLIA_CHAIN_ID);
      return true;
    } catch (error: any) {
      // This error code means the chain has not been added to the wallet
      if (error.code === 4902) {
        try {
          await window.ethereum!.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: BASE_SEPOLIA_CHAIN_ID,
              chainName: 'Base Sepolia',
              nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
              rpcUrls: ['https://sepolia.base.org'],
              blockExplorerUrls: ['https://sepolia.basescan.org'],
            }],
          });
          setChainId(BASE_SEPOLIA_CHAIN_ID);
          return true;
        } catch (addError) {
          console.error('Error adding Base Sepolia chain', addError);
          throw addError;
        }
      } else {
        console.error('Error switching to Base Sepolia', error);
        throw error;
      }
    }
  };

  return {
    isCoinbaseAvailable,
    isConnected,
    account,
    chainId,
    connect,
    switchToBaseSepolia,
  };
}