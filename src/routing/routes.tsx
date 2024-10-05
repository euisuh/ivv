import { Navigate, Outlet } from "react-router-dom";

import Landing from "../features/landing/Landing";
import Error from "./Error";
import Gallery from "../features/gallery/Gallery";

export const getRoutes = () => {
  return [
    {
      path: "/ivv",
      element: <Outlet />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Navigate to="landing" replace />,
        },
        {
          path: "landing",
          element: <Landing />,
          errorElement: <Error />,
        },
        {
          path: "gallery",
          element: <Gallery />,
          errorElement: <Error />,
        },
        {
          path: "*",
          element: <Error />,
        },
      ],
    },
  ];
};

export default getRoutes;
