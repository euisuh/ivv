import { useState, useRef, useEffect } from "react";
import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import { DateTime } from "luxon";

import background1 from "../../assets/background/1.jpg";
import background2 from "../../assets/background/2.jpg";
import background3 from "../../assets/background/3.jpg";
import background4 from "../../assets/background/4.jpg";
import background5 from "../../assets/background/5.jpg";
import background6 from "../../assets/background/6.jpg";
import background7 from "../../assets/background/7.jpg";
import background8 from "../../assets/background/8.jpg";
import background9 from "../../assets/background/9.jpg";
import background10 from "../../assets/background/10.jpg";

function Landing() {
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 0, left: 0 });
  const [isNoButtonMoved, setIsNoButtonMoved] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isBackgroundChanged, setIsBackgroundChanged] = useState(false);
  const [text, setText] = useState("Do you love me?");
  const [randomBackground, setRandomBackground] = useState<string>("");
  const [numberAttempt, setNumberAttempt] = useState(0);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const noButtonRef = useRef<HTMLButtonElement | null>(null);

  const backgrounds = [
    background1,
    background2,
    background3,
    background4,
    background5,
    background6,
    background7,
    background8,
    background9,
    background10,
  ];

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

  const changeBackgroundAndTextTemporarily = () => {
    setNumberAttempt(numberAttempt + 1);
    setRandomBackground(backgrounds[numberAttempt % backgrounds.length]);
    setIsBackgroundChanged(true);
    setText("Are you sure?");

    setTimeout(() => {
      setIsBackgroundChanged(false);
      setText("Do you love me?");
    }, 1500);
  };

  const handleNoClick = () => {
    changeBackgroundAndTextTemporarily();
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
      width="90vw"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{ textAlign: "center", margin: "auto" }}
    >
      <Box
        ref={contentRef}
        sx={{
          width: "90%",
          height: "90%",
          position: "relative",
          alignContent: "center",
          backgroundImage: `url(${
            isBackgroundChanged ? randomBackground : ""
          })`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: isBackgroundChanged ? "0.6" : "",
        }}
      >
        <Typography variant="h2">{text}</Typography>
        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleYesClick}
            sx={{ display: isBackgroundChanged ? "none" : "" }}
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
              display: isBackgroundChanged ? "none" : "",
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
