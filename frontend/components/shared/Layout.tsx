//lib
import { useState, useEffect } from 'react';
import Router from 'next/router';
import Head from 'next/head';
//mui
import { AppBar, Box, Toolbar, IconButton, Typography, CssBaseline, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
//components
import Sidebar from '@/components/shared/Sidebar';
import UnstyledLink from '@/components/shared/UnstyledLink';
import ProfileMenu from '@/components/shared/ProfileMenu';
//state
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { selectLoggedIn, refreshToken } from '@/app/slices/authSlice';
import Footer from '@/components/shared/Footer';

interface LayoutProps {
    children: React.ReactNode;
    title?: string;
    content?: string;
}

/**
 *
 * Renders a reusable layout component with an appbar and drawer
 *
 * @param {LayoutProps} props - The children to be rendered in the layout
 * @returns {JSX.Element} - The Layout component
 */
const Layout = ({ children, title, content }: LayoutProps): JSX.Element => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const loggedIn = useAppSelector(selectLoggedIn);
    const dispatch = useAppDispatch();

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

    //Login persistence
    useEffect(() => {
        if (dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(refreshToken());
        }
    }, [dispatch]);

    return (
        <>
            <Head>
                <title>{title ?? 'VolunteerGoWhere'}</title>
                <meta
                    name='description'
                    content={content ?? 'All in one platform to find volunteering opportunities'}
                />
            </Head>

            <Box component='main' sx={{ position: 'relative', minHeight: '100vh' }}>
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
                <Box pb={'8rem'}>{children}</Box>
                <Footer />
            </Box>
        </>
    );
};

export default Layout;
