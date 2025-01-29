import { useEffect } from 'react';
import { TextField, Grid, Button, Typography, Paper } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useFormik } from 'formik';
import LOGO from '/LOGO.png';
import { useNavigate, useParams } from 'react-router-dom';
import { getDataById, addData, updateData } from '../store/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles

const Form = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      dob: null,
      phoneNumber: '',
      email: '',
      address: '',
      qualification: '',
      occupation: '',
      website: '',
    },
    validate: (values) => {
      const errors = {};
      const phoneRegex = /^[0-9]{10}$/;
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      const websiteRegex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/;

      if (!phoneRegex.test(values.phoneNumber)) {
        errors.phoneNumber = 'Phone number must be 10 digits.';
      }
      if (!emailRegex.test(values.email)) {
        errors.email = 'Please enter a valid email address.';
      }
      if (!websiteRegex.test(values.website)) {
        errors.website = 'Please enter a valid website URL.';
      }

      return errors;
    },
    onSubmit: (values) => {
      if (id) {
        updateData(id, values)
          .then((res) => {
            toast.success('Data updated successfully!');
            console.log('Update Response:', res.data);
            navigate(`/view`);
          })
          .catch((err) => {
            toast.error('Failed to update data!');
            console.log(err);
          });
      } else {
        addData(values)
          .then((res) => {
            toast.success('Data added successfully!');
            console.log('Add Response:', res.data);
            navigate(`/view`);
          })
          .catch((err) => {
            toast.error('Failed to add data!');
            console.log(err);
          });
      }
    },
  });

  useEffect(() => {
    if (id) {
      getDataById(id)
        .then((res) => {
          const data = res?.data?.response;
          if (data) {
            formik.setValues({
              name: data.name || '',
              dob: new Date(data.dob),
              phoneNumber: data.phoneNumber || '',
              email: data.email || '',
              address: data.address || '',
              qualification: data.qualification || '',
              occupation: data.occupation || '',
              website: data.website || '',
            });
          }
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          maxWidth: 600,
          mx: 'auto',
          p: 3,
          backgroundColor: '#f4f4f4',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
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
                pl: 6,
                fontWeight: 'bold',
                color: 'rgba(223, 43, 135, 0.8)',
              }}
            >
              Personal Info
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Date of Birth"
              value={formik.values.dob}
              onChange={(date) => formik.setFieldValue('dob', date)}
              renderInput={(params) => (
                <TextField {...params} fullWidth required />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              required
              error={!!formik.errors.phoneNumber}
              helperText={formik.errors.phoneNumber}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              type="email"
              required
              error={!!formik.errors.email}
              helperText={formik.errors.email}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              variant="outlined"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Qualification"
              variant="outlined"
              name="qualification"
              value={formik.values.qualification}
              onChange={formik.handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Occupation"
              variant="outlined"
              name="occupation"
              value={formik.values.occupation}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Website"
              variant="outlined"
              name="website"
              value={formik.values.website}
              onChange={formik.handleChange}
              required
              error={!!formik.errors.website}
              helperText={formik.errors.website}
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Toast Container */}
      <ToastContainer />
    </LocalizationProvider>
  );
};

export default Form;
