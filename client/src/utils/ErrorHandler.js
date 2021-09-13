import React from "react";
import { useLocation } from "react-router-dom";
import { get } from "lodash";
import { Page403, Page404, Page405, Page500 } from "../pages/ErrorPage/ErrorPage";

export const ErrorHandler = ({ children }) => {
  
  const location = useLocation();


  switch (get(location.state, "errorStatusCode")) {
    
    case 403:
      return <Page403 />;
    
    case 404:
      return <Page404 />;
  
    case 405:
      return <Page405 />;

    case 500:
      return <Page500 />;
    
    default:
      return children;
  }
};

