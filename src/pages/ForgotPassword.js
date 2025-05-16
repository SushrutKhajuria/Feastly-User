import React, { useState } from "react";
import { Form, Button, Container, Alert, Card } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      return setError("Please enter your email address.");
    }

    try {
      setLoading(true);
      await resetPassword(email);
      setMessage("✅ Check your inbox for reset instructions.");
    } catch (err) {
      setError("Reset failed: " + err.message);
    }

    setLoading(false);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh", background: "linear-gradient(to bottom right, #f1fafe, #e0f7fa)" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card className="shadow">
          <Card.Body>
            <h2 className="text-center mb-4">Reset Password</h2>

            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group id="email" className="mb-4">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your account email"
                  required
                />
              </Form.Group>

              <Button disabled={loading} className="w-100" type="submit">
                Send Reset Link
              </Button>
            </Form>
          </Card.Body>
        </Card>

        <div className="text-center mt-3">
          <a href="/login">← Back to Login</a>
        </div>
      </div>
    </Container>
  );
};

export default ForgotPassword;
