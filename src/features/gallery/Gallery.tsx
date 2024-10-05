import { Box, Typography } from "@mui/material";

function Gallery() {
  return (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{ textAlign: "center" }}
    >
      <Box
        sx={{
          width: "90%",
          height: "90%",
          position: "relative",
          alignContent: "center",
        }}
      >
        <Typography variant="h2">Gallery?</Typography>
      </Box>
    </Box>
  );
}

export default Gallery;
