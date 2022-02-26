import { List, ListItem, ListItemText } from '@mui/material';
import React from 'react';

const SidebarLinks = () => {
	return (
		<List sx={{ my: 2, ml: 2, mr: 4 }}>
			<ListItem>
				<ListItemText primary='Be a volunteer' />
			</ListItem>
			<ListItem>
				<ListItemText primary='Learn' />
			</ListItem>
			<ListItem>
				<ListItemText primary='Contact us' />
			</ListItem>
			<ListItem>
				<ListItemText primary='FAQ  ' />
			</ListItem>
		</List>
	);
};

export default SidebarLinks;
