import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "./../../context/AuthContext";

const ProtectedRoute = ({ isAdminRoute, component: Component, ...rest }) => {
  const { isAdmin, isLoggedIn } = useContext(AuthContext);
  const isAdminStorage = localStorage.getItem("isAdmin");
  const isLoggedInStorage = localStorage.getItem("authToken");

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAdminRoute && (isAdmin || isAdminStorage === "true")) {
          return <Component {...rest} {...props} />;
        } else if (!isAdminRoute && (isLoggedIn || isLoggedInStorage)) {
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
