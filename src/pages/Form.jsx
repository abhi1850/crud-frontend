import { useEffect, useState } from 'react';
import { TextField, Grid, Button, Typography, Paper } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import LOGO from '/LOGO.png';
import { useNavigate, useParams } from 'react-router-dom';
import { getDataById, addData, updateData } from '../store/api';

const Form = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    dob: null,
    phoneNumber: '',
    email: '',
    address: '',
    qualification: '',
    occupation: '',
    website: '',
  });

  const [errors, setErrors] = useState({
    phoneNumber: '',
    email: '',
    website: '',
  });

  useEffect(() => {
    if (id) {
      getDataById(id) // Using the imported API function
        .then((res) => {
          setFormData({
            name: res?.data?.response[0]?.name || '',
            dob: new Date(res?.data?.response[0]?.dob),
            phoneNumber: res?.data?.response[0]?.phoneNumber || '',
            email: res?.data?.response[0]?.email || '',
            address: res?.data?.response[0]?.address || '',
            qualification: res?.data?.response[0]?.qualification || '',
            occupation: res?.data?.response[0]?.occupation || '',
            website: res?.data?.response[0]?.website || '',
          });
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prevState) => ({
      ...prevState,
      dob: date,
    }));
  };

  const validateForm = () => {
    let formErrors = {};
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const websiteRegex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/;

    if (!phoneRegex.test(formData.phoneNumber)) {
      formErrors.phoneNumber = 'Phone number must be 10 digits.';
    }
    if (!emailRegex.test(formData.email)) {
      formErrors.email = 'Please enter a valid email address.';
    }
    if (!websiteRegex.test(formData.website)) {
      formErrors.website = 'Please enter a valid website URL.';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (id) {
        updateData(id, formData) // Using the imported API function
          .then((res) => {
            console.log('Update Response:', res.data);
            navigate(`/view`);
          })
          .catch((err) => console.log(err));
      } else {
        addData(formData) // Using the imported API function
          .then((res) => {
            console.log('Add Response:', res.data);
            navigate(`/view`);
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      console.log("Is Admin User : ",sessionStorage.getItem?.isAdminUser);
      <Paper
        component="form"
        onSubmit={handleSubmit}
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
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Date of Birth"
              value={formData.dob}
              onChange={handleDateChange}
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
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              required
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              variant="outlined"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Qualification"
              variant="outlined"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Occupation"
              variant="outlined"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Website"
              variant="outlined"
              name="website"
              value={formData.website}
              onChange={handleChange}
              required
              error={!!errors.website}
              helperText={errors.website}
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </LocalizationProvider>
  );
};

export default Form;
