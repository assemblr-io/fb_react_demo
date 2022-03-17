import React, { useState, useRef } from "react";
import { Card, Button, Alert, Form, Row, Col, ButtonGroup, InputGroup } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

export default function Dashboard() {
  const [error, setError] = useState("");
  const [size, setSize] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState({});
  const orderCollectionRef = collection(db, "customerOrders");

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  const handleSizeClick = (e) => {
    setSize(e.target.value);
  };

  const createOrder = () => {
    const fb_data = { email: currentUser.email, ...order };
    const mule_data = { OrderTshirt: { fb_data } };

    addDoc(orderCollectionRef, fb_data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    getDocs(orderCollectionRef).then((res) => console.log(res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))));
    // try {
    //   setError("");
    //   setLoading(true);

    //   const response = history.push("/");
    // } catch {
    //   setError("Failed to place order");
    // }

    // setLoading(false);
  };

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
            <Form.Group controlId="name">
              <Form.Control type="text" placeholder="Name" onChange={(event) => setOrder({ ...order, name: event.target.value })} required />
            </Form.Group>
            <ButtonGroup className="mb-2 w-100" style={{ marginTop: "10px" }} onClick={(event) => setOrder({ ...order, size: event.target.value })} required>
              <Button value="XS">XS</Button>
              <Button value="S">S</Button>
              <Button value="M">M</Button>
              <Button value="L">L</Button>
              <Button value="XL">XL</Button>
            </ButtonGroup>

            <Form.Group controlId="address">
              <Form.Control type="text" placeholder="Street Address" onChange={(event) => setOrder({ ...order, address1: event.target.value })} required />
            </Form.Group>
            <Row style={{ marginTop: "10px" }}>
              <Form.Group as={Col} controlId="state">
                <Form.Control type="text" placeholder="State" onChange={(event) => setOrder({ ...order, stateOrProvince: event.target.value })} required />
              </Form.Group>
              <Form.Group as={Col} controlId="postcode">
                <Form.Control type="text" placeholder="Postcode" onChange={(event) => setOrder({ ...order, postalCode: event.target.value })} required />
              </Form.Group>
            </Row>
            <Row style={{ marginTop: "10px", marginBottom: "10px" }}>
              <Form.Group as={Col} controlId="city">
                <Form.Control type="text" placeholder="City" onChange={(event) => setOrder({ ...order, city: event.target.value })} required />
              </Form.Group>
              <Form.Group as={Col} controlId="country">
                <Form.Control type="text" onChange={(event) => setOrder({ ...order, country: event.target.value })} placeholder="Country" required />
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
