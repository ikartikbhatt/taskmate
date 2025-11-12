const dotenv = require("dotenv");
const express = require("express");
const cookie = require("cookie-parser");
const cors = require("cors");

//imports
const serverListenMessage = require("./helper/serverListenMessage");
const logger = require("./helper/logger");
const connectToDb = require("./db/config");
const authRouter = require("./routes/auth/userAuthRoute");
const app = express();

// configuring dotenv in main file to use it across all over the project
dotenv.config();
logger.log({
  level: "info",
  message: `Environment variables loaded from .env file`,
});

//Allow all origins (dev mode)
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
logger.log({
  level: "info",
  message: `CORS configured to allow requests from ${process.env.CLIENT_URL}`,
});

//MIDDLEWARE FOR DATA TRANSFER
app.use(express.json());
app.use(cookie());
app.use(express.urlencoded({ extended: true }));
logger.log({
  level: "info",
  message: "Middleware for JSON and URL-encoded data configured",
});

//server init when db connection is successful.
connectToDb()
  .then(() => {
    app.listen(process.env.SERVERPORT, () => {
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

//USER-ROUTES >>>>>>>>>>>>>>>>>>>>>>>>>>
app.use("/taskmate/auth", authRouter);

