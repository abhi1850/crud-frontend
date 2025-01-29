import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import InfoIcon from '@mui/icons-material/Info';
import { Grid, Tooltip } from '@mui/material';

const Sidebar = () => {
  const location = useLocation();
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (/^\/form(\/\S+)?$/.test(location.pathname)) {
      setSelected('form');
    } else if (location.pathname === '/view') {
      setSelected('view');
    }
  }, [location]);

  const handleSelect = (icon) => {
    setSelected(icon);
  };

  const getGlowStyle = (icon) => ({
    color: selected === icon ? '#DF2B87' : 'white',
    textShadow: selected === icon ? '0 0 10px rgba(223, 43, 135, 0.8)' : 'none',
    transition: 'all 0.5s ease',
    transform: selected === icon ? 'scale(1.2)' : 'scale(1)',
  });

  return (
    <div className="sidebar">
      <Grid container sx={{ justifyContent: 'center', alignItems: 'center' }}>
        <Grid
          item
          sm={12}
          sx={{
            display: 'flex',
            pt: 1,
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'all 0.5s ease',
            m: 1,
            ...(selected === 'form' && {
              transform: 'scale(1.1)',
            }),
          }}
          onClick={() => handleSelect('form')}
        >
          <Tooltip title="New Form" arrow placement="right">
            <Link to="/form">
              <HistoryEduIcon fontSize="large" sx={getGlowStyle('form')} />
            </Link>
          </Tooltip>
        </Grid>

        <Grid
          item
          sm={12}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'all 0.5s ease',
            m: 1,
            ...(selected === 'view' && {
              transform: 'scale(1.1)',
            }),
          }}
          onClick={() => handleSelect('view')}
        >
          <Tooltip title="View Details" arrow placement="right">
            <Link to="/view">
              <InfoIcon fontSize="large" sx={getGlowStyle('view')} />
            </Link>
          </Tooltip>
        </Grid>
      </Grid>
    </div>
  );
};

export default Sidebar;
