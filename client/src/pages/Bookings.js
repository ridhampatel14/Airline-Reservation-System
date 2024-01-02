import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from '../firebase/Auth';
import axios from 'axios';
import {useLocation} from 'react-router-dom';
import { Link } from "react-router-dom";
import { Button, Card, CardContent, Grid, Typography ,CardMedia} from "@mui/material";
import noImage from "../assets/flightpic.jpg";
import '../assets/common.css';

const Bookings = () => {
	const { currentUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [bookingsData, setBookingsData] = useState(undefined);
    let [hasError, setError] = useState(false);
    let card = null;

    useEffect(() => {
        console.log('SHOW useEffect fired');
        async function fetchData() {
          try {
            const {data} = await axios.get(`http://localhost:3001/flights/bookings/${currentUser.email}`);
            console.log(data);
            setBookingsData(data);
            setLoading(false);
          } catch (e) {
            //console.log(e);
            setLoading(false);
            setError(true);
          }
        }
        fetchData();
      }, [currentUser]); 


    const buildCard = (airline) => {
        return (
          <Grid item xs={10} sm={10} md={10} lg={10} xl={10} key={airline.flightDetails._id}>
            <Card
                sx={{
                    width: "100%",
                    height: "auto",
                    display: "flex",
                    // maxHeight:500,
                    marginTop: 5,
                    boxShadow:
                    "0 15px 30px rgba(0,0,0,0.30), 0 10px 8px rgba(0,0,0,0.22);",
                    textDecoration: "none",
                }}
            >
            
            <CardMedia
                component="img"
                sx={{ width: 330 }}
                image={noImage}
                alt="Live from space album cover"
            />
                    <CardContent>
                        <Typography variant="h5" component="h1" gutterBottom>
                            From: {airline.flightDetails.departure} To: {airline.flightDetails.arrival}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            flightCode: {airline.flightDetails.flightCode} 
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Departure: {airline.flightDetails.departureDate} at {airline.flightDetails.departureTime}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Arrival: {airline.flightDetails.arrivalDate} at {airline.flightDetails.arrivalTime}
                        </Typography>
                    </CardContent>
            </Card>
          </Grid>
        );
    };

    card =
    bookingsData &&
    bookingsData.map((job) => {
      return buildCard(job);
    });


    if (loading) {
        return (
        <div>
            <h2>Loading....</h2>
            <h2>Loading....</h2>
            <h2>Loading....</h2>
        </div>
        );
    } else if (hasError) {
        return (
        <div>
            <h2>has error</h2>
            <h2>has error</h2>
            <h2>has error</h2>
        </div>
        );
    } else {
        return (
        <div className="main-div">
            <br/>
            <br/>
            <br/>
            <Grid
            container
            spacing={1}
            sx={{
                justifyContent: "center",
                alignItems: "center",
            }}
            >
            {card}
            </Grid>
        </div>
        );
    }
};

export default Bookings;
