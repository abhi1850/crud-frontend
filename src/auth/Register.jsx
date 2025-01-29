import {
    Paper,
    TextField,
    Button,
    Typography,
    Grid,
    Checkbox,
    FormControlLabel,
  } from '@mui/material';
  import { Formik, Field, Form } from 'formik';
  import LOGO from '/LOGO.png';
  import { register } from '../store/auth';
  import { toast } from 'react-toastify'; // Ensure you have installed react-toastify for notifications
  import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router
  
  const Register = () => {
    const navigate = useNavigate();
  
    return (
      <Paper
        elevation={3}
        sx={{
          padding: '20px',
          width: '400px',
          margin: '0 auto',
          marginTop: '50px',
        }}
      >
        <Grid container spacing={2} sx={{ p: 0 }}>
          <Grid
            item
            xs={3}
            sx={{
              p: 0,
              height: '100px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                zIndex: 100,
              }}
              src={LOGO}
              alt="Logo"
            />
          </Grid>
          <Grid item xs={9} sx={{ p: 0, mt: 3 }}>
            <Typography
              variant="h5"
              sx={{
                p: 0,
                pl: 3,
                fontWeight: 'bold',
                color: 'rgba(223, 43, 135, 0.8)',
              }}
            >
              Register User
            </Typography>
          </Grid>
        </Grid>
  
        <Formik
          initialValues={{
            username: '',
            password: '',
            email: '',
            phoneNumber: '',
            isAdminUser: false,
          }}
          validate={(values) => {
            const errors = {};
  
            // Username validation: must contain at least 1 number and 1 letter
            if (!values.username) {
              errors.username = 'Username is required';
            } else if (
              !/[a-zA-Z]/.test(values.username) ||
              !/\d/.test(values.username)
            ) {
              errors.username =
                'Username must contain at least 1 letter and 1 number';
            }
  
            // Password validation: must contain at least 8 characters, 1 letter, 1 number, and 1 special character
            if (!values.password) {
              errors.password = 'Password is required';
            } else if (
              values.password.length < 8 ||
              !/[a-zA-Z]/.test(values.password) ||
              !/\d/.test(values.password) ||
              !/[!@#$%^&*(),.?":{}|<>]/.test(values.password)
            ) {
              errors.password =
                'Password must be at least 8 characters long and contain 1 letter, 1 number, and 1 special character';
            }
  
            // Email validation
            if (!values.email) errors.email = 'Email is required';
  
            // Phone number validation
            if (!values.phoneNumber)
              errors.phoneNumber = 'Phone Number is required';
  
            return errors;
          }}
          onSubmit={async (values) => {
            try {
              const response = await register(
                values.username,
                values.password,
                values.email,
                values.phoneNumber,
                values.isAdminUser,
              );
              toast.success(response.message);
              navigate('/form');
            } catch (error) {
              toast.error(error.message || 'Registration failed');
            }
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                as={TextField}
                label="Username"
                name="username"
                fullWidth
                margin="normal"
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
              />
              <Field
                as={TextField}
                label="Password"
                name="password"
                type="password"
                fullWidth
                margin="normal"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <Field
                as={TextField}
                label="Email"
                name="email"
                type="email"
                fullWidth
                margin="normal"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <Field
                as={TextField}
                label="Phone Number"
                name="phoneNumber"
                type="text"
                fullWidth
                margin="normal"
                error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                helperText={touched.phoneNumber && errors.phoneNumber}
              />
              <Field
                name="isAdminUser"
                type="checkbox"
                as={FormControlLabel}
                control={<Checkbox />}
                label="Is Admin User?"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ marginTop: '20px' }}
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    );
  };
  
  export default Register;
  