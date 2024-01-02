import './App.css';
import { AuthProvider } from './firebase/Auth';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Navbar from './navbar/navbar';
import AirlinesResult from './pages/AirlinesResult';
import FlightDetils from './pages/FlightDetails';
import Profile from './components/Profile';
import BookingPage from './pages/BookingPage';
import BookingDone from './pages/BookingDone';
import Bookings from './pages/Bookings';
import AdminLogin from './pages/AdminLogin';
import AdminAddFlight from './pages/AdminAddFlight';

function App() {
	return (
		<AuthProvider>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<BrowserRouter>
					<Navbar/>
					<Routes>
						<Route path="/AirlinesResult" element={<AirlinesResult />} />
						<Route path="/SignUp" element={<SignUp />} />
						<Route path="/" element={<Login />} />
            			<Route path="/Dashboard" element={<Dashboard />} />
						<Route path='/flightDetails/:id' element={<FlightDetils/>}/>
						<Route path='/profile' element={<Profile/>}/>
						<Route path='/bookTicket/:id' element={<BookingPage/>}/>
						<Route path='/bookingDone' element={<BookingDone/>}/>
						<Route path='/myBookings' element={<Bookings/>}/>
						<Route path='/adminLogin' element={<AdminLogin/>}/>
						<Route path='/AdminAddPage' element={<AdminAddFlight/>}/>
					</Routes>
				</BrowserRouter>
			</LocalizationProvider>
		</AuthProvider>
	);
}

export default App;
