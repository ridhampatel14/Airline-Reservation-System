import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from '@mui/material';
import {
    Card,
    CardContent,
    CardMedia,
    CardHeader
  } from '@mui/material';
import { Typography, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../firebase/Auth';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {useParams} from 'react-router-dom';



export default function AdminAddFlight() {
	const [formData, setFormData] = useState({
        flightCode: '',
        departure: '',
        arrival: '',
        departureDate: '',
        departureTime: '',
        arrivalDate: '',
        arrivalTime: '',
        miles: undefined,     
        seats: undefined,
        price: undefined 
	});
    const [loading, setLoading] = useState(true);
                                     
	const clearForm = () => {
		setFormData({
			flightCode: '',
			departure: '',
			arrival: '',
			departureDate: '',
			departureTime: '',
			arrivalDate: '',
			arrivalTime: '',
			miles: undefined,     
            seats: undefined,
            price: undefined       
		});
	};

    const handledateselection = (value, id) => {
		setFormData({
			...formData,
			[id]: value,
		});
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
        console.log(formData)
        if (!formData.flightCode) {
			toast.error('FlightCode is required');
			return;
		}
		if (!formData.departure) {
			toast.error('departure is required');
			return;
		}
		if (!formData.arrival) {
            console.log('here')
			toast.error('arrival is required');
			return;
		}
        if (!formData.departureDate) {
			toast.error('departureDate is required');
			return;
		}
        if (!formData.departureTime) {
			toast.error('departureTime is required');
			return;
		}
        if (!formData.arrivalDate) {
			toast.error('arrivalDate is required');
			return;
		}
        if (!formData.arrivalTime) {
			toast.error('arrivalTime is required');
			return;
		}
        if (!formData.miles) {
			toast.error('miles is required');
			return;
		}
        if (!formData.seats) {
			toast.error('seats is required');
			return;
		}
        if (!formData.price) {
			toast.error('price is required');
			return;
		}
		formData.departureDate = new Date(formData.departureDate);

		if (isNaN(formData.departureDate.getTime())) {
		  toast.error('Invalid date format');
		  return;
		}
	  
		formData.departureDate = formData.departureDate.toISOString().split('T')[0];


        formData.arrivalDate = new Date(formData.arrivalDate);

		if (isNaN(formData.arrivalDate.getTime())) {
		  toast.error('Invalid date format');
		  return;
		}
	  
		formData.arrivalDate = formData.arrivalDate.toISOString().split('T')[0];
	  
		console.log('***************************************',formData);
        
		try {
			console.log(formData, 'payload');
			const response = await fetch('http://localhost:3001/flights/addflight', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			console.log(response);
			if (response.ok) {
				toast.success('Successfully submitted!');
				clearForm();
				console.log('Form data submitted successfully');
			} else {
				const errorData = await response.json();
				toast.error(`Error: ${errorData.error}`);
				console.error('Error submitting form data:', errorData.error);
			}
		} catch (error) {
			toast.error(`Error: ${error.message}`);
			console.error('Error:', error);
		}
	};

	const inputSx = { width: '80%' };


    return (
		<div className='main'>
			{
            (<Box
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
			<Grid container spacing={2} 
                sx={{
                    marginTop: 10,
                    marginLeft: '3%'
                }}>
				<Grid item xs={6}>
					<TextField
						id="flightCode"
						label="Flight Code"
						name="flightCode"
						value={formData.flightCode}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						name="departure"
						label="Departure"
                        id="departure"
						defaultValue={formData.departure}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						name="arrival"
						label="Arrival"
                        id="arrival"
						defaultValue={formData.departure}
						onChange={handleInputChange}
					/>
				</Grid>
                <Grid item xs={6}>
					<DatePicker
						label="Departure Date"
						onChange={(value) => handledateselection(value, 'departureDate')}
						id="departureDate"						
					/>
				</Grid>
                <Grid item xs={6}>
					<TextField
						id="departureTime"
						name="departureTime"
						label="Departure Time in HH:MM"
						value={formData.departureTime}
						onChange={handleInputChange}
					/>
				</Grid>
                <Grid item xs={6}>
					<DatePicker
						label="Arrival Date"
						onChange={(value) => handledateselection(value, 'arrivalDate')}
						id="arrivalDate"						
					/>
				</Grid>
                <Grid item xs={6}>
					<TextField
						id="arrivalTime"
						name="arrivalTime"
						label="Arrival Time in HH:MM"
						value={formData.arrivalTime}
						onChange={handleInputChange}
					/>
				</Grid>
                <Grid item xs={6}>
					<TextField
						name="miles"
						label="Miles"
                        type="number"
						value={formData.miles}
						onChange={handleInputChange}
                        inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*',   
                        }}
					/>
				</Grid>
                <Grid item xs={6}>
					<TextField
						name="seats"
						label="Seats"
                        type="number"
						value={formData.seats}
						onChange={handleInputChange}
                        inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*',   
                        }}
					/>
				</Grid>
                <Grid item xs={6}>
					<TextField
						name="price"
						label="Price"
                        type="number"
						value={formData.price}
						onChange={handleInputChange}
                        inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*',   
                        }}
					/>
				</Grid>
                <Grid item xs={12}>
					<Button type="submit" variant="contained" className="buttons" sx={{ marginLeft: '40%' }}>
						Submit
					</Button>
				</Grid>
			</Grid>
		    </Box>)
			}
		</div>
	);
}
