import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} from "../store/cartSlice";
import { Container, Row, Col, Button, Card, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{item.name}</strong> <br />
                    ₹{item.price} × {item.qty}
                  </div>

                  <div>
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() => dispatch(decreaseQty(item.id))}
                    >
                      −
                    </Button>{" "}
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() => dispatch(increaseQty(item.id))}
                    >
                      +
                    </Button>{" "}
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>

          <Col md={4}>
            <Card>
              <Card.Body>
                <h5>Total: ₹{totalPrice.toFixed(2)}</h5>
               <Button
                 variant="success"
                 className="w-100 mt-2"
                 onClick={() => navigate("/checkout")}
                >
                 Proceed to Checkout
                </Button>

                <Button
                  variant="outline-danger"
                  className="w-100 mt-2"
                  onClick={() => dispatch(clearCart())}
                >
                  Clear Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CartPage;
