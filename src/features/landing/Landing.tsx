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

  const noMessages = [
    "Oops! I think you clicked the wrong button! 😆",
    "Wait, did I hear that right? 😳",
    "Nooo, say it isn’t so! 🥺",
    "Oh no, I feel a little heartbroken! Are you really sure? 🥹",
    "You must be teasing me... right? 😘",
    "Uh-oh! Seems like someone is lying. 🤨",
    "Oh, come on! You don’t mean that... do you? 🥺",
    "Aww, are you sure? My heart says otherwise! 🥰",
    "That can’t be true! I'm sensing some serious love vibes here! 💘",
  ];

  useEffect(() => {
    backgrounds.forEach((bg) => {
      const img = new Image();
      img.src = bg;
    });
  }, []);

  const handleYesClick = () => {
    const now = DateTime.now().setZone("America/Montreal");
    const targetDate = DateTime.fromObject(
      { year: 2024, month: 10, day: 24 },
      { zone: "America/Montreal" }
    );

    if (now < targetDate) setOpenSnackbar(true);
    else
      window.open(
        "https://www.youtube.com/watch?v=zPJHWmrBUIg&list=PLyEYrirr82njPWseqP3uMrF9t56VsJG0E",
        "_blank"
      );
  };

  const changeBackgroundAndTextTemporarily = () => {
    setNumberAttempt(numberAttempt + 1);
    setRandomBackground(backgrounds[numberAttempt % backgrounds.length]);
    setIsBackgroundChanged(true);
    setText(noMessages[numberAttempt % noMessages.length]);

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

  return (
    <Box
      height="100vh"
      width="100vw"
      position="relative"
      sx={{ margin: "auto" }}
    >
      {isBackgroundChanged && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${randomBackground})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.6,
            zIndex: 1,
          }}
        />
      )}
      <Box
        ref={contentRef}
        sx={{
          width: "100%",
          height: "100%",
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h2" sx={{ color: "black" }}>
          {text}
        </Typography>
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
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
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
