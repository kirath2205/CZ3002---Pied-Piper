//mui
import { IconButton, List, ListItem } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
//libs
import React from 'react';
//components
import UnstyledLink from '@/components/shared/UnstyledLink';

interface SidebarProps {
    closeSidebar: () => void;
}

/**
 * Renders the list of links in the sidebar
 *
 * @returns {JSX.Element} - The SidebarLinks component
 */
const Sidebar = ({ closeSidebar }: SidebarProps): JSX.Element => {
    return (
        <List sx={{ mb: 2, ml: 2, mr: 4 }}>
            <ListItem sx={{ mb: -1, pl: 0 }}>
                <IconButton onClick={closeSidebar}>
                    <CloseRoundedIcon color='primary' />
                </IconButton>
            </ListItem>
            <ListItem>
                <UnstyledLink href='/campaigns'>Be a volunteer</UnstyledLink>
            </ListItem>
            <ListItem>
                <UnstyledLink href='/campaigns/create-campaign'>Create Campaign</UnstyledLink>
            </ListItem>
            <ListItem>
                <UnstyledLink>Learn</UnstyledLink>
            </ListItem>
            <ListItem>
                <UnstyledLink href='contactus'>Contact us</UnstyledLink>
            </ListItem>
            <ListItem>
                <UnstyledLink href='/faq'>FAQ</UnstyledLink>
            </ListItem>
        </List>
    );
};

export default Sidebar;
