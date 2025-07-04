import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav, Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import p1 from '../../images/p1.jpg';
import p2 from '../../images/p2.jpg';
import p3 from '../../images/p3.jpg';
import p4 from '../../images/p4.jpg';
import AllPropertiesCards from '../user/AllPropertiesCards';

const Home = () => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => setIndex(selectedIndex);

  return (
    <>
      <Navbar expand="lg" className="bg-white shadow-sm py-3">
        <Container fluid>
          <Navbar.Brand className="fw-bold fs-3 text-primary">FindaStay</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto d-flex gap-3 align-items-center">
              <Link to="/" className="text-decoration-none text-dark fw-semibold">Home</Link>
              <Link to="/login" className="text-decoration-none text-dark fw-semibold">Login</Link>
              <Link to="/register" className="text-decoration-none text-dark fw-semibold">Register</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="home-body">
        <Carousel activeIndex={index} onSelect={handleSelect} fade interval={3000}>
          <Carousel.Item>
            <img className="d-block w-100 rounded" src={p1} alt="Modern villa with lawn" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100 rounded" src={p2} alt="Apartment building with glass windows" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100 rounded" src={p3} alt="Interior view of luxury apartment" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100 rounded" src={p4} alt="3BHK furnished flat with balcony" />
          </Carousel.Item>
        </Carousel>
      </div>

      <div className="property-content bg-light py-5">
        <Container>
          <div className="text-center mb-4">
            <h1 className="fw-bold mb-3">All Properties You May Be Looking For</h1>
            <p className="fw-semibold">
              Want to post your Property?{' '}
              <Link to="/register">
                <Button variant="outline-info" size="sm">Register as Owner</Button>
              </Link>
            </p>
          </div>

          <AllPropertiesCards />
        </Container>
      </div>
    </>
  );
};

export default Home;
