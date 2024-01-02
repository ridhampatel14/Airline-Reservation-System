import React from 'react';
import {
	Button
} from '@mui/material/';
import GoogleIcon from '@mui/icons-material/Google';
import { doSocialSignIn } from '../firebase/functions';

const SocialSignIn = () => {
	const socialSignOn = async (provider) => {
		try {
			await doSocialSignIn(provider);
		} catch (error) {
			alert(error);
		}
	};
	return (
		<div>
			<Button
				variant="outlined"
				color="secondary"
				sx={{
					borderRadius: '50px',
					color: 'white',
					backgroundColor: '#2f2fa2',
					'&:hover': {
						backgroundColor: '#2f2fa2',
					},
				}}
				style={{ marginTop: '1em' }}
				onClick={() => socialSignOn('google')}
				startIcon={<GoogleIcon style={{ color: 'white' }} />}
			>
				Sign Up with google
			</Button>
		</div>
	);
};

export default SocialSignIn;
