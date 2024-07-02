import { create } from 'zustand';
import { ethers } from 'ethers';
import axios from 'axios';

const walletCardStore = create((set) => ({
  errorMessage: null,
  defaultAccount: null,
  userBalance: null,
  userBalanceIDR: null,
  connected: null,
  connCardText: 'Connect Wallet',
  provider: null,
  walletColor: '#f72020',
  ethToIdrRate: null,
  showAddress: false,
  showBalance: false,

  setErrorMessage: (message) => set({ errorMessage: message }),
  setDefaultAccount: (account) => set({ defaultAccount: account }),
  setUserBalance: (balance) => set({ userBalance: balance }),
  setUserBalanceIDR: (balanceIDR) => set({ userBalanceIDR: balanceIDR }),
  setconnCardText: (text) => set({ connCardText: text }),
  setProvider: (provider) => set({ provider }),
  setEthToIdrRate: (rate) => set({ ethToIdrRate: rate }),
  setShowAddress: (bool) => set({ showAddress: bool}),
  setShowBalance: (bool) => set({ showBalance: bool}),
  setConnectedState: (bool) => set({ connected: bool }),

  // Wallet connection handler
  connectWalletHandler: async () => {
    const {
      defaultAccount,
      setProvider,
      setconnCardText,
      setDefaultAccount,
      setErrorMessage,
      setUserBalance,
      fetchUserBalance,
      setUserBalanceIDR,
    } = walletCardStore.getState();
    if (window.ethereum && defaultAccount == null) {
      setProvider(new ethers.BrowserProvider(window.ethereum));

      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((result) => {
          setconnCardText('Wallet Connected');
          setDefaultAccount(result[0]);
          fetchUserBalance();
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });

      set({ walletColor: '#05f043' });
      set({ connected: true })
    } else if (!window.ethereum) {
      set({ connected: false })
      set({ walletColor: '#f72020' });
      console.log('Need to install MetaMask');
      setErrorMessage('Please install MetaMask browser extension to interact');
    } else {
      // Disconnecting the wallet
      set({ connected: false })
      setconnCardText('Connect Wallet');
      setDefaultAccount(null);
      setUserBalance(null);
      setUserBalanceIDR(null);
      setProvider(null);
      setErrorMessage(null);
      set({ walletColor: '#f72020' });
    }
  },

  // Fetch user balance
  fetchUserBalance: async () => {
    const { defaultAccount, provider, setUserBalance, setUserBalanceIDR, ethToIdrRate, setEthToIdrRate } = walletCardStore.getState();
    if (defaultAccount) {
      const balanceResult = await provider.getBalance(defaultAccount);
      const balanceInEth = ethers.formatEther(balanceResult);
      setUserBalance(balanceInEth);

      // Fetch conversion rate
      let rate = ethToIdrRate;
      if (!rate) {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=idr');
        rate = response.data.ethereum.idr;
        setEthToIdrRate(rate);
      }
      const balanceInIdr = (balanceInEth * rate).toFixed(2);
      setUserBalanceIDR(balanceInIdr);
    }
  },

  // Toggle visibility handler
  toggleVisibility: (type) => {
    const {
      showAddress,
      setShowAddress,
      showBalance,
      setShowBalance
    } = walletCardStore.getState();
		
    switch (type) {
			case 'address':
				setShowAddress(!showAddress);
				break;
			case 'balance':
				setShowBalance(!showBalance);
				break;
			default:
				break;
		}
	}
}));

export default walletCardStore;
