import React, { useState, useEffect } from 'react';
import { FaRegCopyright } from 'react-icons/fa6';
import moment from 'moment';

function Footer({ show }) {
	const [currentTime, setCurrentTime] = useState(moment());

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentTime(moment());
		}, 1000); // Update time every second

		return () => clearInterval(intervalId); // Cleanup function to prevent memory leaks
	}, []);

	const formattedDate = currentTime.format('DD MMMM YYYY');
	const formattedTime = currentTime.format('HH:mm:ss'); // Includes seconds

	return (
		<footer className='footer'>
			<h3>
				{show ? (
					<>
						{formattedDate} - {formattedTime}
					</>
				) : (
					<>
						<FaRegCopyright size={12} style={{ 'vertical-align': 'middle', 'margin-right': '5px' }} />
						{currentTime.format('YYYY')}{' '}
					</>
				)}
			</h3>
		</footer>
	);
}

export default Footer;
