import { useState, useRef } from "react";
import { Box, Button, Typography } from "@mui/material";

function App() {
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 0, left: 0 });
  const [isNoButtonMoved, setIsNoButtonMoved] = useState(false);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const noButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleYesClick = () => {
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
            // Removed position: "relative" from here
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
    </Box>
  );
}

export default App;
