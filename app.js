// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, "/client/build")));

const {isAuthenticated} = require('./middleware/jwt.js')
// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// Routes
const allRoutes = require("./routes");
app.use("/api", allRoutes);

const auth = require("./routes/auth");
app.use("/auth", auth);

const channel = require("./routes/channel");
app.use("/channel", isAuthenticated, channel);

const conversation = require("./routes/conversation");
app.use("/conversation", isAuthenticated, conversation);

const message = require("./routes/message");
app.use("/message", isAuthenticated, message);

const user = require("./routes/user");
app.use("/user", isAuthenticated, isAuthenticated, user);

const profile = require("./routes/profile");
app.use("/profile", isAuthenticated, profile);

app.use((req, res) => {
    // If no routes match, send them the React HTML.
    res.sendFile(__dirname + "/client/build/index.html");
});

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
