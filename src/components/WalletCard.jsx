import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import walletCardStore from '../stores/walletCardStore';

const { ethers } = require('ethers');

function WalletCard() {
	const store = walletCardStore();
	const { connected, connCardText, errorMessage, defaultAccount, userBalance, userBalanceIDR, setUserBalance, provider, showAddress, showBalance, toggleVisibility } = store;

	React.useEffect(() => {
		if (defaultAccount) {
			provider.getBalance(defaultAccount).then((balanceResult) => {
				setUserBalance(ethers.formatEther(balanceResult));
			});
		}
	}, [defaultAccount, provider, setUserBalance]);

	function truncateAddress(address) {
		if (address) {
			return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
		}
		return '';
	}

	return (
		<div className='wallet-card'>
			<div className='wallet-content'>
				{connected === null && <h3 className='disconnected'>Connect Wallet</h3>}
				{connected === false && <h3 className='disconnected'>Wallet Disconnected</h3>}
				{connected && (
					<>
						<div className='account-address'>
							<h3>Address:</h3>
							<span>{showAddress ? defaultAccount : truncateAddress(defaultAccount)}</span>
							<span onClick={() => toggleVisibility('address')} style={{ marginLeft: 10 }}>
								{showAddress ? <FaEye /> : <FaEyeSlash />}
							</span>
						</div>

						<div className='balance-amount'>
							<h3>Balance:</h3>
							<span>{showBalance ? `${userBalance} ETH (${userBalanceIDR} IDR)` : '***'}</span>
							<span onClick={() => toggleVisibility('balance')} style={{ marginLeft: 10 }}>
								{showBalance ? <FaEye /> : <FaEyeSlash />}
							</span>
						</div>
					</>
				)}
			</div>
			{errorMessage && <p className='error-message'>{errorMessage}</p>}
		</div>
	);
}

export default WalletCard;
