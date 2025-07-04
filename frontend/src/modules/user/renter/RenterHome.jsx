import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';
import { UserContext } from '../../../App';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AllPropertiesCards from '../AllPropertiesCards';
import AllProperty from './AllProperties';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, backgroundColor: '#f0f2f5', borderRadius: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const RenterHome = () => {
  const user = useContext(UserContext);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => setValue(newValue);

  if (!user) return null;

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <Navbar expand="lg" className="bg-white shadow-sm">
        <Container fluid>
          <Navbar.Brand className="text-primary fw-bold fs-3">NestLink</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto align-items-center">
              <span className="me-4 text-secondary fw-semibold">Hi, {user.userData.name}</span>
              <Link to="/" onClick={handleLogOut} className="btn btn-outline-primary btn-sm">
                Log Out
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="property tabs"
              textColor="primary"
              indicatorColor="primary"
              variant="fullWidth"
              sx={{ backgroundColor: '#fff', borderRadius: 1 }}
            >
              <Tab label="All Properties" {...a11yProps(0)} />
              <Tab label="Booking History" {...a11yProps(1)} />
            </Tabs>
          </Box>

          <CustomTabPanel value={value} index={0}>
            <AllPropertiesCards loggedIn={user.userLoggedIn} />
          </CustomTabPanel>

          <CustomTabPanel value={value} index={1}>
            <AllProperty />
          </CustomTabPanel>
        </Box>
      </Container>
    </div>
  );
};

export default RenterHome;
