import logo from './logo.svg';
import './App.scss';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { Route, Switch, Router, Redirect, useHistory } from "react-router-dom";
import { Main } from './lib/style/generalStyles';
import Login from './pages/Login/Login';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Buyer from './pages/Buyer/Buyer';
import Item from './pages/Item/Item';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const App = () => {

  const { setIsLoggedIn, setIsAdmin, isAdmin, isLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("authToken") ? true : false);
    setIsAdmin(JSON.parse(localStorage.getItem("isAdmin")));
    if (localStorage.getItem("authToken") === null) setIsLoggedIn(false);
    if (!isLoggedIn) history.push("/login");
    }, [isLoggedIn, isAdmin]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("isAdmin");
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <>
    <Header
      isLoggedIn={isLoggedIn}
      onLogout={handleLogout}
      isAdmin={isAdmin}
    />  
    <Main>
    <Router history={history}>
              <Switch>
                {isLoggedIn ? (
                  <>
                    <ProtectedRoute exact path="/" component={Buyer} />
                    <ProtectedRoute path="/items" component={Item} />
                    {/*<ProtectedRoute
                      isAdminRoute={true}
                      path="/users"
                      component={Admin}
                /> */}
                  </>
                ) : (
                  <>
                    <Route path="/login" component={Login} />
                    <Redirect from="*" to="/login" />
                  </>
                )}
              </Switch>
            </Router>
    </Main>
    </>

  );
}

export default App;
