import React, { useState, useContext } from 'react';
import { TextField, Button } from '@mui/material/';
import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import * as helper from '../helper';
import {
	doSignInWithEmailAndPassword,
	doPasswordReset,
} from '../firebase/functions';
import { AuthContext } from '../firebase/Auth';
import Divider from '@mui/material/Divider';
import '../assets/common.css';
import SocialSignIn from '../components/SocialSignIn';

function AdminLogin() {
	const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
	const [data, setData] = useState({
		email: '',
		password: '',
	});
	const [error, setError] = useState();
	const [success, setSuccess] = useState();
	//const navigate = useNavigate();

	const validateLogin = async (e) => {
		e.preventDefault();
		try {
			helper.isValidEmail(data.email);
			helper.isValidPassword(data.password);
		} catch (e) {
			setError(e);
			return;
		}

		try {
			if(data.email === 'Admin123@gmail.com' && data.password === 'Admin@123'){
                navigate('/AdminAddPage');
                console.log('in if')                
            }else{
                console.log('in else')
                throw Error('Invalid EmailID or Password!');
            }
		} catch (error) {
			setError(error);
			return;
		}
	};

	return (
		<div
			className="card"
			style={{
				width: '80rem',
				display: 'block',
				marginLeft: 'auto',
				marginRight: 'auto',
				marginTop: '10rem',
			}}
		>
			{error ? (
				<Alert
					severity="error"
					onClose={() => {
						console.log('here');
						setError(null);
					}}
				>
					<h5>{error.message}</h5>
				</Alert>
			) : (
				''
			)}
			<div className="card-body">
				<h1 className="card-title">Admin Login</h1>
				<br />
				<form onSubmit={validateLogin} id="register-form">
					<TextField
						label="Email"
						onChange={(e) => setData({ ...data, email: e.target.value })}
						required
						variant="filled"
						color="primary"
						type="email"
						sx={{ mb: 3 }}
						fullWidth
						value={data.email}
					/>
					<TextField
						label="Password"
						onChange={(e) => setData({ ...data, password: e.target.value })}
						required
						variant="filled"
						color="primary"
						type="password"
						value={data.password}
						fullWidth
						sx={{ mb: 3 }}
					/>
					<br />
					<br />
					<Button variant="outlined" color="secondary" type="submit">
						Login
					</Button>
					<br />
				</form>
			</div>
		</div>
	);
}

export default AdminLogin;
