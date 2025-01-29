import { useEffect, useState } from 'react';
import { Paper, Typography, Grid, Collapse, Box } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LOGO from '/LOGO.png';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';

// Import API functions
import { getAllData, deleteItem } from '../store/api';

// Import react-toastify
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const View = () => {
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState(null); // changed to store _id
  const navigate = useNavigate();

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllData();
        setData(data);
        toast.success('Data loaded successfully!'); // Success toast after data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load data.'); // Error toast in case of failure
      }
    };
    fetchData();
  }, []);

  const handleExpandClick = (_id) => {
    setExpanded(expanded === _id ? null : _id);
  };

  const handleEdit = (_id) => {
    navigate(`/form/${_id}`);
  };

  const handleDelete = async (_id) => {
    try {
      await deleteItem(_id);
      setData(data?.filter((person) => person._id !== _id)); // Use _id to filter
      toast.success('Item deleted successfully!'); // Success toast after item is deleted
    } catch (err) {
      console.log('Error deleting item:', err);
      toast.error('Failed to delete item.'); // Error toast in case of failure
    }
  };

  const chartData = {
    labels: ['With Occupation', 'Without Occupation'],
    datasets: [
      {
        data: [
          data?.filter((person) => person.occupation).length,
          data?.length - data?.filter((person) => person.occupation).length,
        ],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <Grid container sx={{ padding: '16px' }}>
      <Grid item xs={4}>
        <Paper
          elevation={3}
          sx={{
            backgroundColor: '#f4f4f4',
            height: '55vh',
            borderRadius: 2,
            p: 2,
            pb: 1,
            display: 'flex',
            flexDirection: 'column',
            position: 'sticky',
            top: '16px',
            transition: 'box-shadow 0.3s ease-in-out',
            '&:hover': {
              boxShadow: 6,
            },
          }}
        >
          <Typography variant="h6" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="body2">Total Records: {data?.length}</Typography>
          <Typography variant="body2">
            Occupation Count:{' '}
            {data?.filter((person) => person.occupation).length}
          </Typography>
          <Typography variant="body2">
            No Occupation:{' '}
            {data?.length - data?.filter((person) => person.occupation).length}
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 1,
            }}
          >
            <Pie data={chartData} style={{ maxHeight: '300px' }} />
          </Box>
        </Paper>
      </Grid>

      <Grid
        item
        xs={8}
        sx={{ maxHeight: 'calc(100vh - 32px)', overflowY: 'auto' }}
      >
        {data?.map((person) => (
          <Grid item sm={12} key={person._id} sx={{ mb: 3, ml: 2, mr: 2 }}>
            <Paper
              elevation={3}
              sx={{
                backgroundColor: '#f4f4f4',
                borderRadius: 2,
                p: 2,
                pb: 1,
                display: 'flex',
                flexDirection: 'column',
                transition: 'box-shadow 0.3s ease-in-out',
                '&:hover': {
                  boxShadow: 6,
                },
              }}
            >
              <Grid container xs={12} sx={{ display: 'flex' }}>
                <Grid item xs={10}>
                  <Grid container sx={{ p: 1 }}>
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom>
                        {person.name}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={5}
                      sx={{ borderRight: '2px solid rgba(223, 43, 135, 0.8)' }}
                    >
                      <Typography variant="body2">
                        {person.qualification}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ pl: 1 }}>
                      <Typography variant="body2">
                        {person.occupation}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    p: 0,
                    height: '80px',
                    justifyContent: 'right',
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
              </Grid>

              <Collapse
                in={expanded === person._id}
                timeout="auto"
                unmountOnExit
              >
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={12}>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 500, color: '#333', mb: 1 }}
                    >
                      Date of Birth: {new Date(person.dob).toLocaleDateString()}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 500, color: '#333', mb: 1 }}
                    >
                      Phone: {person.phoneNumber}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 500, color: '#333', mb: 1 }}
                    >
                      Email: {person.email}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 500, color: '#333', mb: 1 }}
                    >
                      Address: {person.address}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 500, color: '#333', mb: 1 }}
                    >
                      Occupation: {person.occupation}
                    </Typography>
                  </Grid>
                </Grid>
              </Collapse>

              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid
                  item
                  xs={6}
                  onClick={() => handleExpandClick(person._id)} // Use _id here
                  sx={{
                    cursor: 'pointer',
                    color:
                      expanded === person._id
                        ? 'secondary.main'
                        : 'primary.main',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    borderTop: '2px solid rgba(223, 43, 135, 0.8)',
                    borderRight: '3px solid  rgba(223, 43, 135, 0.8)',
                  }}
                >
                  {expanded === person._id ? (
                    <>
                      <VisibilityOffIcon sx={{ mr: 1 }} />
                      Hide Details
                    </>
                  ) : (
                    <>
                      <VisibilityIcon sx={{ mr: 1 }} />
                      View Details
                    </>
                  )}
                </Grid>

                <Grid
                  item
                  xs={6}
                  onClick={
                    () =>
                      expanded === person._id
                        ? handleEdit(person._id)
                        : handleDelete(person._id) // Use _id here
                  }
                  sx={{
                    cursor: 'pointer',
                    color:
                      expanded === person._id ? 'success.main' : 'error.main',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    borderTop: '2px solid rgba(223, 43, 135, 0.8)',
                  }}
                >
                  {expanded === person._id ? (
                    <>
                      <EditIcon sx={{ mr: 1 }} />
                      Edit Item
                    </>
                  ) : (
                    <>
                      <DeleteIcon sx={{ mr: 1 }} />
                      Delete Item
                    </>
                  )}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Add ToastContainer to display the toasts */}
      <ToastContainer />
    </Grid>
  );
};

export default View;
