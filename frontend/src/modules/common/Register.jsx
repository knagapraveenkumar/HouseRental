import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import { message } from 'antd';

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    type: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data?.name || !data?.email || !data?.password || !data?.type) {
      return alert('Please fill all fields');
    }

    axios.post('http://localhost:8001/api/user/register', data)
      .then((response) => {
        if (response.data.success) {
          message.success(response.data.message);
          navigate('/login');
        } else {
          message.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  return (
    <>
      <Navbar expand="lg" className="bg-white shadow-sm py-3">
        <Container fluid>
          <Navbar.Brand className="text-primary fw-bold fs-3">FindaStay</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto d-flex gap-4 align-items-center">
              <Link className="text-decoration-none text-dark fw-semibold" to="/">Home</Link>
              <Link className="text-decoration-none text-dark fw-semibold" to="/login">Login</Link>
              <Link className="text-decoration-none text-dark fw-semibold" to="/register">Register</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container component="main" maxWidth="xs" className="mt-5 mb-5">
        <Box
          sx={{
            padding: 4,
            maxWidth: 400,
            margin: '0 auto',
            backgroundColor: '#ffffff',
            boxShadow: 3,
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Sign Up
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              value={data.name}
              onChange={handleChange}
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={data.email}
              onChange={handleChange}
              autoComplete="email"
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={data.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="user-type-label">User Type</InputLabel>
              <Select
                labelId="user-type-label"
                id="user-type"
                name="type"
                value={data.type}
                label="User Type"
                onChange={handleChange}
              >
                <MenuItem value=""><em>Select User Type</em></MenuItem>
                <MenuItem value="Renter">Renter</MenuItem>
                <MenuItem value="Owner">Owner</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>

            <Grid container justifyContent="center">
              <Grid item>
                <Typography variant="body2">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary text-decoration-none">
                    Sign In
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Register;
