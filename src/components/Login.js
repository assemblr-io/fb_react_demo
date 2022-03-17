import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <>
      <Card style={{ border: "none" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}

// If i had to manually hash and salt the pwd with bcrypt - here is what it would look like & also protect against SQL injection attacks
const bcrypt = require("bcrypt");
const db = require("psql");
//set salting rounds
const saltRounds = 10;
var username = "buckRogers";
var password = "I_l1k3candy";
var values = [username]; // query values

// query statement to store hash
var storeSQL = "UPDATE user_table SET password = $1 WHERE username = $2";
let lookupSQL = "select password from user_table where username = $1";

//salt and encrypt and post
bcrypt.hash(password, saltRounds, function (err, hash) {
  let values = [hash, username]; // query values
  // store hash in database
  db.query(storeSQL, values, function (err, res) {
    if (err) throw err;
    else {
      console.log("stored!");
    }
  });
});

// query database for user's password and compare
db.query(statement, values, function (err, res) {
  if (err) throw err;
  else {
    var hash = res.rows[0].password;
    // compare hash and password
    bcrypt.compare(password, hash, function (err, result) {
      // execute code to test for access and login
      hasAccess(result);
    });
  }
});

// function to log in
function hasAccess(result) {
  if (result) {
    // insert login code here
    console.log("Access Granted!");
  } else {
    // insert access denied code here
    console.log("Access Denied!");
  }
}
