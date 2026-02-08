const dotenv = require("dotenv");
const express = require("express");
const cookie = require("cookie-parser");
const cors = require("cors");

//imports
const serverListenMessage = require("./helper/serverListenMessage");
const logger = require("./helper/logger");
const connectToDb = require("./db/config");
const authRouter = require("./routes/auth/userAuthRoute");
const teamRouter = require("./routes/team/teamRoutes");
const authFn = require("./middleware/authFn");
const otpRouter = require("./routes/otp/otpRouter");
const userRouter=require("./routes/user/userRoute");
const app = express();

// configuring dotenv in main file to use it across all over the project
dotenv.config();
logger.log({
  level: "info",
  message: `Environment variables loaded from .env file`,
});

//Allow all origins (dev mode)
const origin = [
  "http://localhost:3000",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: origin ,
    credentials: true,
  })
);

logger.log({
  level: "info",
  message: `CORS configured to allow requests from ${process.env.CLIENT_URL}`,
});

//MIDDLEWARE FOR DATA TRANSFER
app.use("/public", express.static("public"));
app.use(express.json());
app.use(cookie());
app.use(express.urlencoded({ extended: true }));
logger.log({
  level: "info",
  message: "Middleware for JSON and URL-encoded data configured",
});

//server init when db connection is successful.
const PORT = process.env.PORT || process.env.SERVERPORT || 8080;
connectToDb()
  .then(() => {
    app.listen(PORT, () => {
      serverListenMessage();
      logger.log({
        level: "info",
        message: `Server Running Fine at ${process.env.ORIGIN_URL}`,
      });
    });
  })
  .catch((err) => {
    logger.log({
      level: "error",
      message: `DB Connection Failed`,
      error: err.message,
    });
  });

//routes ------------------------->

//AUTH-ROUTES >>>>>>>>>>>>>>>>>>>>>>>>>>
app.use("/taskmate/auth", authRouter);

//USER-ROUTES >>>>>>>>>>>>>>>>>>>>>>>>>>
app.use("/taskmate/user",authFn,userRouter);

//TEAM-ROUTES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
app.use("/taskmate/team", authFn, teamRouter);

//OTP ROUTES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
app.use("/taskmate/otp", otpRouter);
