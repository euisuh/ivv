import Landing from "../features/landing/Landing";
import Error from "./Error";

export const getRoutes = () => {
  return [
    {
      path: "/ivv",
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
