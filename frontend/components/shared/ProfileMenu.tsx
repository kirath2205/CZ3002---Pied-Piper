//mui
import { Menu, MenuItem } from '@mui/material';
import React from 'react';
//components
import UnstyledLink from '@/components/shared/UnstyledLink';
//state
import { useAppSelector } from '../../app/hooks';
import { selectLoggedIn } from '../../app/slices/authSlice';

interface ProfileMenuProps {
    closeAccountMenu: () => void;
    anchorEl: HTMLElement | null;
}

const ProfileMenu = ({ closeAccountMenu, anchorEl }: ProfileMenuProps): JSX.Element => {
    const loggedIn = useAppSelector(selectLoggedIn);
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
            {loggedIn ? (
                <>
                    <MenuItem onClick={closeAccountMenu}>Profile</MenuItem>
                    <MenuItem onClick={closeAccountMenu}>My account</MenuItem>
                </>
            ) : (
                <UnstyledLink href='/auth/signup'>
                    <MenuItem>Sign up</MenuItem>
                </UnstyledLink>
            )}
        </Menu>
    );
};

export default ProfileMenu;
