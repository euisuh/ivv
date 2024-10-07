import { useState, useRef } from "react";
import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import { DateTime } from "luxon";

function Landing() {
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 0, left: 0 });
  const [isNoButtonMoved, setIsNoButtonMoved] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const noButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleYesClick = () => {
    const now = DateTime.now().setZone("America/Montreal");
    const targetDate = DateTime.fromObject(
      { year: 2024, month: 10, day: 24 },
      { zone: "America/Montreal" }
    );

    if (now < targetDate) setOpenSnackbar(true);
    else
      window.open("https://youtu.be/sVTy_wmn5SU?si=ZPVje1O4vDzokBLt", "_blank");
  };

  const handleNoClick = () => {
    const content = contentRef.current;
    const noButton = noButtonRef.current;

    if (content && noButton) {
      const contentRect = content.getBoundingClientRect();
      const noRect = noButton.getBoundingClientRect();

      const newTop = Math.random() * (contentRect.height - noRect.height);
      const newLeft = Math.random() * (contentRect.width - noRect.width);

      setNoButtonPosition({ top: newTop, left: newLeft });
      setIsNoButtonMoved(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

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
        ref={contentRef}
        sx={{
          width: "90%",
          height: "90%",
          position: "relative",
          alignContent: "center",
        }}
      >
        <Typography variant="h2">Do you love me?</Typography>
        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Button variant="contained" color="primary" onClick={handleYesClick}>
            Yes
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleNoClick}
            ref={noButtonRef}
            sx={{
              position: isNoButtonMoved ? "absolute" : "static",
              top: isNoButtonMoved ? noButtonPosition.top : "auto",
              left: isNoButtonMoved ? noButtonPosition.left : "auto",
            }}
          >
            No
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="warning"
          sx={{ width: "100%" }}
        >
          It's a little early! Please wait until after October 24th, 2024.
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Landing;
