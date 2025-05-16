import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../store/cartSlice";
import { Container, Form, Button, Card } from "react-bootstrap";
import { getAuth } from "firebase/auth";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [instructions, setInstructions] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = getAuth();
const userEmail = auth.currentUser?.email || "Guest";


  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      user: userEmail, 
      address: `${address}, ${city}, ${state}, ${zip}`,
      phone,
      deliveryInstructions: instructions,
      items: cartItems,
      total: totalPrice,
      status: "Pending",
      createdAt: serverTimestamp(),
    };

    await addDoc(collection(db, "orders"), orderData);

    dispatch(clearCart());
    navigate("/order-confirmation");

  };

  return (
    <>
      <Header />


    <Container className="mt-4">
      <h2 className="mb-4">Checkout</h2>
      <Card className="p-4">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Street Address</Form.Label>
            <Form.Control
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>ZIP Code</Form.Label>
            <Form.Control
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Delivery Instructions (optional)</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </Form.Group>

          <h5>Total: ₹{totalPrice.toFixed(2)}</h5>

          <Button type="submit" variant="success" className="mt-3">
            Place Order
          </Button>
        </Form>
      </Card>
    </Container>
     <Footer /> 
        </>
  );
};

export default CheckoutPage;
