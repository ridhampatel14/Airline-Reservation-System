import React, {useContext,useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import noImage from "../assets/flightpic.jpg";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardHeader,
    TextField
  } from '@mui/material';
  import {
    Modal,
    Backdrop,
    Fade,
  } from '@mui/material';
import '../App.css';
import { Button ,Box} from '@mui/material';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const FlightDetils = (props) => {
    const { currentUser } = useContext(AuthContext);
    const [flightData, setFlightData] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [review, setReview] = useState("");
    const navigate = useNavigate();
    let [hasError,setError] = useState(false);
    let {id} = useParams();
    const [reload,setReload] = useState(false);
  
    useEffect(() => {
      console.log('SHOW useEffect fired');
      async function fetchData() {
        try {
          const {data} = await axios.get(`http://localhost:3001/flights/getflight/${id}`);
          setFlightData(data);
          setLoading(false);
        } catch (e) {
          //console.log(e);
          setLoading(false);
          setError(true);
        }
      }
      fetchData();
    }, [id,reload]);  

    const addReviewFunction = async (e)=> {
      e.preventDefault();
      const obj = {
        review:review,
        emailId:currentUser?.email
      }
      setReview("");
      try {
        console.log(obj);
        const response = await fetch(`http://localhost:3001/flights/addreview/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(obj),
        });
        console.log(response);

        if (response.ok) {
          toast.success('Successfully added review!');
          setReload(!reload);
          setShowForm(false);
        } else {
          const errorData = await response.json();
          toast.error(`Error: ${errorData.error}`);
          setShowForm(false);
        }
      } catch (error) {
        toast.error(`Error: ${error.message}`);
        setShowForm(false);
      }
    }

    const handleBooking = async () => {
      navigate(`/bookTicket/${id}`);
    }
  
	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const ReviewsComponent = ({ isOpen, onClose, data }) => {
		return (
			<Modal
				open={isOpen}
				onClose={onClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{ timeout: 500 }}
			>
				<Fade in={isOpen}>
					<Box
						sx={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							width: '50%', // Set the desired width
							maxHeight: '80vh', // Set the desired max height
							overflowY: 'auto', // Enable vertical scrolling
							bgcolor: 'background.paper',
							border: '2px solid #000',
							boxShadow: 24,
							p: 4,
						}}
					>
						<div
							style={{
								display: 'flex',
								justifyContent: 'flex-end',
								marginBottom: '10px',
							}}
						>
							<Button onClick={onClose}>Close</Button>
						</div>
            {data.map((element, index) => (
              <Card
                key={index} // Adding a unique key for each element in the array
                variant='outlined'
                sx={{
                  height: 'auto',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginBottom: 1,
                  boxShadow:
                    '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);',
                }}
              >
                <CardContent>
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    component='span'
                    sx={{
                      borderBottom: '1px solid #1e8678',
                      fontWeight: 'bold',
                      marginLeft: '20%',
                    }}
                    className="card-content-margin"
                  >
                    <dl>
                      <p>
                        <dt className='title'>Review: {element.review}</dt>
                      </p>
                      <p>
                        <dt className='title'>By: {element.emailId}</dt>
                      </p>
                    </dl>
                  </Typography>
                </CardContent>
              </Card>
            ))}
					</Box>
				</Fade>
			</Modal>
		);
	};

    if (loading) {
      return (
        <div>
          <h2>Loading....</h2>
        </div>
      );
    } else if(hasError){
      //return (<Error error={' 404 Not Found'}/>);   
    }else {
      return (
        <>
        	<div>
						<Toaster />
					</div>
          <Card
            variant='outlined'
            sx={{
              maxWidth: 500,
              height: 'auto',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop:15,
              marginBottom: 10,
              boxShadow:
                '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);',
            }}
          >
            <CardHeader
              title={flightData.flightCode}
              sx={{
                fontWeight: 'bold',
                marginLeft: '35%'
              }}
            />
            <CardMedia
              component='img'
              image= {noImage}
              title='show image'
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
                    <dt className='title'>From: {flightData.departure}</dt>
                      
                  </p>
                  <p>
                    <dt className='title'>To: {flightData.arrival}</dt>
                  </p>
                  <p>
                    <dt className='title'>Departure on: {flightData.departureDate}</dt>
                  </p>
                  <p>
                    <dt className='title'>Departure Time: {flightData.departureTime}</dt>
                  </p>
                  <p>
                    <dt className='title'>Arrival on: {flightData.arrivalDate}</dt>
                  </p>
                  <p>
                    <dt className='title'>Arrival Time: {flightData.arrivalTime}</dt>
                  </p>
                  <p>
                    <dt className='title'>Price: {flightData.price}</dt>
                  </p>
                  <p>
                    <dt className='title'>Available seats: {flightData.seats - flightData.bookedSeats}</dt>
                  </p>
                  <br/>
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    {flightData.seats - flightData.bookedSeats === 0 ? (
                      <Button disabled variant="contained" className="buttons" style={{ marginLeft: '5px' }}>
                        Proceed
                      </Button>
                    ) : (
                      <Button onClick={handleBooking} variant="contained" className="buttons" style={{ marginLeft: '5px' }}>
                        Proceed
                      </Button>
                    )}

                    <Button  onClick={handleOpenModal} variant="contained" className="buttons" style={{ marginLeft: '5px' }}>
                      Reviews
                    </Button>

                    <Button onClick = {() => {setShowForm(!showForm)}}variant="contained" className="buttons" style={{ marginLeft: '5px' }}>
                      Add Reviews
                    </Button>
                  </div>
                </dl>
              </Typography>
            </CardContent> 
            {showForm ?    
              <div style={{marginLeft: '20px',marginRight: '20px',marginTop: '20px',marginBottom: '40px'}}>
                <form onSubmit={addReviewFunction} id="register-form">
                  <TextField
                    label="Review"
                    onChange={(e) => setReview(e.target.value)}
                    required
                    variant="outlined"
                    color="primary"
                    type="text"
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
                    value={review}
                  />
                  <br />
                  <br />
                  <div className='makeCenter'>
                  <Button 							
                  variant="outlined"
                      type="submit"
                      sx={{
                        borderRadius: '50px',
                        color: 'white',
                        backgroundColor: '#2f2fa2',
                        '&:hover': {
                          backgroundColor: '#2f2fa2',
                        },
                      }}>
                    Add
                  </Button>
                  </div>
                </form>
              </div> : null
            }            
          </Card>
          <ReviewsComponent isOpen={isModalOpen} onClose={handleCloseModal} data={flightData.reviews}/>
        </>
      );
    }
  }
  
  export default FlightDetils;