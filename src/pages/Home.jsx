import React from 'react';
import homeStore from '../stores/homeStore';
import Header from '../components/Header';
import Item from '../components/Item';
import { FaSpinner } from 'react-icons/fa6';
import classNames from 'classnames';
import WalletCard from '../components/WalletCard';
import Footer from '../components/Footer';

function Home() {
	const store = homeStore();

	React.useEffect(() => {
		if (store.trending.length === 0) store.fetchCoins();
	}, []);

	return (
		<div>
			<Header />
			<div className='wallet-card-container'>
				<div className='width'>
					<WalletCard />
				</div>
			</div>
			<div className='home-search'>
				<div className='width'>
					<div className={classNames('home-search-input', { searching: store.searching })}>
						<input type='text' value={store.query} onChange={store.setQuery} placeholder='search' />
						<FaSpinner size={20} />
					</div>
				</div>
			</div>

			<div className='home-cryptos'>
				<div className='width'>
					<h2>{store.searched ? (store.coins.length === 0 ? 'No Data' : 'Results') : 'Trending'}</h2>
					<div className='home-cryptos-index'>
						{store.coins.map((coin) => {
							return <Item key={coin.id} coin={coin} />;
						})}
					</div>
				</div>
			</div>
			{/* <Footer show={false} /> */}
		</div>
	);
}

export default Home;
