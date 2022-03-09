//mui
import { Menu, MenuItem } from '@mui/material';
import React from 'react';
import Router from 'next/router';
//state
import { useAppDispatch } from '@/app/hooks';
import { logout as logoutAction } from '@/app/slices/authSlice';

interface ProfileMenuProps {
    closeAccountMenu: () => void;
    anchorEl: HTMLElement | null;
}

const ProfileMenu = ({ closeAccountMenu, anchorEl }: ProfileMenuProps): JSX.Element => {
    const dispatch = useAppDispatch();
    const logout = () => {
        Router.replace('/');
        dispatch(logoutAction());
    };

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
            <MenuItem onClick={() => logout()}>Sign out</MenuItem>
        </Menu>
    );
};

export default ProfileMenu;
