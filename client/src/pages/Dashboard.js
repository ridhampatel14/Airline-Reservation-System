import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@mui/material/';
import { doSignOut } from '../firebase/functions';
import { AuthContext } from '../firebase/Auth';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, CircularProgress } from '@mui/material';
import SearchFlight from '../components/SearchFlight';

export default function Dashboard() {
	const { currentUser } = useContext(AuthContext);
	const [hasProfile, setHasProfile] = useState(false);
	const [loading, setLoading] = useState(true);

	// const fetchData = async (email) => {
	// 	try {
	// 		const url = 'http://localhost:3002/doctors/' + email;
	// 		let ans = await axios.get(url);
	// 		console.log(email);
	// 		console.log('*********************profile:- ', ans.data);
	// 		setHasProfile(ans.data);
	// 		setLoading(false);
	// 	} catch (e) {
	// 		console.error(e);
	// 	}
	// };

	// useEffect(() => {
	// 	console.log('in load');
	// 	if (currentUser) {
	// 		fetchData(currentUser.email);
	// 	}
	// }, [currentUser]);

	if (!currentUser) {
		return <Navigate to={`/`} />;
	}
	

	return (
		<div className="main">
			<div>
					<>
						{/* <h2>{currentUser.email}</h2> */}
						<SearchFlight/>
					</>
			</div>
		</div>
	);
}
