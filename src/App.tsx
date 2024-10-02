import React, { useState, useRef } from "react";
import { Button, Typography, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function App() {
  const [showVideo, setShowVideo] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 0, left: 0 });
  const [isNoButtonMoved, setIsNoButtonMoved] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const yesButtonRef = useRef<HTMLButtonElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const handleYesClick = () => {
    setShowVideo(true);
  };

  const handleNoClick = () => {
    const container = containerRef.current;
    const yesButton = yesButtonRef.current;
    const noButton = noButtonRef.current;

    if (container && yesButton && noButton) {
      const containerRect = container.getBoundingClientRect();
      const yesRect = yesButton.getBoundingClientRect();
      const noRect = noButton.getBoundingClientRect();

      let newTop: number;
      let newLeft: number;
      let isOverlapping = true;
      let attempts = 0;

      while (isOverlapping && attempts < 100) {
        attempts++;

        // Random positions within the container bounds
        newTop = Math.random() * (containerRect.height - noRect.height);
        newLeft = Math.random() * (containerRect.width - noRect.width);

        // Adjusted positions relative to container
        const noButtonRect = {
          top: newTop,
          bottom: newTop + noRect.height,
          left: newLeft,
          right: newLeft + noRect.width,
        };

        const yesButtonRect = {
          top: yesRect.top - containerRect.top,
          bottom: yesRect.bottom - containerRect.top,
          left: yesRect.left - containerRect.left,
          right: yesRect.right - containerRect.left,
        };

        // Check for overlap
        isOverlapping = !(
          noButtonRect.right < yesButtonRect.left ||
          noButtonRect.left > yesButtonRect.right ||
          noButtonRect.bottom < yesButtonRect.top ||
          noButtonRect.top > yesButtonRect.bottom
        );
      }

      if (attempts < 100) {
        setNoButtonPosition({ top: newTop, left: newLeft });
        setIsNoButtonMoved(true);
      }
    }
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        textAlign: "center",
      }}
    >
      {!showVideo ? (
        <>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
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
                position: "relative",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleYesClick}
                ref={yesButtonRef}
              >
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
                  transform: isNoButtonMoved ? "none" : "none",
                }}
              >
                No
              </Button>
            </Box>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            width: "80%",
            height: "80%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "black",
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "white",
              zIndex: 1,
            }}
            onClick={handleCloseVideo}
          >
            <CloseIcon />
          </IconButton>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
            title="Never Gonna Give You Up"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </Box>
      )}
    </Box>
  );
}

export default App;
