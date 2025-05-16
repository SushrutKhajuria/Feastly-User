import React, { useState } from "react";
import { Form, Button, Container, Alert, Card } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      return setError("Please enter both email and password.");
    }

    try {
      setLoading(true);
      await loginUser(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed: " + err.message);
    }

    setLoading(false);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh", background: "linear-gradient(to bottom right, #e0f7fa, #f1fafe)" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card className="shadow">
          <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </Form.Group>

              <Button disabled={loading} type="submit" className="w-100">
                Log In
              </Button>
            </Form>
          </Card.Body>
        </Card>

        <div className="text-center mt-3">
          <a href="/forgot-password">Forgot Password?</a>
        </div>
        <div className="text-center mt-2">
          Don’t have an account? <a href="/signup">Sign Up</a>
        </div>
      </div>
    </Container>
  );
};

export default Login;
