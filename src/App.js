import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Completeprofile from "./components/Completeprofile";
import AuthContext from "./components/AuthContext";
import { useContext } from "react";
import Home from "./components/Home";
import Verify from "./components/Verify";
import DailyExpense from "./components/DailyExpense";
// import { useDispatch } from "react-redux";
// import { authActions } from "../store/auth";
import { useSelector } from "react-redux";
function App() {
  // const isAuthenticated = localStorage.getItem("isLoggedIn");

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // const authCtx = useContext(AuthContext);
  return (
    <div className="App">
      <Header />
      <Route exact path="/">
        <Signup /> {/* Show signup page initially */}
      </Route>

      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/verify-email">
          <Verify />
        </Route>

        <Route path="/DailyExpense">
          {isAuthenticated && <DailyExpense />}
          {!isAuthenticated && <Redirect to="/home" />}
        </Route>

        <Route path="/complete-profile">
          {isAuthenticated && <Completeprofile />}
          {!isAuthenticated && <Redirect to="/home" />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
