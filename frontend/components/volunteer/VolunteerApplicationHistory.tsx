//mui
import {Typography,Container,Grid,Avatar,IconButton,List,ListItem,ListItemAvatar,ListItemText} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ContactPage from '@mui/icons-material/ContactPage';
import { styled } from '@mui/material/styles';
//lib
import axios from 'axios';
import * as React from 'react';

interface VolunteerApplicationHistoryProp {
    history: string[];
}

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

/**
 * Renders the Application History page
 *
 *
 * @returns {JSX.Element} - The Application History page
 */
const VolunteerApplicationHistory = ({history} : VolunteerApplicationHistoryProp) => {
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

    return (
        <Container maxWidth='sm' sx={{ mt: 2 }}>
            <Typography variant='h6' align='center'>
                List of Campaigns
            </Typography>

            <Grid item>
                <Demo>
                <List dense={dense}>
                        {history && history.map((h:any)=>{
                            return(
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <ContactPage/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={h.campaign_id} secondary={h.organization} />
                                    <ListItemText sx={{display:'flex', justifyContent:'flex-end'}} primary={h.status}/>
                                </ListItem>
                            )
                        })
                        }
                    </List>
                </Demo>
            </Grid>
        </Container>
    );
};

export default VolunteerApplicationHistory;
