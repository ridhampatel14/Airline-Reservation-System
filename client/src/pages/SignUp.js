import React, { useState, useContext } from 'react';
import { TextField, Button } from '@mui/material/';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import * as helper from '../helper';
import Alert from '@mui/material/Alert';
import { doCreateUserWithEmailAndPassword } from '../firebase/functions';
import { AuthContext } from '../firebase/Auth';

function DocSignUp() {
	const { currentUser } = useContext(AuthContext);
	const [data, setData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		// profilePicture: "",
		// skills: [],
		// experience: "",
		// field: "",
	});
	const [error, setError] = useState();
	//const navigate = useNavigate();

	// useEffect(() => {
	//   if (JSON.parse(localStorage.getItem("token_data"))) {
	//     navigate("/dashboard");
	//   }
	// }, []);

	const validateRegister = async (e) => {
		e.preventDefault();
		console.log(data);
		try {
			helper.isValidEmail(data.email);
			helper.isValidPassword(data.password);
			helper.isPasswordSame(data.confirmPassword, data.password);
			helper.isValidString(data.name, 'Full Name');
			console.log('after checking stuff!!');
		} catch (e) {
			setError(e);
			return;
		}

		try {
			await doCreateUserWithEmailAndPassword(
				data.email,
				data.password,
				data.name
			);
			console.log('in second trycatch');
		} catch (e) {
			setError(e);
			return;
		}
	};

	if (currentUser) {
		return <Navigate to={`/Dashboard`} />;
	}

	return (
		<>
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
						<div>{error.message}</div>
					</Alert>
				) : (
					''
				)}
				<div className="card-body">
					<h1 className="card-title makeCenter">Sign Up</h1>
					<br />
					<form onSubmit={validateRegister} id="register-form">
						<TextField
							label="Full Name"
							onChange={(e) => setData({ ...data, name: e.target.value })}
							required
							variant="outlined"
							color="secondary"
							type="text"
							value={data.name}
							fullWidth
							sx={{
								mb: 3,
								borderRadius: '50px',
								backgroundColor: '#bab7ed',
								color: 'black',
								'& .MuiOutlinedInput-root': {
									'& fieldset': {
										border: 'none', // Remove border
									},
								},
							}}	
						/>
						<TextField
							label="Email"
							onChange={(e) => setData({ ...data, email: e.target.value })}
							required
							variant="outlined"
							color="secondary"
							type="email"
							sx={{
								mb: 3,
								borderRadius: '50px',
								backgroundColor: '#bab7ed',
								color: 'black',
								'& .MuiOutlinedInput-root': {
									'& fieldset': {
										border: 'none', // Remove border
									},
								},
							}}	
							fullWidth
							value={data.email}
						/>
						<TextField
							label="Password"
							onChange={(e) => setData({ ...data, password: e.target.value })}
							required
							variant="outlined"
							color="secondary"
							type="password"
							value={data.password}
							fullWidth
							sx={{
								mb: 3,
								borderRadius: '50px',
								backgroundColor: '#bab7ed',
								color: 'black',
								'& .MuiOutlinedInput-root': {
									'& fieldset': {
										border: 'none', // Remove border
									},
								},
							}}	
						/>
						<TextField
							label="Confirm Password"
							onChange={(e) =>
								setData({ ...data, confirmPassword: e.target.value })
							}
							required
							variant="outlined"
							color="secondary"
							type="password"
							value={data.confirmPassword}
							fullWidth
							sx={{
								mb: 3,
								borderRadius: '50px',
								backgroundColor: '#bab7ed',
								color: 'black',
								'& .MuiOutlinedInput-root': {
									'& fieldset': {
										
										border: 'none', // Remove border
									},
								},
							}}	
						/>
						<div className='makeCenter'>
						<Button
							variant="outlined"
							color="secondary"
							type="submit"
							style={{ marginTop: '1em' }}
							sx={{
								borderRadius: '50px',
								color: 'white',
								backgroundColor: '#2f2fa2',
								'&:hover': {
									backgroundColor: '#2f2fa2',
								},
							}}
						>
							Sign Up
						</Button>
						</div>
						<br />
						<br />
						<small>
							Already have an account? <Link to="/">Login</Link>
						</small>
					</form>
				</div>
			</div>
		</>
	);
}

export default DocSignUp;
