const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const authConfig = require("./src/auth_config.json");
const { join } = require("path");
const app = express();
const port = process.env.PORT || 3001;
const appPort = process.env.SERVER_PORT || 3000;
const appOrigin = authConfig.appOrigin || `http://localhost:${appPort}`;
const checkJwt = require("./auth/checkjwt");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Database connection
mongoose.connect(
  "mongodb+srv://admin:Goalapppassword3953@cluster0.4tcpj.mongodb.net/GoalappNew?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

const db = mongoose.connection;

// Checks for auth config
if (!authConfig.domain || !authConfig.audience) {
  throw new Error(
    "Please make sure that auth_config.json is in place and populated"
  );
}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// HTTP logger middleware
app.use(morgan("dev"));
// HTTP header middleware
app.use(helmet());
// Cross origin middleware
app.use(cors({ origin: appOrigin }));
// Serves up react app
app.use(express.static(join(__dirname, "build")));

// Checks every request for a signed JWT
// Commented out for api development
// app.use(checkJwt)
// COMMENT ABOVE BACK IN FOR PRODUCTION

// Configures routes
app.use(require("./routes"));

// Database error handler
db.on("error", console.error.bind(console, "connection error:"));

// Database connection handler
db.once("open", function () {
  // Sets server to listen on given port
  app.listen(port, () => console.log(`API Server listening on port ${port}`));
});
