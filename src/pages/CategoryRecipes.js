// src/pages/CategoryRecipes.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";
import { getRecipes } from "../services/recipeService";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

const CategoryRecipes = () => {
  const { categoryName } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const allRecipes = await getRecipes();
      const filtered = allRecipes.filter(rec => rec.category === categoryName);
      setRecipes(filtered);
      setLoading(false);
    };

    fetchData();
  }, [categoryName]);

  const handleAddToCart = (recipe) => {
    dispatch(
      addToCart({
        id: recipe.id,
        name: recipe.name,
        price: recipe.price,
        imageUrl: recipe.imageUrl || "https://via.placeholder.com/300x200",
      })
    );
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">{categoryName} Recipes</h2>

      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      ) : recipes.length === 0 ? (
        <p>No recipes found in this category.</p>
      ) : (
        <Row>
          {recipes.map((rec) => (
            <Col key={rec.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={rec.imageUrl || "https://via.placeholder.com/300x200?text=No+Image"}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{rec.name}</Card.Title>
                  <Card.Text>
                    {rec.ingredients}
                    <br />
                    <strong>₹{rec.price}</strong>
                  </Card.Text>
                  <Button
                    variant="primary"
                    className="w-100"
                    onClick={() => handleAddToCart(rec)}
                  >
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default CategoryRecipes;
