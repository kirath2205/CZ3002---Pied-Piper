import { Stack, Box, Typography, Button } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import UnstyledLink from '@/components/shared/UnstyledLink';

/**
 * The accolades section for home page
 *
 * @returns {JSX.Element} - The accolades section for home page
 */
const Accolades = (): JSX.Element => {
	return (
		<Stack marginTop={2} marginX={4} sx={{ textAlign: 'center' }} gap={4}>
			<Box>
				<Typography variant='h4'>All in One Application</Typography>
				<Typography variant='body1'>We want to make volunteering to be simple,fun and meaningful to you</Typography>
				<Image src='/handshake-icon.jpg' width={300} height={200} />

				<Typography variant='body1'>
					Find a volunteer activity that you're interested in, and use the skills you have right here in Singapore.
				</Typography>
				<UnstyledLink href="auth/signup">
					<Button sx={{ marginY: 2, width: '30%', backgroundColor: '#12CDD4' }} color='primary' variant='contained'>
						Be a volunteer
					</Button>
				</UnstyledLink>
			</Box>
			<Box>
				<Image src='/home-heart.png' width={250} height={250} />
				<Typography variant='h4'>27</Typography>
				<Typography variant='body1'>Registered Volunteering Organisations Supported</Typography>
			</Box>
			<Box>
				<Image src='/hands-raised.png' width={250} height={250} />
				<Typography variant='h4'>130k</Typography>
				<Typography variant='body1'>Successfully run campaigns</Typography>
			</Box>
			<Box>
				<Image src='/hands-heart.png' width={250} height={250} />
				<Typography variant='h4'>100k</Typography>
				<Typography variant='body1'>Volunteer signups</Typography>
			</Box>
		</Stack>
	);
};

export default Accolades;
