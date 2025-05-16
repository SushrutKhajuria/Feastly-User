// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";
import { getCategories } from "../services/categoryService";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";


const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories from Firestore
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCategories();
      setCategories(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />

    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-center m-0">Browse Categories</h2>
        <Button as={Link} to="/order-history" variant="outline-primary">
          View Order History
        </Button>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row>
          {categories.map((cat) => (
            <Col key={cat.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Link
                to={`/category/${cat.name}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={
                      cat.imageUrl ||
                      "https://via.placeholder.com/300x200.png?text=No+Image"
                    }
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title className="text-center">{cat.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </Container>
     <Footer /> 
    </>
  );
};

export default Dashboard;
