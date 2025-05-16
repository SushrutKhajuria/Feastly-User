// src/components/Footer.js
import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-light text-center py-3 mt-5 shadow-sm">
      <Container>
        <small>© {new Date().getFullYear()} Feastly. All rights reserved.</small>
      </Container>
    </footer>
  );
};

export default Footer;
