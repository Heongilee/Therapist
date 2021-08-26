import React from "react";
import { useLocation } from "react-router-dom";
import { get } from "lodash";
import { Page404 } from "../pages/ErrorPage/ErrorPage";

export const ErrorHandler = ({ children }) => {
  const location = useLocation();

  switch (get(location.state, "errorStatusCode")) {

    case 404:
      return <Page404 />;


    default:
      return children;
  }
};

