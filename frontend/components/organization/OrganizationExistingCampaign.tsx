import { useFormik,} from 'formik';
import * as yup from 'yup';

//mui
import { Button, TextField, Typography, Container, Stack, Select, MenuItem, FormControl, InputLabel, FormHelperText, FormGroup, Grid, Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import axios from 'axios';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ContactPage from '@mui/icons-material/ContactPage';

function generate(element: React.ReactElement) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }

  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

/**
 * Renders the Approve Application page
 *
 *
 * @returns {JSX.Element} - The Approve Application page
 */
const OrganizationExistingCampaign= () => {
    
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

    return  <Container maxWidth='sm' sx={{ mt: 2 }}>

        <Typography variant='h6' align='center'>
            List of Campaign
        </Typography>


        <Grid item>
          <Demo>
            <List dense={dense}>
              {generate(
                <ListItem 
                
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>

                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <ContactPage />
                    </Avatar>
                  </ListItemAvatar>
                  <IconButton edge="end" aria-label="edit" sx={{mr:2}}>
                    <EditIcon />
                  </IconButton>
                  <ListItemText
                    primary="Campaign Name"
                    secondary="Name"
                  />
                </ListItem>,

                
              )}
            </List>
          </Demo>
        </Grid>
    </Container>
    }

export default OrganizationExistingCampaign;