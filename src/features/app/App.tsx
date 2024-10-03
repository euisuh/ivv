import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import getRoutes from "../../routing/routes";

export const App = () => {
  const router = createBrowserRouter(getRoutes());

  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
