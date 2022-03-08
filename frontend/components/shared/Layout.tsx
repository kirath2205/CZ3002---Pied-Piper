//lib
import { useState } from 'react';
import Router from 'next/router';
//mui
import { AppBar, Box, Toolbar, IconButton, Menu, MenuItem, Typography, CssBaseline, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
//components
import Sidebar from '@/components/shared/Sidebar';
import UnstyledLink from '@/components/shared/UnstyledLink';
import ProfileMenu from '@/components/shared/ProfileMenu';
//state
import { useAppSelector } from '@/app/hooks';
import { selectLoggedIn } from '@/app/slices/authSlice';
import useLogin from '@/utils/hooks/useLogin';

interface LayoutProps {
    children: React.ReactNode;
}

/**
 *
 * Renders a reusable layout component with an appbar and drawer
 *
 * @param {LayoutProps} props - The children to be rendered in the layout
 * @returns {JSX.Element} - The Layout component
 */
const Layout = ({ children }: LayoutProps): JSX.Element => {
    useLogin();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const loggedIn = useAppSelector(selectLoggedIn);

    const openAccountMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const closeAccountMenu = () => {
        setAnchorEl(null);
    };

    const openDrawer = () => {
        setDrawerOpen(true);
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
    };

    return (
        <main>
            <CssBaseline />

            <AppBar position='sticky' sx={{ backgroundColor: '#78b9c4', color: '#fff' }}>
                <Toolbar>
                    <IconButton size='large' edge='start' color='inherit' aria-label='sidenav' onClick={openDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Drawer open={drawerOpen} onClose={closeDrawer}>
                        <Sidebar closeSidebar={closeDrawer} />
                    </Drawer>

                    <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                        <UnstyledLink>VolunteerGoWhere</UnstyledLink>
                    </Typography>
                    {loggedIn ? (
                        <>
                            <IconButton
                                size='large'
                                aria-label='account of current user'
                                aria-controls='menu-account'
                                aria-haspopup='true'
                                onClick={openAccountMenu}
                                color='inherit'
                            >
                                <AccountCircle />
                            </IconButton>
                            <ProfileMenu closeAccountMenu={closeAccountMenu} anchorEl={anchorEl} />
                        </>
                    ) : (
                        <IconButton size='large' color='inherit' onClick={() => Router.push('/auth/signin')}>
                            <LoginIcon />
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>

            {children}
        </main>
    );
};

export default Layout;
