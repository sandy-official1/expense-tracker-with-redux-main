import React from "react";
import AuthContext from "./AuthContext";
import { useContext } from "react";
import { useSelector } from "react-redux";

const Verify = () => {
  // const authCtx = useContext(AuthContext);
  const token = useSelector((state) => state.auth.token);
  console.log(token);

  const verifyEmail = () => {
    {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD0lprqP2RlA9OT__6wdnD_E2VZb9GlRFo",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            console.log("Verified succesfull succesfullly");
            console.log(res);
            return res.json();
          } else {
            return res.json().then((data) => {
              console.log(data);
              let errorMessage = "Authrntication filed!";
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };
  return (
    <div>
      <button onClick={verifyEmail}>Verify Email ID</button>
    </div>
  );
};

export default Verify;
