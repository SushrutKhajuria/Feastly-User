// src/components/Header.js
import React, { useState } from "react";
import { Navbar, Nav, Container, Badge, Modal, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQty = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const [showModal, setShowModal] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/dashboard">
            🧁 Feastly
          </Navbar.Brand>
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/cart" className="position-relative">
              <FaShoppingCart size={22} />
              {totalQty > 0 && (
                <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                  {totalQty}
                </Badge>
              )}
            </Nav.Link>

            <Nav.Link onClick={() => setShowModal(true)}>
              <FaUserCircle size={24} />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Your Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Email:</strong> {auth.currentUser?.email}</p>
          {/* Optional: Add name editing logic here */}
          <Button variant="danger" className="mt-3" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Header;
