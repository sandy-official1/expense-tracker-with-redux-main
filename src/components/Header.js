import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { useContext } from "react";
import AuthContext from "./AuthContext";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { useSelector } from "react-redux";
import { expenseActions } from "../store/expenses";
import { Button } from "react-bootstrap";
import {saveAs} from "file-saver"

const Header = () => {
  const isPremium = useSelector((state) => state.expenses.showPremium);
  const receivedData = useSelector((state) => state.expenses.receivedData);
  console.log(receivedData)
  const dispatch = useDispatch();
  // const authCtx = useContext(AuthContext);
  const history = useHistory();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);


  const downloadExpenses = () => {
    // Create a CSV string from the received data
    const csv = "Category,Description,Amount\n" + Object.values(receivedData).map(({ category, description, amount }) => `${category},${description},${amount}`).join("\n");
  
    // Create a new blob with the CSV data
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  
    // Save the blob as a file with the name "expenses.csv"
    saveAs(blob, "expenses.csv");
  };

  const showDark =() =>{
    
    localStorage.setItem("twoButtons",true);
    window.location.reload();

  }
  const isPremiumClicked = localStorage.getItem("twoButtons") === "true" ;
  const logout = () => {
    dispatch(authActions.logout());
    localStorage.setItem("twoButtons",false);
    localStorage.removeItem("dark hai ki nahi")

  };
  const changeToDark =()=>{
    dispatch(expenseActions.toggleDark());
  }

  console.log(useSelector(state =>state.expenses.showDark))
  useEffect(() => {
    console.log(`Login hai ki nahi  ${isAuthenticated}`);
  }, []);
  return (
    <Navbar bg="light" expand="sm">
      <Navbar.Brand href="#">My App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-5">
          {!isAuthenticated && (
            <>
              <Nav.Link as={NavLink} activeClassName="active" to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={NavLink} activeClassName="active" to="/signup">
                Signup
              </Nav.Link>
            </>
          )}
          

          {isAuthenticated && (
            <Nav.Link as={NavLink} activeClassName="active" to="/DailyExpense">
              Daily expenses
            </Nav.Link>
          )}

{isAuthenticated && (
            <Nav.Link
              as={NavLink}
              activeClassName="active"
              to="/login"
              onClick={logout}
            >
              Logout
            </Nav.Link>
          )}

{isAuthenticated && isPremium && !isPremiumClicked &&  (
            <Nav.Link
              as={NavLink}
              activeClassName="active"
              to="/DailyExpense"
              onClick={showDark}
            >
              Activate Premium
            </Nav.Link>
          )}

{isAuthenticated && isPremium && isPremiumClicked &&  (
            <Nav.Link
              as={NavLink}
              activeClassName="active"
              to="/DailyExpense"
              onClick={changeToDark}
            >
              Toggle dark/light theme
            </Nav.Link>
          )}

{isAuthenticated && isPremium && isPremiumClicked && (
  <Button variant="primary" onClick={downloadExpenses}>
    Download Expenses
  </Button>
)}

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
