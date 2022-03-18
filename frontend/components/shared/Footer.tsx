import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { blue, red } from '@mui/material/colors';

function Copyright() {
  return (

    <><>

      </><Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, fontSize: 18, color: '#fff', textAlign: 'center' }}>
              Copyright ©
              <Link color="#fff" href="https://mui.com/">VolunteerGoWhere.sg</Link>{' '}
              {new Date().getFullYear()}
              {'.'}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, fontSize: 18, color: '#fff', textAlign: 'center' }}>

              <Link color="#fff" href="https://mui.com/">
                Terms and Conditions
              </Link>{' '}

              <Link color="#fff" href="https://mui.com/">
                  Privacy Policy
              </Link>{' '}
            </Typography>

          </>
  );
}

export default function StickyFooter() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        width:'100%',
        fontWeight:500,
        textAlign:'center',
        marign:0,
        padding:0
      }}
    >
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: '#78b9c4',
          color:'#fff'
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}