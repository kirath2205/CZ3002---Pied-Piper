//mui
import { Menu, MenuItem } from '@mui/material';
import React from 'react';

interface ProfileMenuProps {
    closeAccountMenu: () => void;
    anchorEl: HTMLElement | null;
}

const ProfileMenu = ({ closeAccountMenu, anchorEl }: ProfileMenuProps): JSX.Element => {
    return (
        <Menu
            id='menu-account'
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={closeAccountMenu}
        >
            <MenuItem onClick={closeAccountMenu}>Profile</MenuItem>
            <MenuItem onClick={closeAccountMenu}>My account</MenuItem>
        </Menu>
    );
};

export default ProfileMenu;
