import { Box, Grid, Typography } from '@mui/material';
import LOGO from '/LOGO.png';
import BadgeIcon from '@mui/icons-material/Badge';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#333',
        color: 'white',
      }}
    >
      <Grid container sx={{ pb: 0 }}>
        <Grid container spacing={2}>
          <Grid item sm={6} sx={{ justifyContent: 'left', alignItems: 'down' }}>
            <Grid
              item
              sm={12}
              sx={{
                display: 'flex',
                p: 0,
                justifyContent: 'left',
                alignItems: 'center',
                height: '150px',
                pl: 2,
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
                  zIndex: 100,
                }}
              />
            </Grid>
          </Grid>
          <Grid
            item
            sm={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-end',
              pr: 2,
            }}
          >
            <Grid
              container
              spacing={2}
              sx={{ textAlign: 'right', alignItems: 'center' }}
            >
              <Grid item sm={11.5}>
                <Typography>Abhishek T</Typography>
              </Grid>
              <Grid item sm={0.5}>
                <BadgeIcon sx={{ color: 'darkred' }} />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              sx={{ textAlign: 'right', alignItems: 'center' }}
            >
              <Grid item sm={11.5}>
                <Typography>+91 9741093445</Typography>
              </Grid>
              <Grid item sm={0.5}>
                <PermPhoneMsgIcon sx={{ color: 'green' }} />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              sx={{ textAlign: 'right', alignItems: 'center' }}
            >
              <Grid item sm={11.5}>
                <a href="mailto:abhishekthyagaraj@gmail.com">
                  <Typography>abhishekthyagaraj@gmail.com </Typography>
                </a>
              </Grid>
              <Grid item sm={0.5}>
                <a href="mailto:abhishekthyagaraj@gmail.com">
                  <AlternateEmailIcon sx={{ color: '#d93f00' }} />
                </a>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={2}
              sx={{ textAlign: 'right', alignItems: 'center' }}
            >
              <Grid item sm={11.5}>
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
              <Grid item sm={0.5}>
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
        </Grid>
        <Grid
          item
          sm={12}
          sx={{
            bgcolor: 'black',
            pl: 2,
            m: 0,
            justifyContent: 'left',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ mt: 1, pb: 1, justifyContent: 'left' }}>
            © Privacy 2025
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
