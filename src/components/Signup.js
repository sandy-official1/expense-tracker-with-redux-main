import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      alert("Password and confirm password must match");
    } else {
      console.log("succes!!");
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD0lprqP2RlA9OT__6wdnD_E2VZb9GlRFo",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (res.ok) {
          console.log("senAccount created succesfullly");
          alert("Account created succesful");
        } else {
          return res.json().then((data) => {
            // console.log(data);
            let errorMessage = "Authrntication filed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            alert(errorMessage);
          });
        }
      });
    }
  };

  return (
    <div className="container">
      <Form onSubmit={handleSubmit} className="container mt-3">
        <h1 className="text-center">Signup</h1>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" ref={emailRef} required />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" ref={passwordRef} required />
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" ref={confirmPasswordRef} required />
        </Form.Group>

        <div className="text-center">
          <Button type="submit" className="mt-2">
            Sign up
          </Button>
        </div>
      </Form>

      <p className="text-center">
        Already an account <Link to="/login">Sign In </Link>
      </p>
    </div>
  );
};

export default Signup;
