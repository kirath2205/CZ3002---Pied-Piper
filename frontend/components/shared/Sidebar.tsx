//mui
import { IconButton, List, ListItem } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
//libs
import React from 'react';
//components
import UnstyledLink from '@/components/shared/UnstyledLink';
//types
import { UserType } from '@/app/slices/authSlice';

interface SidebarProps {
    closeSidebar: () => void;
    loggedIn: boolean;
    userType?: UserType;
}

/**
 * Renders the list of links in the sidebar
 *
 * @returns {JSX.Element} - The SidebarLinks component
 */
const Sidebar = ({ closeSidebar, loggedIn, userType }: SidebarProps): JSX.Element => {
    return (
        <List sx={{ mb: 2, ml: 2, mr: 4 }}>
            <ListItem sx={{ mb: -1, pl: 0 }}>
                <IconButton onClick={closeSidebar}>
                    <CloseRoundedIcon color='primary' />
                </IconButton>
            </ListItem>
            {!loggedIn && (
                <ListItem>
                    <UnstyledLink href='/campaigns'>Be a volunteer</UnstyledLink>
                </ListItem>
            )}
            <ListItem>
                <UnstyledLink href='/campaigns'>Browse Campaigns</UnstyledLink>
            </ListItem>
            {loggedIn && userType === 'ORG' && (
                <ListItem>
                    <UnstyledLink href='/campaigns/create-campaign'>Create Campaign</UnstyledLink>
                </ListItem>
            )}
            <ListItem>
                <UnstyledLink href='/aboutus'>Learn more about us</UnstyledLink>
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
