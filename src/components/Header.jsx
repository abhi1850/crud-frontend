import { useState } from 'react';
import { Avatar, Menu, MenuItem, Typography, Grid } from '@mui/material';
import LOGO from '/LOGO.png';
import Abhi from '/abhi.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null); // State for dropdown
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget); // Open dropdown menu
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close dropdown menu
  };

  const handleLogout = () => {
    sessionStorage.clear(); // Clear session storage
    navigate('/'); // Redirect to login page
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: 'flex',
        height: '10vh',
        alignItems: 'center',
        bgcolor: '#f4f4f4',
        border: '1px solid black',
      }}
    >
      {/* Logo Section */}
      <Grid
        item
        sm={1}
        sx={{
          display: 'flex',
          p: 0,
          justifyContent: 'left',
          alignItems: 'center',
          pb: 1,
          pl: 2,
        }}
      >
        <img
          src={LOGO}
          alt="Logo"
          style={{
            maxWidth: '50%',
            maxHeight: '50%',
            objectFit: 'contain',
            zIndex: 100,
          }}
        />
      </Grid>

      {/* Title Section */}
      <Grid item sm={10} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '30px',
            color: 'rgba(223, 43, 135, 0.8)',
          }}
        >
          CRUD APP
        </Typography>
      </Grid>

      {/* Avatar with Dropdown */}
      <Grid
        item
        sm={1}
        sx={{
          display: 'flex',
          p: 0,
          justifyContent: 'right',
          alignItems: 'center',
          pr: 3,
        }}
      >
        <Avatar
          alt="Abhi"
          src={Abhi}
          sx={{ border: '2px solid red', cursor: 'pointer' }}
          onClick={handleMenuOpen} // Open menu on click
        />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Grid>
    </Grid>
  );
};

export default Header;
