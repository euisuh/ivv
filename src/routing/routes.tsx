import { Navigate } from "react-router-dom";

import Landing from "../features/landing/Landing";
import Error from "./Error";

export const getRoutes = () => {
  return [
    {
      path: "/",
      element: <Navigate to="/landing" replace />,
      errorElement: <Error />,
    },
    {
      path: "/landing",
      element: <Landing />,
      errorElement: <Error />,
    },
    {
      path: "*",
      element: <Error />,
    },
  ];
};

export default getRoutes;
