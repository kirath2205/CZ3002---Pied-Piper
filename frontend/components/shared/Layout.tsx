import { AppBar, Box, Toolbar, IconButton, Menu, MenuItem, Typography, CssBaseline, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SidebarLinks from '@/components/shared/SidebarLinks';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

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
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position='sticky' sx={{ backgroundColor: '#78b9c4', color: '#fff' }}>
					<Toolbar>
						<IconButton size='large' edge='start' color='inherit' aria-label='sidenav' sx={{ mr: 2 }} onClick={openDrawer}>
							<MenuIcon />
						</IconButton>
						<Drawer open={drawerOpen} onClose={closeDrawer}>
							<SidebarLinks />
						</Drawer>

						<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
							VolunteerGoWhere
						</Typography>
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
					</Toolbar>
				</AppBar>
			</Box>
			{children}
		</main>
	);
};

export default Layout;
