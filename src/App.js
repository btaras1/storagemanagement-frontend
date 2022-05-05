import logo from './logo.svg';
import './App.scss';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { Route, Switch, Router, Redirect, useHistory } from "react-router-dom";
import { Main } from './lib/style/generalStyles';
import Login from './pages/Login/Login';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Buyer from './pages/Buyer/Buyers';
import Item from './pages/Item/Item';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Sale from './pages/Sale/Sale';
import Receipt from './pages/Receipts/Receipts';
import Buyers from './pages/Buyer/Buyers';
import UserManagement from './pages/UserManagement/UserManagement';
import Home from './pages/Home/Home';
import Procurement from './pages/Procurement/Procurement';

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
                  <ProtectedRoute exact path="/" component={Home} />
                  <ProtectedRoute path="/procurement" component={Procurement} />
                    <ProtectedRoute path="/buyers" component={Buyers} />
                    <ProtectedRoute path="/items" component={Item} />
                    <ProtectedRoute path="/sales" component={Sale} />
                    <ProtectedRoute path="/receipts" component={Receipt} />
                    <ProtectedRoute path="/management" component={UserManagement} />
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
