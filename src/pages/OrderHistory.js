// src/pages/OrderHistory.js
import React, { useEffect, useState } from "react";
import { Container, Card, ListGroup, Spinner } from "react-bootstrap";
import { getAuth } from "firebase/auth";
import { db } from "../firebase/firebaseConfig";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import Header from "../components/Header";
import Footer from "../components/Footer";


const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser) return;

      const q = query(
        collection(db, "orders"),
        where("user", "==", currentUser.email),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setOrders(data);
      setLoading(false);
    };

    fetchOrders();
  }, [currentUser]);

  return (
    <>
      <Header />

    <Container className="mt-4">
      <h2>Your Order History</h2>
      {loading ? (
        <Spinner animation="border" />
      ) : orders.length === 0 ? (
        <p>You haven’t placed any orders yet.</p>
      ) : (
        orders.map((order) => (
          <Card key={order.id} className="mb-4 shadow-sm">
            <Card.Body>
              <h5>Order ID: {order.id}</h5>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Total:</strong> ₹{order.total}</p>
              <p><strong>Delivery Address:</strong> {order.address}</p>
              <ListGroup className="mt-3">
                {order.items.map((item, idx) => (
                  <ListGroup.Item key={idx}>
                    {item.name} × {item.qty} — ₹{item.price}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
     <Footer /> 
        </>

  );
};

export default OrderHistory;
