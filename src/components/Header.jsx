import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHouse, FaWallet } from 'react-icons/fa6';
import walletCardStore from '../stores/walletCardStore';
import homeStore from '../stores/homeStore';
import showStore from '../stores/showStore';

function Header({ back }) {
	const store = walletCardStore();
	const { walletColor, connectWalletHandler } = store;
	const homeStoreInstance = homeStore();
	const showStoreInstance = showStore();
	const navigate = useNavigate();

	const handleHomeClick = () => {
		showStoreInstance.reset();
		homeStoreInstance.resetQuery();
		homeStoreInstance.fetchCoins();
		navigate('/');
		// homeStoreInstance.searching(false);
	};

	return (
		<header className='header'>
			<div className='width'>
				{back ? (
					<Link to='/' className='icon-left'>
						<FaArrowLeft size={30} />
					</Link>
				) : (
					// <div className='icon-left' onClick={handleHomeClick}>
					// 	<FaHouse size={30} />
					// </div>
					<Link to='/' className='icon-left' onClick={handleHomeClick}>
						<FaHouse size={30} />
					</Link>
				)}
				<h1>
					<Link to='/'>Coinwatch</Link>
				</h1>
				<div className='icon-right'>
					<FaWallet size={30} color={walletColor} onClick={connectWalletHandler} />
				</div>
			</div>
		</header>
	);
}

export default Header;
