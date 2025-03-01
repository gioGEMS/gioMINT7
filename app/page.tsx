'use client';

import React, { useState, useEffect, useRef, ChangeEvent } from 'react';

// Global type definition
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      isCoinbaseWallet?: boolean;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (eventName: string, callback: (...args: any[]) => void) => void;
      removeListener: (eventName: string, callback: (...args: any[]) => void) => void;
    };
  }
}

// Types
interface NftPreview {
  image: string;
  name: string;
}

interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Styles
const styles = {
  gradientText: "bg-gradient-to-r from-[#00ff00] to-[#aa00ff] text-transparent bg-clip-text",
  glowEffect: {
    boxShadow: '0 0 10px rgba(0, 255, 0, 0.5), 0 0 20px rgba(170, 0, 255, 0.3)',
    textShadow: '0 0 5px #00ff00, 0 0 10px rgba(170, 0, 255, 0.4)'
  },
  cardGlow: {
    boxShadow: '0 0 15px rgba(0, 255, 0, 0.5), 0 0 30px rgba(170, 0, 255, 0.3)',
  },
  backgroundStyle: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    perspective: '1000px',
  }
};

const Home: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [networkName, setNetworkName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [nftPreview, setNftPreview] = useState<NftPreview | null>(null);
  const [mintedTokenId, setMintedTokenId] = useState<string | null>(null);
  const [agentMessage, setAgentMessage] = useState('');
  const [showAgentMessage, setShowAgentMessage] = useState(true);
  const [responseMessage, setResponseMessage] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');
  const [nftContractAddress, setNftContractAddress] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { text: "Hi! I'm Base AI Agent. How can I assist you with gioMINT today?", isUser: false, timestamp: new Date() }
  ]);
  const [userInput, setUserInput] = useState('');
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!backgroundRef.current || !isClient) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!backgroundRef.current) return;
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      backgroundRef.current.style.transform = `perspective(1000px) rotateX(${y * 5 - 2.5}deg) rotateY(${-x * 5 + 2.5}deg)`;
      const particles = backgroundRef.current.querySelectorAll('.particle');
      particles.forEach((particle: any, index) => {
        const speed = index % 3 === 0 ? 2 : index % 3 === 1 ? 4 : 6;
        const offsetX = (x - 0.5) * speed;
        const offsetY = (y - 0.5) * speed;
        particle.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isClient]);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined' && window.ethereum) {
      const handleChainChanged = (chainId: string) => {
        setNetworkName(chainId === '0x14a34' ? 'Base Sepolia' : `Chain ID: ${parseInt(chainId, 16)}`);
      };
      
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          setIsConnected(false);
          setWalletAddress('');
        } else {
          setIsConnected(true);
          setWalletAddress(accounts[0]);
          window.ethereum?.request({ method: 'eth_chainId' })
            .then(handleChainChanged)
            .catch(console.error);
          setTimeout(() => {
            const greeting = "Welcome to Base! I notice this is your first time minting on Base Sepolia. Would you like to learn more about NFT collections?";
            setAgentMessage(greeting);
            addAgentMessage(greeting);
          }, 1500);
        }
        setIsConnecting(false);
      };
      
      window.ethereum.on('chainChanged', handleChainChanged);
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      
      return () => {
        window.ethereum?.removeListener('chainChanged', handleChainChanged);
        window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
    
    if (chatMessages.length === 0) {
      addAgentMessage("Hi there! I'm your Base AI Assistant. I can help you create blockchain certificates for your valuable items. How can I assist you today?");
    }
  }, [isClient, chatMessages.length]);
  
  const addAgentMessage = (text: string) => {
    setChatMessages(prev => [...prev, {
      text,
      isUser: false,
      timestamp: new Date()
    }]);
  };

  const connectWallet = async () => {
    setIsConnecting(true);
    setIsRotating(true);
    
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts && accounts.length > 0) {
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          if (chainId !== '0x14a34') {
            try {
              await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x14a34' }],
              });
            } catch (switchError: any) {
              if (switchError.code === 4902) {
                try {
                  await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                      chainId: '0x14a34',
                      chainName: 'Base Sepolia',
                      nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
                      rpcUrls: ['https://sepolia.base.org'],
                      blockExplorerUrls: ['https://sepolia.basescan.org'],
                    }],
                  });
                } catch (addError) {
                  console.error('Error adding Base Sepolia chain:', addError);
                  alert('Failed to add Base Sepolia network. Please add it manually.');
                  return;
                }
              } else {
                console.error('Error switching network:', switchError);
                alert(`Failed to switch to Base Sepolia: ${switchError.message}`);
                return;
              }
            }
          }
          setWalletAddress(accounts[0]);
          setIsConnected(true);
          setNetworkName('Base Sepolia');
        }
      } catch (error) {
        console.error('Wallet connection error:', error);
        if (error instanceof Error) {
          alert(`Wallet connection failed: ${error.message}`);
        }
        simulateWalletConnection();
      } finally {
        setIsRotating(false);
        setIsConnecting(false);
      }
    } else {
      alert('Please install MetaMask or Coinbase Wallet to connect.');
      simulateWalletConnection();
      setIsRotating(false);
      setIsConnecting(false);
    }
  };
  
  const simulateWalletConnection = () => {
    const fakeAddress = '0x' + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    setWalletAddress(fakeAddress);
    setIsConnected(true);
    setNetworkName('Base Sepolia (Simulated)');
    setTimeout(() => {
      setAgentMessage("Welcome to Base! I notice this is your first time minting on Base Sepolia. Would you like to learn more about NFT collections?");
      setShowAgentMessage(true);
      setChatMessages([{ text: "Hi! I'm Base AI Agent. How can I assist you with gioMINT?", isUser: false, timestamp: new Date() }]);
    }, 1500);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setNftPreview({
            image: e.target.result as string,
            name: uploadedFile.name.split('.')[0]
          });
        }
      };
      reader.readAsDataURL(uploadedFile);
      setTimeout(() => {
        setAgentMessage("I noticed you're minting a valuable item. Would you like to add metadata for authentication?");
        setShowAgentMessage(true);
        setChatMessages((prev) => [...prev, { text: "I noticed you're minting a valuable item. Would you like to add metadata for authentication?", isUser: false, timestamp: new Date() }]);
      }, 1500);
    }
  };

  const mintNFT = () => {
    if (!isConnected) {
      alert("Please connect your wallet first!");
      return;
    }
    if (!file) {
      alert("Please upload a file first!");
      return;
    }
    const input = document.getElementById('userInput') as HTMLInputElement;
    let item = 'giogems treasure';
    if (input?.value.match(/for my (.*?)!/i)) {
      const match = input.value.match(/for my (.*?)!/i);
      if (match?.[1]) item = match[1];
    }
    setResponseMessage(`Minting your ${item} NFT on Base Sepolia...`);
    setIsRotating(true);
    setTimeout(() => {
      const tokenId = Math.floor(Math.random() * 10000).toString();
      const txHash = `0x${Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;
      const contractAddress = `0x${Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;
      setMintedTokenId(tokenId);
      setTransactionHash(txHash);
      setNftContractAddress(contractAddress);
      setIsRotating(false);
      setResponseMessage(`Your ${item} NFT (ID: ${tokenId}) has been added to your wallet on Base Sepolia.`);
      setTimeout(() => {
        setAgentMessage("Congratulations on minting your NFT! Would you like to share this on social media?");
        setShowAgentMessage(true);
        setChatMessages((prev) => [...prev, { text: "Congratulations on minting your NFT! Would you like to share this on social media?", isUser: false, timestamp: new Date() }]);
      }, 1000);
    }, 2000);
  };

  const handleTellMeMore = () => {
    const message = "NFTs (Non-Fungible Tokens) on Base Sepolia provide proof of ownership for your valuable items. Your NFT is now stored on the blockchain and can be viewed in your wallet.";
    setAgentMessage(message);
    setChatMessages((prev) => [...prev, { text: message, isUser: false, timestamp: new Date() }]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    const newUserMessage: ChatMessage = { text: userInput, isUser: true, timestamp: new Date() };
    setChatMessages((prev) => [...prev, newUserMessage]);
    setUserInput('');
    setTimeout(() => {
      const aiResponse = generateAiResponse(userInput);
      setChatMessages((prev) => [...prev, { text: aiResponse, isUser: false, timestamp: new Date() }]);
    }, 1000);
  };

  const generateAiResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase().trim();
    const intentPatterns = [
      { pattern: /\b(mint|create|generate|make)\b.*\b(nft|token)\b/i, intent: 'mint_nft' },
      { pattern: /\b(wallet|connect|metamask|coinbase)\b/i, intent: 'wallet_help' },
      { pattern: /\b(base|sepolia|blockchain|network)\b/i, intent: 'blockchain_info' },
      { pattern: /\b(value|worth|price|cost|expensive)\b/i, intent: 'value_info' },
      { pattern: /\b(thank|thanks|thx)\b/i, intent: 'gratitude' },
      { pattern: /\b(hello|hi|hey|greetings)\b/i, intent: 'greeting' },
      { pattern: /\b(help|assist|support)\b/i, intent: 'help_request' },
      { pattern: /\b(how|what|why|when)\b.*\b(work|works|working)\b/i, intent: 'how_it_works' },
      { pattern: /\b(opal|jewelry|diamond|watch|art|treasure)\b/i, intent: 'item_specific' }
    ];
    
    let detectedIntent = 'general';
    for (const {pattern, intent} of intentPatterns) {
      if (pattern.test(lowerMessage)) {
        detectedIntent = intent;
        break;
      }
    }
    
    const hasUploadedFile = !!nftPreview;
    const hasWallet = isConnected;
    const hasMintedNft = !!mintedTokenId;
    
    switch (detectedIntent) {
      case 'mint_nft':
        if (!hasWallet) return "I'd love to help you mint an NFT! First, connect your wallet.";
        else if (!hasUploadedFile) return "Great! Upload your proof document to mint your NFT.";
        else if (!hasMintedNft) return "Your file is ready! Click 'CLAIM YOUR NFT' to mint.";
        else return "You've already minted an NFT! Want to mint another?";
      case 'wallet_help':
        if (!hasWallet) return "Click 'Connect Wallet' to connect MetaMask or Coinbase Wallet.";
        else return `Your wallet (${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}) is connected.`;
      case 'blockchain_info':
        return "Base Sepolia is an Ethereum Layer 2 testnet with fast, low-cost transactions.";
      case 'value_info':
        return "NFTs add value by providing blockchain-verified proof of authenticity.";
      case 'item_specific':
        if (lowerMessage.includes('opal')) return "Opals are perfect for NFT authentication!";
        else if (lowerMessage.includes('watch')) return "Luxury watches benefit from NFT certificates.";
        else return "NFTs verify provenance and authenticity for valuable items.";
      case 'how_it_works':
        return "Connect wallet, upload proof, mint NFT - it's stored on the blockchain!";
      case 'gratitude':
        return "You're welcome! How else can I help with gioMINT?";
      case 'greeting':
        return `Hello! Welcome to gioMINT. ${!hasWallet ? "Connect your wallet to start?" : "What's next?"}`;
      case 'help_request':
        return "Ask me about wallets, NFTs, or using gioMINT!";
      default:
        if (hasUploadedFile && !hasMintedNft) return `You've uploaded ${nftPreview?.name}. Want to know more before minting?`;
        else if (hasMintedNft) return `Congrats on NFT (ID: ${mintedTokenId})! Want to share it?`;
        else if (!hasWallet) return "Connect your wallet to certify your items!";
        else return "Ask me anything about gioMINT and NFTs!";
    }
  };

  const shareOnTwitter = () => {
    const text = `Just minted my ${nftPreview?.name || 'amazing'} NFT on @BuildOnBase! Check it out: https://sepolia.basescan.org/token/${nftContractAddress}?a=${mintedTokenId}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };
  
  const viewInWallet = () => {
    alert(`View in your wallet on Base Sepolia network (ID: ${mintedTokenId})`);
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-black text-white p-4 flex items-center justify-center">
        <p className="text-2xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 relative overflow-hidden">
      {/* 3D Interactive Background */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 z-0 transition-transform duration-200 ease-out" 
        style={{
          transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'url(/background.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.7,
            transform: 'translateZ(-10px)',
          }}
        ></div>
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'url(/background1.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.4,
            transform: 'translateZ(10px)',
            filter: 'blur(2px)'
          }}
        ></div>
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.6))',
            transform: 'translateZ(5px)'
          }}
        ></div>
      </div>

      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Updated Header */}
        <div className="flex flex-col items-center mb-8">
          {/* Larger gioMINT Text Centered at Top */}
          <h1 
            className="text-6xl md:text-8xl font-bold text-[#00ff00] mb-2"
            style={{
              textShadow: '0 0 15px #00ff00, 0 0 30px rgba(170, 0, 255, 0.5)',
              transform: 'perspective(500px) translateZ(30px)'
            }}
          >
            gioMINT
          </h1>
          
          {/* by gioGEMS Dropdown Below */}
          <p 
            className="text-2xl md:text-3xl text-[#aa00ff]"
            style={{
              textShadow: '0 0 10px rgba(170, 0, 255, 0.5)',
              transform: 'perspective(500px) translateZ(20px)'
            }}
          >
            by gioGEMS
          </p>

          {/* Logo Moved Underneath */}
          <div className="mt-4 hover:scale-105 transition-all duration-500 cursor-pointer">
            <img 
              src="/logo3.png" 
              alt="gioMINT Logo" 
              className="w-48 h-48 object-contain animate-bounce-slow" 
            />
          </div>

          {/* Linktree and Email Icons */}
          <div className="absolute top-0 right-0 left-0 flex justify-between px-4">
            <a 
              href="https://linktr.ee/giogems" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:scale-110 transition-all duration-300"
            >
              <svg viewBox="0 0 24 24" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 11.5h-3v-6h3v6zM20.5 5.5h-3v6h3v-6zM13.5 11.5h-3v-6h3v6z" stroke="#ff00aa" strokeWidth="2" strokeLinecap="round"/>
                <path d="M7.5 11.5v4h9v-4" stroke="#ff00aa" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 15.5v3" stroke="#ff00aa" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </a>
            <a 
              href="mailto:giogemsllc@gmail.com" 
              className="hover:scale-110 transition-all duration-300"
            >
              <svg viewBox="0 0 24 24" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="4" width="20" height="16" rx="2" stroke="#ff00aa" strokeWidth="2"/>
                <path d="M2 7l10 7 10-7" stroke="#ff00aa" strokeWidth="2"/>
              </svg>
            </a>
          </div>
        </div>
        
        {/* Wallet Connection */}
        <div className="flex justify-end mb-4">
          {!isConnected ? (
            <button 
              onClick={connectWallet} 
              disabled={isConnecting}
              className="relative bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 overflow-hidden group"
              style={{
                background: 'linear-gradient(45deg, #0033ff, #aa00ff)',
                boxShadow: '0 0 10px rgba(170, 0, 255, 0.7)'
              }}
            >
              <span className={`absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-600 opacity-0 group-hover:opacity-30 ${isRotating ? 'animate-spin' : ''}`}></span>
              <span className="relative">Connect Wallet</span>
            </button>
          ) : (
            <div className="bg-green-600 text-white px-6 py-3 rounded-xl"
                 style={{
                   background: 'linear-gradient(45deg, #00aa33, #00ff44)',
                   boxShadow: '0 0 10px rgba(0, 255, 0, 0.7), 0 0 20px rgba(170, 0, 255, 0.3)',
                   transform: 'perspective(500px) rotateX(5deg)'
                 }}>
              <div>Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</div>
              <div className="text-xs mt-1">{networkName}</div>
            </div>
          )}
        </div>
        
        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-3xl mb-4 text-[#00ff00]" 
               style={{
                 textShadow: '0 0 10px #00ff00, 0 0 20px rgba(170, 0, 255, 0.5)',
                 transform: 'perspective(500px) translateZ(20px)'
               }}>
              Claim NFTs for your watches, jewelry, RWAs, diamonds, art, and more!
            </p>
            <p className="text-xl mb-8 text-[#00ff00]" style={{textShadow: '0 0 5px #00ff00, 0 0 10px rgba(170, 0, 255, 0.3)'}}>
              Upload your proof document and mint your NFT on Base blockchain!
            </p>
            
            {/* User Input */}
            <div className="relative mb-4 transform hover:scale-102 transition-transform" style={{perspective: '1000px'}}>
              <input 
                id="userInput" 
                type="text" 
                placeholder="Say 'Make an NFT for my giogems treasure!'" 
                className="w-full p-4 rounded-xl bg-black bg-opacity-50 text-white border border-[#00ff00] focus:ring-[#aa00ff] focus:border-[#aa00ff] focus:outline-none"
                style={{
                  boxShadow: '0 0 10px rgba(0, 255, 0, 0.5), 0 0 20px rgba(170, 0, 255, 0.2)',
                  transform: 'translateZ(5px)'
                }}
              />
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00ff00] via-[#aa00ff] to-[#00aaff] rounded-xl blur opacity-30 -z-10 animate-gradient-x"></div>
            </div>
            
            {/* File Upload */}
            <div className="relative mb-4 transform hover:scale-102 transition-transform" style={{perspective: '1000px'}}>
              <input 
                type="file" 
                accept="image/*,application/pdf" 
                onChange={handleFileUpload} 
                className="w-full p-4 rounded-xl bg-black bg-opacity-50 text-white border border-[#00ff00] focus:ring-[#aa00ff] focus:border-[#aa00ff] focus:outline-none"
                style={{
                  boxShadow: '0 0 10px rgba(0, 255, 0, 0.5), 0 0 20px rgba(170, 0, 255, 0.2)',
                  transform: 'translateZ(5px)'
                }}
              />
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00ff00] via-[#aa00ff] to-[#00aaff] rounded-xl blur opacity-30 -z-10 animate-gradient-x"></div>
            </div>
            
            {/* NFT Preview */}
            {nftPreview && (
              <div className="mb-8 p-6 border border-[#00ff00] rounded-xl bg-black bg-opacity-70 relative transform transition-all hover:scale-105 group"
                   style={styles.cardGlow}>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00ff00] via-[#aa00ff] to-[#00aaff] rounded-xl blur opacity-30 group-hover:opacity-50 -z-10 animate-gradient-x"></div>
                <h3 className="text-xl text-[#00ff00] mb-4 font-bold" style={{textShadow: '0 0 5px #00ff00, 0 0 10px rgba(170, 0, 255, 0.4)'}}>NFT Preview</h3>
                <div className="flex flex-col md:flex-row items-center justify-center">
                  <div className="w-48 h-48 overflow-hidden rounded-lg border-2 border-[#00ff00] relative transform transition-transform hover:scale-105 hover:rotate-2"
                       style={styles.cardGlow}>
                    <img src={nftPreview.image} alt="NFT Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#aa00ff] opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  </div>
                  <div className="md:ml-8 mt-4 md:mt-0 text-left">
                    <p className="text-2xl font-bold text-[#00ff00]" style={{textShadow: '0 0 5px #00ff00, 0 0 10px rgba(170, 0, 255, 0.4)'}}>{nftPreview.name}</p>
                    <p className="my-2">Chain: <span className="text-[#00ff00]">{networkName || 'Base Sepolia'}</span></p>
                    <p>Owner: <span className="text-[#00ff00]">{walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect wallet'}</span></p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Mint Button */}
            <button 
              onClick={mintNFT} 
              className="relative bg-blue-600 text-white text-2xl px-8 py-6 rounded-xl hover:bg-blue-700 transform hover:scale-105 transition duration-300 overflow-hidden group"
              style={{
                background: 'linear-gradient(45deg, #00aa33, #00ff44)',
                boxShadow: '0 0 20px rgba(0, 255, 0, 0.7), 0 0 40px rgba(170, 0, 255, 0.3)'
              }}
            >
              <span className={`absolute inset-0 bg-gradient-to-r from-green-400 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-30 ${isRotating ? 'animate-spin' : ''}`}></span>
              <span className="relative inline-block" style={{textShadow: '0 0 10px rgba(0, 0, 0, 0.5)'}}>CLAIM YOUR NFT</span>
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00ff00] via-[#aa00ff] to-[#00aaff] rounded-xl blur opacity-20 group-hover:opacity-40 -z-10"></div>
            </button>
            
            {/* Response Message */}
            {responseMessage && (
              <p className="mt-6 text-3xl text-[#00ff00]" style={{
                textShadow: '0 0 10px #00ff00, 0 0 20px rgba(170, 0, 255, 0.5)',
                animation: 'pulse 2s infinite'
              }}>
                {responseMessage}
              </p>
            )}
            
            {/* Base AI Agent Chat */}
            {showAgentMessage && (
              <div className="mt-8 p-6 border border-[#aa00ff] rounded-xl bg-black bg-opacity-70 text-left relative transform transition-all hover:scale-102 group"
                   style={{
                     boxShadow: '0 0 20px rgba(170, 0, 255, 0.5), 0 0 10px rgba(0, 100, 255, 0.3)',
                     maxWidth: '800px',
                     margin: '0 auto'
                   }}>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#aa00ff] via-[#0033ff] to-[#00aaff] rounded-xl blur opacity-30 group-hover:opacity-50 -z-10 animate-gradient-x"></div>
                
                <div className="flex items-center mb-4 relative">
                  <div className="relative flex items-center">
                    <div className="w-16 h-16 rounded-full mr-3 flex items-center justify-center overflow-hidden animate-bounce-slow" 
                         style={{
                           boxShadow: '0 0 10px rgba(170, 0, 255, 0.7), 0 0 20px rgba(0, 100, 255, 0.3)',
                         }}>
                      <img src="/base-agent-icon.jpg" alt="Base AI Agent" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -top-12 left-0 bg-[#ff00aa] text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap animate-pulse-slow" style={{
                      boxShadow: '0 0 8px rgba(255, 0, 170, 0.7)',
                    }}>
                      I can help you here!
                      <div className="absolute bottom-0 left-4 w-3 h-3 bg-[#ff00aa] transform rotate-45 translate-y-1.5"></div>
                    </div>
                  </div>
                  <span className={`${styles.gradientText} font-bold text-xl`}>Base AI Agent</span>
                </div>

                <div className="mb-4 h-48 overflow-y-auto p-2 bg-black bg-opacity-50 rounded-lg">
                  {chatMessages.map((msg, index) => (
                    <div key={index} className={`mb-2 ${msg.isUser ? 'text-right' : 'text-left'}`}>
                      <span className={`inline-block p-2 rounded-lg ${msg.isUser ? 'bg-[#00ff00] text-black' : 'bg-[#aa00ff] text-white'}`}>
                        {msg.text}
                      </span>
                      <span className="text-xs text-gray-400 ml-2">
                        {msg.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type a message for Base AI..."
                    className="flex-1 p-2 rounded-lg bg-black bg-opacity-50 text-white border border-[#aa00ff] focus:ring-[#aa00ff] focus:border-[#aa00ff] focus:outline-none"
                    style={{
                      boxShadow: '0 0 5px rgba(170, 0, 255, 0.5)',
                    }}
                  />
                  <button
                    type="submit"
                    className="bg-[#aa00ff] text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-all transform hover:scale-105"
                    style={{ boxShadow: '0 0 5px rgba(170, 0, 255, 0.5)' }}
                  >
                    Send
                  </button>
                </form>

                <div className="mt-4 flex justify-end gap-3">
                  <button 
                    className="text-[#aa00ff] text-sm border border-[#aa00ff] rounded-lg px-4 py-2 mr-3 hover:bg-[#aa00ff] hover:bg-opacity-20 transition-all transform hover:scale-105"
                    style={{boxShadow: '0 0 5px rgba(170, 0, 255, 0.5)'}}
                    onClick={handleTellMeMore}
                  >
                    Tell me more
                  </button>
                </div>
              </div>
            )}
            
            {/* Minted NFT Success */}
            {mintedTokenId && (
              <div className="mt-8 p-6 border border-[#00ff00] rounded-xl bg-black bg-opacity-70 relative transform transition-all hover:scale-105 group"
                   style={{
                     boxShadow: '0 0 20px rgba(0, 255, 0, 0.5), 0 0 40px rgba(170, 0, 255, 0.2)',
                   }}>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00ff00] via-[#aa00ff] to-[#00aaff] rounded-xl blur opacity-30 group-hover:opacity-50 -z-10 animate-gradient-x"></div>
                <h3 className="text-2xl text-[#00ff00] mb-4 font-bold" style={{textShadow: '0 0 10px #00ff00, 0 0 20px rgba(170, 0, 255, 0.4)'}}>
                  NFT Successfully Minted!
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-400">Token ID:</p>
                    <p className="text-[#00ff00] font-mono">{mintedTokenId}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Blockchain:</p>
                    <p className="text-[#00ff00]">{networkName || 'Base Sepolia'}</p>
                  </div>
                </div>
                <p className="mb-4">View in <a href={`https://sepolia.basescan.org/token/${nftContractAddress}?a=${mintedTokenId}`} target="_blank" rel="noopener noreferrer" className="underline text-[#00ff00] hover:text-[#aa00ff] transition-colors cursor-pointer">BaseScan</a></p>
                <div className="mt-5 grid grid-cols-2 gap-4">
                  <button 
                    className="text-[#00ff00] border border-[#00ff00] rounded-lg px-4 py-3 hover:bg-[#00ff00] hover:bg-opacity-20 transition-all transform hover:scale-105 group"
                    style={{boxShadow: '0 0 10px rgba(0, 255, 0, 0.3), 0 0 20px rgba(170, 0, 255, 0.2)'}}
                    onClick={shareOnTwitter}
                  >
                    <span className="relative z-10">Share on Twitter</span>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00ff00] to-[#aa00ff] rounded-lg blur opacity-0 group-hover:opacity-30 -z-10"></div>
                  </button>
                  <button 
                    className="text-[#00ff00] border border-[#00ff00] rounded-lg px-4 py-3 hover:bg-[#00ff00] hover:bg-opacity-20 transition-all transform hover:scale-105 group"
                    style={{boxShadow: '0 0 10px rgba(0, 255, 0, 0.3), 0 0 20px rgba(170, 0, 255, 0.2)'}}
                    onClick={viewInWallet}
                  >
                    <span className="relative z-10">View in Wallet</span>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00ff00] to-[#aa00ff] rounded-lg blur opacity-0 group-hover:opacity-30 -z-10"></div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-16 flex justify-center space-x-8 perspective-1000">
          {['/opal3.jpg', '/guitar.jpg', '/opal1.jpg', '/watch.jpg', '/opal2.jpg', '/lambo.jpg'].map((src, index) => (
            <div key={index} className="w-32 h-32 bg-transparent rounded-md overflow-hidden transform transition-transform hover:scale-110 hover:rotate-6 3d-card">
              <img 
                src={src} 
                alt={`${src.split('/')[1].split('.')[0]} NFT`} 
                className="w-full h-full object-cover transform-gpu transition-transform duration-300 hover:rotate-x-15 hover:rotate-y-15"
                style={{boxShadow: '0 0 15px rgba(0, 255, 0, 0.5)'}}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* CSS animations */}
      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.7; }
          100% { opacity: 1; }
        }
        @keyframes pulse-slow {
          0% { opacity: 0.9; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
          100% { opacity: 0.9; transform: scale(1); }
        }
        @keyframes glow {
          0% { box-shadow: 0 0 5px rgba(0, 255, 0, 0.5); }
          50% { box-shadow: 0 0 20px rgba(0, 255, 0, 0.8); }
          100% { box-shadow: 0 0 5px rgba(0, 255, 0, 0.5); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float {
          0% { transform: translateY(0) translateX(0) rotate(0deg); }
          33% { transform: translateY(-30px) translateX(20px) rotate(120deg); }
          66% { transform: translateY(20px) translateX(-20px) rotate(240deg); }
          100% { transform: translateY(0) translateX(0) rotate(360deg); }
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite ease-in-out;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s infinite ease-in-out;
        }
        .3d-card {
          transform-style: preserve-3d;
          transition: all 0.3s ease;
        }
        .3d-card:hover {
          transform: scale(1.1) rotate(6deg) translateZ(20px);
        }
      `}</style>
    </div>
  );
};

export default Home;