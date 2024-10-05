import { Navigate } from "react-router-dom";

import Landing from "../features/landing/Landing";
import Error from "./Error";
import Gallery from "../features/gallery/Gallery";

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
      path: "/gallery",
      element: <Gallery />,
      errorElement: <Error />,
    },

    {
      path: "*",
      element: <Error />,
    },
  ];
};

export default getRoutes;
