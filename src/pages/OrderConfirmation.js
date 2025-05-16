// src/pages/OrderConfirmation.js
import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const OrderConfirmation = () => {
  return (
    <Container className="mt-4 text-center">
      <Card className="p-5 shadow-sm">
        <h2>🎉 Thank You!</h2>
        <p>Your order has been placed successfully.</p>
        <p>We’ll notify you when it’s out for delivery.</p>
        <Link to="/dashboard">
          <Button variant="success" className="mt-3">Go to Dashboard</Button>
        </Link>
      </Card>
    </Container>
  );
};

export default OrderConfirmation;
