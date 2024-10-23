import { useState, useRef, useEffect, useMemo } from "react";
import {
  Alert,
  Box,
  Button,
  Snackbar,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";
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

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function Landing() {
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 0, left: 0 });
  const [isNoButtonMoved, setIsNoButtonMoved] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isBackgroundChanged, setIsBackgroundChanged] = useState(false);
  const [text, setText] = useState("Do you love me?");
  const [randomBackground, setRandomBackground] = useState<string>("");
  const [numberAttempt, setNumberAttempt] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState("");
  const [timeRemainingBool, setTimeRemainingBool] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(false);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const noButtonRef = useRef<HTMLButtonElement | null>(null);

  const backgrounds = useMemo(
    () => [
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
    ],
    []
  );

  const shuffledBackgrounds = shuffleArray(backgrounds);

  useEffect(() => {
    shuffledBackgrounds.forEach((bg) => {
      const img = new Image();
      img.src = bg;
    });
  }, [shuffledBackgrounds]);

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

  const targetDate = useMemo(
    () =>
      DateTime.fromObject(
        { year: 2024, month: 10, day: 24, hour: 0, minute: 0, second: 0 },
        { zone: "America/Montreal" }
      ),
    []
  );

  useEffect(() => {
    const updateTimer = () => {
      const now = DateTime.now().setZone("America/Montreal");
      const diff = targetDate.diff(now, "seconds");
      if (diff.seconds > 0) {
        const totalSeconds = Math.floor(diff.as("seconds"));

        const days = Math.floor(totalSeconds / (24 * 3600));
        const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        let timeRemaining = "";

        if (days > 0) timeRemaining += `${String(days).padStart(2, "0")}d `;
        if (hours > 0) timeRemaining += `${String(hours).padStart(2, "0")}h `;
        if (minutes > 0)
          timeRemaining += `${String(minutes).padStart(2, "0")}m `;

        timeRemaining += `${String(seconds).padStart(2, "0")}s`;
        setTimeRemaining(timeRemaining.trim());
      } else {
        setTimeRemaining("The time has arrived!");
        setTimeRemainingBool(false);
      }
    };

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);

    return () => clearInterval(timerInterval);
  }, [targetDate]);

  const handleYesClick = () => {
    const now = DateTime.now().setZone("America/Montreal");
    if (now < targetDate) setOpenSnackbar(true);
    else
      window.open(
        "https://www.youtube.com/watch?v=zPJHWmrBUIg&list=PLyEYrirr82njPWseqP3uMrF9t56VsJG0E",
        "_blank"
      );
  };

  const changeBackgroundAndTextTemporarily = () => {
    setNumberAttempt((prev) => prev + 1);
    setRandomBackground(
      shuffledBackgrounds[numberAttempt % shuffledBackgrounds.length]
    );
    setIsBackgroundChanged(true);
    setText(noMessages[numberAttempt % noMessages.length]);

    const timer = setTimeout(() => {
      setIsBackgroundChanged(false);
      setText("Do you love me?");
    }, 1500);

    return () => clearTimeout(timer);
  };

  const handleNoClick = () => {
    changeBackgroundAndTextTemporarily();

    if (contentRef.current && noButtonRef.current) {
      const { height: contentHeight, width: contentWidth } =
        contentRef.current.getBoundingClientRect();
      const { height: noHeight, width: noWidth } =
        noButtonRef.current.getBoundingClientRect();

      setNoButtonPosition({
        top: Math.random() * (contentHeight - noHeight),
        left: Math.random() * (contentWidth - noWidth),
      });
      setIsNoButtonMoved(true);
    }
  };

  const handleLinkClick = () => {
    setIsDialogOpen(true);
    setCorrectAnswer(false);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setShowMessage(false);
    setCorrectAnswer(false);
    setAnswer("");
  };

  const handleAnswerSubmit = () => {
    const sanitizedAnswer = answer.trim().toLowerCase();
    if (sanitizedAnswer === "guagua") {
      setShowMessage(true);
      setCorrectAnswer(true);
    } else {
      setShowMessage(true);
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
        {timeRemainingBool ? (
          <Typography variant="inherit" color="textSecondary">
            {timeRemaining}
          </Typography>
        ) : (
          <Button
            variant="outlined"
            size="small"
            color="success"
            onClick={handleLinkClick}
          >
            Yay
          </Button>
        )}
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
            sx={{
              display: isBackgroundChanged ? "none" : "block",
              backgroundImage: isBackgroundChanged
                ? `url(${randomBackground})`
                : "none",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            Yes
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={handleNoClick}
            ref={noButtonRef}
            sx={{
              position: isNoButtonMoved ? "absolute" : "static",
              top: noButtonPosition.top,
              left: noButtonPosition.left,
              display: isBackgroundChanged ? "none" : "block",
            }}
          >
            No
          </Button>
        </Box>
      </Box>

      <Dialog
        open={isDialogOpen}
        fullWidth
        maxWidth="md"
        aria-modal="false"
        onClose={handleDialogClose}
      >
        <Box sx={{ px: 4, py: 4 }}>
          <DialogTitle
            sx={{ p: 0, mb: 2, fontSize: { xs: "22px", sm: "26px" } }}
          >
            Unlock the secret only Ivy can crack! 🔐🌟
          </DialogTitle>
          <DialogContent sx={{ p: 0, mb: 2 }}>
            {!showMessage ? (
              <>
                <DialogContentText sx={{ p: 0, mb: 2 }}>
                  Fill in the following content: Anthia ••• Ethan •••
                </DialogContentText>
                <TextField
                  autoFocus
                  label="Your Answer"
                  fullWidth
                  size="small"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  sx={{}}
                />
              </>
            ) : correctAnswer ? (
              <DialogContentText
                sx={{ p: 0, mb: 2, fontSize: { xs: "14px", sm: "18px" } }}
              >
                Ivy, I know you've been having a tough time, and I believe in
                you. 💖 Here's a little treat to keep you going—a Starbucks
                coffee on me! ☕ Use this gift card to recharge and relax:{" "}
                <strong>6321466029656071 / 49978337</strong>. You've got this!
                🌟
              </DialogContentText>
            ) : (
              <DialogContentText sx={{ p: 0, mb: 2 }}>
                This is not Ivy. Only Ivy can resolve this.
              </DialogContentText>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 0 }}>
            {!showMessage ? (
              <>
                <Button onClick={handleDialogClose}>Cancel</Button>
                <Button onClick={handleAnswerSubmit}>Submit</Button>
              </>
            ) : (
              <Button onClick={handleDialogClose}>Close</Button>
            )}
          </DialogActions>
        </Box>
      </Dialog>

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
