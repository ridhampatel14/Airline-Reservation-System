import React, { useState, useEffect, useContext } from "react";
import {useLocation} from 'react-router-dom';
import { Link } from "react-router-dom";
import { Button, Card, CardContent, Grid, Typography ,CardMedia} from "@mui/material";
import noImage from "../assets/flightpic.jpg";
import '../assets/common.css';

const AirlinesResult = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [jobsData, setJobsData] = useState(undefined);
    let [hasError, setError] = useState(false);
    let card = null;
    const regex = /(<([^>]+)>)/gi;

    useEffect(() => {
        console.log("on load useeffect");
        async function fetchData() {
            try {
                const data  = location.state.data;
                setJobsData(data);
                console.log(data);
                setLoading(false);
                setError(false);
              } catch (e) {
                console.log(e);
                setError(true);
              }
        }
        fetchData();
      }, [location]);


    const buildCard = (airline) => {
        return (
          <Grid item xs={10} sm={10} md={10} lg={10} xl={10} key={airline._id}>
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
                <Link className="Link-for-eventcard" to={`/flightDetails/${airline._id}`}>
                    <CardContent>
                        <Typography variant="h5" component="h1" gutterBottom>
                            From: {airline.departure} To: {airline.arrival}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            flightCode: {airline.flightCode} 
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Departure: {airline.departureDate} at {airline.departureTime}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Arrival: {airline.arrivalDate} at {airline.arrivalTime}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Price: {airline.price}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Available seats: {airline.seats - airline.bookedSeats}
                        </Typography>
                    </CardContent>
                </Link>
            </Card>
          </Grid>
        );
    };

    card =
    jobsData &&
    jobsData.map((job) => {
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

export default AirlinesResult;
