import React, { useState, useEffect, useContext } from "react";
import {useLocation} from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import noImage from "../assets/flightpic.jpg";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardHeader
  } from '@mui/material';
import '../App.css';
import html2pdf from 'html2pdf.js';

const BookingDone = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [pageData, setPageData] = useState(undefined);
    let [hasError, setError] = useState(false);

    useEffect(() => {
        console.log("on load useeffect");
        async function fetchData() {
            try {
                console.log(location.state)
                const data  = location.state.fdata;
                setPageData(data);
                console.log(data.flight);
                console.log(data.booking)
                setLoading(false);
                setError(false);
              } catch (e) {
                console.log(e);
                setError(true);
              }
        }
        fetchData();
      }, [location]);


      const DownloadPDFButton2 = ({ componentId }) => {
        const handleDownload = () => {
          const element = document.getElementById(componentId);
      
          if (!element) {
            console.error(`Element with id ${componentId} not found`);
            return;
          }
      
          html2canvas(element).then((canvas) => {
            const pdf = new jsPDF('p', 'mm', 'a4');
            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297);
            pdf.save('booking-details.pdf');
          });
        };
      
        return (
          <Button onClick={handleDownload} variant="contained" sx={{ marginTop: 2 }}>
            Download as PDF
          </Button>
        );
      };


      const DownloadPDFButton = ({ componentId }) => {
        const handleDownload = async () => {
          const element = document.getElementById(componentId);
      
          if (!element) {
            console.error(`Element with id ${componentId} not found`);
            return;
          }
      
          const pdfOptions = {
            margin: 10,
            filename: 'booking-details.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            delay: 1000,
          };
      
          try {
            const pdf = await html2pdf().from(element).set(pdfOptions).outputPdf();
      
            // You can do something with the generated PDF, for example, open it in a new window.
            const blob = new Blob([pdf], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
          } catch (error) {
            console.error('Error generating PDF:', error);
          }
        };
      
        return (
          <Button onClick={handleDownload} variant="contained" sx={{ marginTop: 2 }}>
            Download as PDF
          </Button>
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
          <div>
          <Card
            id="booking-details-card"
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
              title={pageData.flight.flightCode}
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
                        <dt className='title'>Flight Details: </dt>
                    </p>
                    <p>
                        <dt className='title2'>From: {pageData.flight.departure}          To: {pageData.flight.arrival}</dt>
                    </p>
                    <p>
                        <dt className='title2'>Departure on: {pageData.flight.departureDate}    At: {pageData.flight.departureTime}</dt>
                    </p>
                    <p>
                        <dt className='title2'>Arrival on: {pageData.flight.arrivalDate}    At: {pageData.flight.arrivalTime}</dt>
                    </p>
                    <p>
                        <dt className='title'>Passanger Details: </dt>
                    </p>
                    <p>
                        <dt className='title2'>Name: {pageData.booking.firstName} {pageData.booking.lastName}</dt>
                    </p>
                    <p>
                        <dt className='title2'>Email ID: {pageData.booking.emailId}</dt>
                    </p>
                    <p>
                        <dt className='title2'>Contact Number: {pageData.booking.contactNumber}</dt>
                    </p>
                    <p>
                        <dt className='title2'>Passport Number: {pageData.booking.PassportNo}</dt>
                    </p>
                  <br/>
                  <div style={{textAlign: 'center' }}><DownloadPDFButton2 componentId="booking-details-card" /></div>
                </dl>
              </Typography>
            </CardContent>
          </Card>
          </div>
        );
      }
};

export default BookingDone;
