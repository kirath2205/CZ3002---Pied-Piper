//mui
import { Menu, MenuItem } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/router';
//redux
import { useAppDispatch } from '@/app/hooks';
import { logout, UserType } from '@/app/slices/authSlice';

interface ProfileMenuProps {
    closeAccountMenu: () => void;
    anchorEl: HTMLElement | null;
    userType?: UserType;
}

/**
 * Renders the profile menu
 *
 * @param {ProfileMenuProps}
 * @returns {JSX.Element} - The profile menu
 */
const ProfileMenu = ({ closeAccountMenu, anchorEl, userType }: ProfileMenuProps): JSX.Element => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const logoutHandler = () => {
        if (dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(logout());
        }
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
            <MenuItem onClick={() => router.push(`/profile/${userType?.toLocaleLowerCase()}`)}>Profile</MenuItem>
            <MenuItem onClick={closeAccountMenu}>My account</MenuItem>
            <MenuItem onClick={logoutHandler}>Sign out</MenuItem>
        </Menu>
    );
};

export default ProfileMenu;
