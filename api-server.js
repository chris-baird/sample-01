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
const checkJwt = require('./auth/checkjwt')

// Checks for auth config
if (!authConfig.domain || !authConfig.audience) {
  throw new Error(
    "Please make sure that auth_config.json is in place and populated"
  );
}

// HTTP logger middleware
app.use(morgan("dev"));
// HTTP header middleware
app.use(helmet());
// Cross origin middleware
app.use(cors({ origin: appOrigin }));
// Serves up react app
app.use(express.static(join(__dirname, "build")));
// Checks every request for a signed JWT
app.use(checkJwt)
// Configures routes
app.use(require('./routes'));

// Sets server to listen on given port
app.listen(port, () => console.log(`API Server listening on port ${port}`));
