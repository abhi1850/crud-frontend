import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  IconButton,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Refresh, Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../store/auth';
import LOGO from '/LOGO.png';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const navigate = useNavigate();

  // Generate a random CAPTCHA
  const generateCaptcha = () => {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(captcha); // Store CAPTCHA value in state
    setCaptchaInput(''); // Clear the CAPTCHA input field
  };

  // Initialize CAPTCHA on component mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  // Formik for form validation
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      captchaInput: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, 'Username must be at least 8 characters long')
        .matches(/[A-Za-z]/, 'Username must contain at least one letter')
        .matches(/[0-9]/, 'Username must contain at least one number')
        .required('Username is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(
          /[@$!%*?&#]/,
          'Password must contain at least one special character',
        )
        .required('Password is required'),
      captchaInput: Yup.string()
        .oneOf([captcha], 'CAPTCHA does not match')
        .required('CAPTCHA is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await signIn(values.username, values.password);
        toast.success(response.message);
        sessionStorage.setItem('isAuthenticated', true);
        sessionStorage.setItem('isAdminUser', response?.user?.isAdminUser);
        navigate('/form');
      } catch (error) {
        toast.error(error.message || 'Login failed');
        generateCaptcha();
      }
    },
  });

  // Trigger Formik validation after CAPTCHA is refreshed
  const handleCaptchaRefresh = () => {
    generateCaptcha();
    formik.setFieldValue('captchaInput', ''); // Clear the CAPTCHA input
    formik.validateField('captchaInput'); // Trigger validation for CAPTCHA field
  };

  return (
    <Grid container style={{ height: '100vh', width: '100vw' }}>
      {/* Left part with an image */}
      <Grid
        item
        xs={12}
        md={6}
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundColor: '#f4f4f4',
        }}
      >
        <img
          style={{
            maxWidth: '80%',
            objectFit: 'contain',
          }}
          src={LOGO}
          alt="Logo"
        />
      </Grid>

      {/* Right part with login form */}
      <Grid
        item
        xs={12}
        md={6}
        container
        alignItems="center"
        justifyContent="center"
        style={{ padding: '20px' }}
      >
        <Paper
          elevation={3}
          style={{ padding: '40px', width: '100%', maxWidth: '400px' }}
        >
          <Typography
            variant="h5"
            style={{ marginBottom: '20px', textAlign: 'center' }}
          >
            Login
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            {/* Username Field */}
            <TextField
              fullWidth
              label="Username"
              name="username"
              variant="outlined"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              style={{ marginBottom: '20px' }}
            />

            {/* Password Field */}
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              style={{ marginBottom: '20px' }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />

            {/* CAPTCHA */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '20px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    textDecoration: 'line-through',
                    fontStyle: 'italic',
                    letterSpacing: '0.1em',
                    transform: 'rotate(-5deg)',
                    color: 'gray',
                  }}
                >
                  <b>{captcha}</b>
                </Typography>

                <IconButton onClick={handleCaptchaRefresh}>
                  <Refresh />
                </IconButton>
              </Box>
              <TextField
                fullWidth
                label="Enter CAPTCHA"
                name="captchaInput"
                variant="outlined"
                value={formik.values.captchaInput}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.captchaInput &&
                  Boolean(formik.errors.captchaInput)
                }
                helperText={
                  formik.touched.captchaInput && formik.errors.captchaInput
                }
                style={{ marginTop: '10px' }}
              />
            </Box>

            {/* Submit Button */}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disabled={!formik.isValid || !formik.dirty}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Grid>
      <ToastContainer position="top-right" autoClose={3000} />
    </Grid>
  );
};

export default Login;
