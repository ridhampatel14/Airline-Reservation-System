import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../firebase/Auth';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Typography, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import toast, { Toaster } from 'react-hot-toast';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


export default function SearchFlight() {
	const { currentUser } = useContext(AuthContext);
	const [loading, setLoading] = useState(true);
	const [formData, setFormData] = useState({});
	const navigate = useNavigate();
	const inputSx = { width: '80%' };
	const [menuItems,setMenuItem] = useState([]);
	const [menuItems1,setMenuItem1] = useState([]);
	const [selectedOption, setSelectedOption] = React.useState('Select Arrival');
	const [selectedOption1, setSelectedOption1] = React.useState('Select Departure');


	const fetchData = async () => {
		try {
			const url = 'http://localhost:3001/flights/getArrDep';
			let ans = await axios.get(url);
			setMenuItem(ans.data[0])
			setMenuItem1(ans.data[1])
			setLoading(false);
		} catch (e) {
			console.error(e);
			toast.error(e.error);
		}
	};

	useEffect(() => {
        console.log("on load useeffect");
        fetchData();
    }, []);

	const Dropdown = ({ selectedOption, onChange }) => {
		return (
			<Select
				value={selectedOption}
				onChange={onChange}
				style={{ width: '69%' }} 
				sx={{ marginLeft: '14.5%' }}
			>
				{menuItems.map((option) => (
				<MenuItem key={option.value} value={option.value}>
					{option.label}
				</MenuItem>
				))}
			</Select>
		);
	};	
	
	const Dropdown1 = ({ selectedOption, onChange }) => {
		return (
			<Select
				value={selectedOption}
				onChange={onChange}
				style={{ width: '69%' }} 
				sx={{ marginLeft: '14.5%' , marginTop: '4%'}}
			>
				{menuItems1.map((option) => (
				<MenuItem key={option.value} value={option.value}>
					{option.label}
				</MenuItem>
				))}
			</Select>
		);
	};	

	const handleInputChange = (e) => {
		const { id, value } = e.target;
		if (id === 'smoke' || id === 'alcohol') {
			setFormData({ ...formData, [id]: parseInt(value) });
		} else {
			setFormData({ ...formData, [id]: value });
		}
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};

	const handledateselection = (value, id) => {
		setFormData({
			...formData,
			[id]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.departure) {
			toast.error('Departure is required');
			return;
		}
		if (!formData.arrival) {
			toast.error('Arrival is required');
			return;
		}
		if (!formData.date) {
			toast.error('Date is required');
			return;
		}
		formData.date = new Date(formData.date);

		if (isNaN(formData.date.getTime())) {
		  toast.error('Invalid date format');
		  return;
		}
	  
		formData.date = formData.date.toISOString().split('T')[0];
	  
		console.log(formData);
		try {
			const response = await fetch('http://localhost:3001/flights/searchflights', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				toast.success('Successfully submitted!');
				const data = await response.json();
				console.log(data)
				navigate('/AirlinesResult',{state:{data}});
			} else {
				const err = await response.json();
				toast.error(err.error);
			}
		} catch (error) {
			toast.error(error);
		}
	};

	const handleOptionChange = (value , id) => {
		console.log('*******',value.target.value,'*******',id)
		setSelectedOption(value.target.value);
		setFormData({
			...formData,
			[id]: value.target.value,
		});
	};

	const handleOptionChange1 = (value,id) => {
		console.log('*******',value.target.value,'*******',id)
		setSelectedOption1(value.target.value);
		setFormData({
			...formData,
			[id]: value.target.value,
		});
	};

	if (!currentUser) {
		return <Navigate to={`/`} />;
	}

	return (
		<div className='main'>
			{
			loading ? (
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<CircularProgress size={40} color="secondary" />
						<Typography variant="body1" style={{ marginLeft: 10 }}>
							Loading...
						</Typography>
					</div>
			) : 
			<Box
				component="form"
				sx={{
					'& .MuiTextField-root': { m: 1, ...inputSx }, // Apply width to text fields
					'& .MuiSelect-root': { ...inputSx }, // Apply width to the Select component
				}}
				noValidate
				autoComplete="off"
				onSubmit={handleSubmit}
			>
				<div>
					<Toaster />
				</div>
				<h3>Airline Details:</h3>
				<br />
				<Grid container spacing={3}>
					{/* <Grid item xs={6}>
						<TextField
							id="departure"
							label="Departure"
							defaultValue={formData['departure'] || ''}
							onChange={handleInputChange}
							required
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							id="arrival"
							label="Arrival"
							defaultValue={formData['arrival'] || ''}
							onChange={handleInputChange}
							required
						/>
					</Grid> */}
					<Grid item xs={12}>
						<Dropdown1
						selectedOption={selectedOption1}
						onChange={(value) => handleOptionChange1(value, 'departure')}
						/>
					</Grid>
					<Grid item xs={12}>
						<Dropdown
						selectedOption={selectedOption}
						onChange={(value) => handleOptionChange(value, 'arrival')}
						/>
					</Grid>
					<Grid item xs={12}>
					<div style={{ marginLeft: '14%' }}>
						<DatePicker
							label="Date"
							onChange={(value) => handledateselection(value, 'date')}
							id="date"						
						/>
						</div>
					</Grid>
				</Grid>
				<br />
				<Grid item xs={12}>
					<Button type="submit" variant="contained" className="buttons" sx={{ marginLeft: '47%' }}>
						Submit
					</Button>
				</Grid>
			</Box>
			}
		</div>

	);
}
