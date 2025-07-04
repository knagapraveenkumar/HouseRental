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
import axios from 'axios';
import { message } from 'antd';

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    type: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data?.email || !data?.password) {
      return alert('Please fill all fields');
    } else {
      axios
        .post('http://localhost:8001/api/user/login', data)
        .then((res) => {
          if (res.data.success) {
            message.success(res.data.message);

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            const isLoggedIn = JSON.parse(localStorage.getItem('user'));

            switch (isLoggedIn.type) {
              case 'Admin':
                navigate('/adminhome');
                break;
              case 'Renter':
                navigate('/renterhome');
                break;
              case 'Owner':
                if (isLoggedIn.granted === 'ungranted') {
                  message.error('Your account is not yet confirmed by the admin');
                } else {
                  navigate('/ownerhome');
                }
                break;
              default:
                navigate('/login');
                break;
            }
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            message.error(res.data.message);
          }
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            alert("User doesn't exist");
          }
          navigate('/login');
        });
    }
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
            Sign In
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={data.email}
              onChange={handleChange}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              value={data.password}
              onChange={handleChange}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, mb: 2 }}
            >
              Login
            </Button>

            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">
                  Forgot password?{' '}
                  <Link to="/forgotpassword" className="text-danger text-decoration-none">
                    Click here
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">
                  No account?{' '}
                  <Link to="/register" className="text-primary text-decoration-none">
                    Sign Up
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

export default Login;
