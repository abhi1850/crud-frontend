import { Box, Grid, Typography } from '@mui/material';
import LOGO from '/LOGO.png';
import BadgeIcon from '@mui/icons-material/Badge';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#333', color: 'white' }}>
      <Grid container spacing={2}>
        {/* Logo Section */}
        <Grid
          item
          xs={12} sm={6}
          sx={{
            display: 'flex',
            justifyContent: { xs: 'center', sm: 'flex-start' },
            alignItems: 'center',
            height: '150px',
            pl: { xs: 0, sm: 2 },
            pb: 2,
          }}
        >
          <img
            src={LOGO}
            alt="Logo"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
            }}
          />
        </Grid>

        {/* Contact Info Section */}
        <Grid
          item
          xs={12} sm={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: { xs: 'center', sm: 'flex-end' },
            pr: { xs: 0, sm: 2 },
          }}
        >
          <Grid container spacing={2} sx={{ textAlign: { xs: 'center', sm: 'right' }, alignItems: 'center' }}>
            <Grid item xs={10} sm={11.5}>
              <Typography>Abhishek T</Typography>
            </Grid>
            <Grid item xs={2} sm={0.5}>
              <BadgeIcon sx={{ color: 'darkred' }} />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ textAlign: { xs: 'center', sm: 'right' }, alignItems: 'center' }}>
            <Grid item xs={10} sm={11.5}>
              <Typography>+91 9741093445</Typography>
            </Grid>
            <Grid item xs={2} sm={0.5}>
              <PermPhoneMsgIcon sx={{ color: 'green' }} />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ textAlign: { xs: 'center', sm: 'right' }, alignItems: 'center' }}>
            <Grid item xs={10} sm={11.5}>
              <a href="mailto:abhishekthyagaraj@gmail.com">
                <Typography>abhishekthyagaraj@gmail.com</Typography>
              </a>
            </Grid>
            <Grid item xs={2} sm={0.5}>
              <a href="mailto:abhishekthyagaraj@gmail.com">
                <AlternateEmailIcon sx={{ color: '#d93f00' }} />
              </a>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ textAlign: { xs: 'center', sm: 'right' }, alignItems: 'center' }}>
            <Grid item xs={10} sm={11.5}>
              <a
                href="https://www.linkedin.com/in/abhishek-t-6260b9239/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <Typography sx={{ color: 'blue' }}>
                  https://www.linkedin.com/in/abhishek-t-6260b9239/
                </Typography>
              </a>
            </Grid>
            <Grid item xs={2} sm={0.5}>
              <a
                href="https://www.linkedin.com/in/abhishek-t-6260b9239/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon />
              </a>
            </Grid>
          </Grid>
        </Grid>

        {/* Footer Text Section */}
        <Grid item xs={12} sx={{ bgcolor: 'black', pl: { xs: 2, sm: 3 }, m: 0, textAlign: { xs: 'center', sm: 'left' } }}>
          <Typography sx={{ mt: 1, pb: 1 }}>© Privacy 2025</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
