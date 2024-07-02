import React from 'react';
import showStore from '../stores/showStore';
import { useParams } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Show() {
	const store = showStore();
	const params = useParams();

	React.useEffect(() => {
		store.fetchData(params.id);

		return () => {
			store.reset();
		};
	}, []);

	return (
		<div>
			<Header back />
			{store.data && (
				<>
					<header className='show-header'>
						<img src={store.data.image.large} alt='' />
						<h2>
							{store.data.name} ({store.data.symbol})
						</h2>
					</header>
					<div className='width'>
						<div className='show-graph'>
							<ResponsiveContainer width='100%' height='100%'>
								<LineChart
									width={500}
									height={300}
									data={store.graphData}
									margin={{
										top: 5,
										right: 30,
										left: 20,
										bottom: 5
									}}
								>
									<CartesianGrid strokeDasharray='3 3' />
									<XAxis dataKey='Date' angle={0} tickMargin={0} />
									<YAxis />
									<Tooltip />
									<Legend verticalAlign='bottom' />
									<Line type='monotone' dataKey='Price' stroke='#8884d8' activeDot={{ r: 8 }} />
								</LineChart>
							</ResponsiveContainer>
						</div>
					</div>
					<br />
					<div className='show-details'>
						<div className='width'>
							<h2>Details</h2>
							<div className='show-details-row'>
								<h4>Market Cap Rank</h4>
								<span>{store.data.market_cap_rank}</span>
							</div>
							<div className='show-details-row'>
								<h4>Market Data High 24 h</h4>
								<span>Rp {store.data.market_data.high_24h.idr}</span>
							</div>
							<div className='show-details-row'>
								<h4>Market Data Low 24 h</h4>
								<span>Rp {store.data.market_data.low_24h.idr}</span>
							</div>
							<div className='show-details-row'>
								<h4>Circulating Supply</h4>
								<span>{store.data.market_data.circulating_supply}</span>
							</div>
							<div className='show-details-row'>
								<h4>Current Price</h4>
								<span>Rp {store.data.market_data.current_price.idr}</span>
							</div>
						</div>
					</div>
				</>
			)}
			{/* <Footer show={true} /> */}
		</div>
	);
}

export default Show;
