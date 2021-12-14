// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();
const {isAuthenticated} = require('./middleware/jwt.js')
// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// Routes
const allRoutes = require("./routes");
app.use("/api", allRoutes);

const auth = require("./routes/auth");
app.use("/auth", auth);

const channel = require("./routes/channel");
app.use("/channel", channel);

const message = require("./routes/message");
app.use("/message", message);

const user = require("./routes/user");
app.use("/user", user);

const profile = require("./routes/profile");
app.use("/profile", profile);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
