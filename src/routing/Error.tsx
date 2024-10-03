import { Box, Typography } from "@mui/material";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import Logo from "../features/shared/Logo/Logo";

export const Error = () => {
  const error = useRouteError();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Logo width="300px" />
      <Typography p={2} variant="h6">
        Sorry, an unexpected error has occurred.
      </Typography>

      {isRouteErrorResponse(error) ? (
        <Typography color="text.secondary">
          <i>
            {error.status} {error.statusText}
          </i>
        </Typography>
      ) : error instanceof Error ? (
        <Typography color="text.secondary">
          <i>{error.message}</i>
        </Typography>
      ) : (
        <Typography color="text.secondary">
          <i>An unknown error occurred.</i>
        </Typography>
      )}
    </Box>
  );
};

export default Error;
