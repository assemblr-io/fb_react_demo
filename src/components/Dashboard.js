import React, { useState, useRef } from "react";
import { Card, Button, Alert, Form, Row, Col, ButtonGroup, InputGroup } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const nameRef = useRef();
  const sizeRef = useRef();
  const addyRef = useRef();
  const stateRef = useRef();
  const postcodeRef = useRef();
  const cityRef = useRef();
  const countryRef = useRef();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <>
      <Card style={{ border: "none" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Hi!</h2>
          <Card.Text className="w-75 text-center" style={{ margin: "0 auto" }}>
            Sign up for a 100yrs strong limited edition tee here!
          </Card.Text>
          {/* <strong>Email:</strong> {currentUser.email} */}
        </Card.Body>
      </Card>
      <Card style={{ border: "none" }}>
        <Card.Body>
          <InputGroup.Text id="btnGroupAddon">
            <strong>Email:</strong> {currentUser.email}
          </InputGroup.Text>

          <Form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
            {/* <Row className="mb-3"> */}
            <Form.Group controlId="currentEmail"></Form.Group>

            <Form.Group controlId="name">
              <Form.Control type="text" ref={nameRef} placeholder="Name" required />
            </Form.Group>

            <ButtonGroup className="mb-2 w-100" ref={sizeRef} style={{ marginTop: "10px" }}>
              <Button>XS</Button>
              <Button>S</Button>
              <Button>M</Button>
              <Button>L</Button>
              <Button>XL</Button>
            </ButtonGroup>

            <Form.Group controlId="address">
              <Form.Control type="text" ref={addyRef} placeholder="Street Address" required />
            </Form.Group>
            <Row style={{ marginTop: "10px" }}>
              <Form.Group as={Col} controlId="state">
                <Form.Control type="text" ref={stateRef} placeholder="State" required />
              </Form.Group>
              <Form.Group as={Col} controlId="postcode">
                <Form.Control type="text" ref={postcodeRef} placeholder="Postcode" required />
              </Form.Group>
            </Row>
            <Row style={{ marginTop: "10px", marginBottom: "10px" }}>
              <Form.Group as={Col} controlId="city">
                <Form.Control type="text" ref={cityRef} placeholder="City" required />
              </Form.Group>
              <Form.Group as={Col} controlId="country">
                <Form.Control type="text" ref={countryRef} placeholder="Country" required />
              </Form.Group>
            </Row>

            <Button disabled={loading} className="w-100" type="submit">
              Send me swag!
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
