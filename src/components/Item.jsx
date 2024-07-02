import React from 'react';
import { Link } from 'react-router-dom';

function Item({ coin }) {
	return (
		<div className='home-crypto'>
			<Link to={`/${coin.id}`}>
				<span className='home-crypto-image'>
					<img src={coin.image} alt='' />
				</span>
				<span className='home-crypto-name'>{coin.name}</span>
				{coin.priceBTC && (
					<span className='home-crypto-prices'>
						<span className='home-crypto-btc'>
							<img src='/bitcoin.png' alt='' />
							{coin.priceBTC} BTC
						</span>
						<span className='home-crypto-idr'>{coin.priceIDR} IDR</span>
					</span>
				)}
			</Link>
		</div>
	);
}

export default Item;
