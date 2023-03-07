import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";

const CompleteProfile = () => {
  const [fullName, setFullName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const handleFullNameChange = (event) => {
    setFullName((prevFullName) => event.target.value || prevFullName);
  };

  const handlePhotoUrlChange = (event) => {
    setPhotoUrl((prevPhotoUrl) => event.target.value || prevPhotoUrl);
  };

  useEffect(() => {
    {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyD0lprqP2RlA9OT__6wdnD_E2VZb9GlRFo",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: localStorage.getItem("token2"),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            console.log("Received the users details from the server");
            // alert("Login succesful");
            console.log(res);
            return res.json();
          } else {
            return res.json().then((data) => {
              console.log(data);
              let errorMessage = "Updation failed filed!";
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          console.log(data.users[0].displayName);
          console.log(data.users[0].photoUrl);
          setFullName(data.users[0].displayName);
          setPhotoUrl(data.users[0].photoUrl);
          // console.log(data.displayName);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  }, []);

  const handleUpdate = () => {
    // Call Firebase API to update user details
    console.log(fullName);
    console.log(photoUrl);
    if (fullName === "" || photoUrl === "") {
      alert("please enter both full name and URL");
      return;
    } else {
      {
        fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD0lprqP2RlA9OT__6wdnD_E2VZb9GlRFo",
          {
            method: "POST",
            body: JSON.stringify({
              idToken: localStorage.getItem("token"),
              displayName: fullName,
              photoUrl: photoUrl,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => {
            if (res.ok) {
              console.log("Sent succesful");
              // alert("Login succesful");
              console.log(res);
              return res.json();
            } else {
              return res.json().then((data) => {
                console.log(data);
                let errorMessage = "Updation failed filed!";
                if (data && data.error && data.error.message) {
                  errorMessage = data.error.message;
                }
                throw new Error(errorMessage);
              });
            }
          })
          .then((data) => {
            console.log(data.providerUserInfo);
          })
          .catch((err) => {
            alert(err.message);
          });
      }
    }
  };

  return (
    <Form className="container mt-2">
      <h2 className="text-center">Update profile</h2>
      <Form.Group controlId="formFullName">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          value={fullName}
          onChange={handleFullNameChange}
        />
      </Form.Group>
      <Form.Group controlId="formPhotoUrl">
        <Form.Label>Profile Photo URL</Form.Label>
        <Form.Control
          type="text"
          value={photoUrl}
          onChange={handlePhotoUrlChange}
        />
      </Form.Group>
      <div className="text-center">
        <Button variant="primary" onClick={handleUpdate} className="mt-2">
          Update
        </Button>
      </div>
    </Form>
  );
};

export default CompleteProfile;
