import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';

import Logo from '../../assets/Logo.svg';
import { deepPurple } from '@mui/material/colors';

const pages = ['Home', 'Companies'];
const settings = ['Profile', 'Logout'];

const Header = (props:any) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const buttonProfileClick = (e: any) => {
    const setting = `${e.target.innerHTML}`;
    if (setting === 'Logout') {
      localStorage.clear();
      document.location.href = '/home';
    }
    if (setting === 'Profile') {
      document.location.href = '/profile';
    }
  }

  return (
    <AppBar position="static" elevation={0} style={{ background: 'transparent'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
          <img src={Logo} alt="" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon style={{ color: '#1D253C' }}/>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <NavLink key={page} 
                    to={`/${page.toLowerCase()}` }
                    style={{ color: 'inherit', textDecoration: 'none'}}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">                    
                        {page}
                    </Typography>
                  </MenuItem>
                </NavLink>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
          <img src={Logo} alt="" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <NavLink 
              key={page}
              to={`/${page.toLowerCase()}` }
              style={{ color: 'inherit', textDecoration: 'none'}}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '#1D253C', display: 'block' }}
              >                  
                      {page}            
              </Button>
              </NavLink>
            ))}
          </Box>

          {
          props.logged != false ?
          (<Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} >
              <Avatar alt="Profile Picture" src="https://scontent.fcpq5-1.fna.fbcdn.net/v/t39.30808-6/274857951_370742008222315_7929118995737837938_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=730e14&_nc_ohc=Fjr2tv4L7S8AX8FqP5y&_nc_ht=scontent.fcpq5-1.fna&oh=00_AT93z5pJvI-tEp8iCIFzTGF2ROnan1NFjDI4gVWGKEwKIw&oe=621DE184" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <div key={setting}
                onClick={buttonProfileClick}
                style={{ color: 'inherit', textDecoration: 'none'}}>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      {setting}
                    </Typography>
                  </MenuItem>
                </div>
              ))}
            </Menu>
          </Box>)
          :
          (<div className="d-flex">
            <NavLink 
              to={'/login'}
              style={{ color: 'inherit', textDecoration: 'none'}}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '#1D253C', display: 'block' }}>                  
                Login          
              </Button>
            </NavLink>
            <NavLink 
              to={'/register'}
              style={{ color: 'inherit', textDecoration: 'none'}}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '#1D253C', display: 'block' }}>                  
                Register          
              </Button>
            </NavLink>
          </div>)}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
