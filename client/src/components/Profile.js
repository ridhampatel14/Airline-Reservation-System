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



export default function Profile() {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
        birthDate: '',
        Address:'',
		emailId: '',
		contactNumber: '',
        PassportNo: ''
	});
	const { currentUser } = useContext(AuthContext);
	const navigate = useNavigate();
    const [haveProfile, setHaveProfile] = useState(false);
    const [profileData, setProfiledata] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false);
    let [hasError, setError] = useState(false);
    const location = useLocation();
    let {id} = useParams();

    const handleBooking = async (id,data) => {
		delete data._id;
		const formdata = {
			flightId : id,
			bookedPerson : data
		}
		try {
			const response = await fetch('http://localhost:3001/flights/book', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formdata),
			});

			if (response.ok) {
				toast.success('Successfully submitted!');
				const fdata = await response.json();
				navigate(`/bookingDone`,{state:{fdata}});
			} else {
				const err = await response.json();
				toast.error(err.error);
				return;
			}
		} catch (error) {
			toast.error(error);
			return;
		}
      }
                                     
	useEffect(() => {
		if (currentUser) {
			setFormData({
				...formData,
				emailId: currentUser.email,
			});
            async function fetchData() {
                try {
                    const flag = await axios.get(`http://localhost:3001/profile/checkProfile/${currentUser.email}`);
                    const haspro = flag.data
                    setHaveProfile(haspro);
                    console.log('******************',haveProfile)
                    if(haveProfile){
                        const {data} = await axios.get(`http://localhost:3001/profile/${currentUser.email}`); 
                        setProfiledata(data);
                    }
                    setLoading(false);
                } catch (e){ 
                  setLoading(false);
                  setError(true);
                }
            }
            fetchData();
            console.log(location.pathname)
            console.log(location.pathname.split('/')[1])
		}
	}, [currentUser, haveProfile, reload]);

	const clearForm = () => {
		setFormData({
			firstName: '',
			lastName: '',
			middleName: '',
			emailId: '',
			age: '',
			gender: null,
			height: '',
			smoke: null,
			alcohol: null,
			activity: null,
			allergies: '',
			cholestrol: null,
			glucose: null,
			symptoms: '',
			other_complaints: '',
			medications: '',
			contact_address_line: '',
			contact_address_line_2: '',
			contact_city: '',
			contact_zip_code: '',
			contact_state: '',
			contact_number: '',
			emergencey_contact_number: '',
			emergencey_contact_name: '',
			insurrance_member_id: '',
			insurrance_group_number: '',
			insurrance_plan_type: '',
			insurrance_primarycare_provider: '',
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
        if (!formData.firstName) {
			toast.error('First Name is required');
			return;
		}
		if (!formData.lastName) {
			toast.error('Last Name is required');
			return;
		}
		if (!formData.birthDate) {
			toast.error('BirthDate is required');
			return;
		}
        if (!formData.Address) {
			toast.error('Address is required');
			return;
		}
        if (!formData.emailId) {
			toast.error('emailId is required');
			return;
		}
        if (!formData.contactNumber) {
			toast.error('contactNumber is required');
			return;
		}
        if (!formData.PassportNo) {
			toast.error('PassportNo is required');
			return;
		}
		formData.birthDate = new Date(formData.birthDate);

		if (isNaN(formData.birthDate.getTime())) {
		  toast.error('Invalid date format');
		  return;
		}
	  
		formData.birthDate = formData.birthDate.toISOString().split('T')[0];
	  
		console.log('***************************************',formData);

		try {
			console.log(formData, 'payload');
			const response = await fetch('http://localhost:3001/profile', {
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
                setReload(true);
				//navigate('/patientDashboard');
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
			loading ? (
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<CircularProgress size={40} color="secondary" />
						<Typography variant="body1" style={{ marginLeft: 10 }}>
							Loading...
						</Typography>
					</div>
			) : 
            haveProfile ? 
            (
                <>
					<div>
						<Toaster />
					</div>
                    {location.pathname.split('/')[1] === 'bookTicket' 
                        ? 
                        <>
                            <div><h1 style={{marginTop:'110px', textAlign: 'center', color: 'black', fontSize: '24px' }}>Please Review Your Details</h1></div>
                        </>                        
                        : null
                    }
                    <Card
                        variant='outlined'
                        sx={{
                        maxWidth: '40%',
                        height: 'auto',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop:location.pathname.split('/')[1] === 'bookTicket' ? 4  : 15,
                        marginBottom: 10,
                        boxShadow:
                            '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);',
                        }}
                    >
                        <CardHeader
                        className='title'
                        title={profileData?.firstName + ' ' + profileData?.lastName}
                        sx={{
                            fontWeight: 'bold',
                            marginLeft: '35%'
                        }}
                        />
                        <CardContent>
                            <Typography
                                variant='body2'
                                color='textSecondary'
                                component='span'
                                sx={{
                                borderBottom: '1px solid #1e8678',
                                fontWeight: 'bold',
                                marginLeft: '20%'
                                }}
                                className="card-content-margin"
                            >
                                <dl>
                                <p>
                                    <dt className='title'>BirhtDate: {profileData?.birthDate}</dt>
                                </p>
                                <p>
                                    <dt className='title'>Address: {profileData?.Address}</dt>
                                </p>
                                <p>
                                    <dt className='title'>Email ID: {profileData?.emailId}</dt>
                                </p>
                                <p>
                                    <dt className='title'>Contact Number: {profileData?.contactNumber}</dt>
                                </p>
                                <p>
                                    <dt className='title'>Passport Number: {profileData?.PassportNo}</dt>
                                </p>
                                {location.pathname.split('/')[1] === 'bookTicket' 
                                ? 
                                <Button onClick={() => handleBooking(id, profileData)} variant="contained" className="buttons" sx={{ marginLeft: '40%' }}>
                                    Book
                                </Button>
                                : null}
                                </dl>
                            </Typography>
                        </CardContent>
                    </Card>
                </>
            )
            :
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
						id="firstName"
						label="First Name"
						name="firstName"
						value={formData.firstName}
						onChange={handleInputChange}
						required
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						name="lastName"
						label="Last Name"
						defaultValue={formData['lastName'] || ''}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						id="emailId"
						label="Email Id "
						defaultValue={currentUser.email}
						onChange={handleInputChange}
						required
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						id="Address"
						name="Address"
						label="Address"
						value={formData.Address}
						onChange={handleInputChange}
					/>
				</Grid>
                <Grid item xs={6}>
					<DatePicker
						label="Date"
						onChange={(value) => handledateselection(value, 'birthDate')}
						id="birthDate"						
					/>
					</Grid>
                <Grid item xs={6}>
					<TextField
						name="contactNumber"
						label="Contact Numner"
						value={formData.contactNumber}
						onChange={handleInputChange}
					/>
				</Grid>
                <Grid item xs={12} >
                    <div style={{ marginLeft: '7%' }}>
                        <TextField
                            name="PassportNo"
                            label="Passport Number"
                            value={formData.PassportNo}
                            onChange={handleInputChange}
                        />
                    </div>
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
