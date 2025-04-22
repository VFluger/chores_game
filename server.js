const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./database.js");

require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));

// Logging to console
// Optional TODO: log to file
app.use((req, res, next) => {
  console.log(`${req.method} from ${req.ip} to ${req.url}`);
  next();
});

// Root Page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/frontend/form.html");
});

// POST new user to db
app.post(
  "/register",
  async (req, res, next) => {
    // Check if exists
    const userQuery = await db.findByName(req.body.name);
    if (userQuery) {
      // check if already in array
      console.log(userQuery.ip, req.ip);
      if (userQuery.ip.includes(req.ip)) {
        console.error("ip already registered");
        return next(new Error("IP already registered with this user"));
      }
      // push to array
      userQuery.ip.push(req.ip);
      await db.saveDocument(userQuery);
      return next();
    }
    // if not create user
    db.createNewUser({ name: req.body.name, ip: [req.ip] });
    next();
  },
  (req, res) => {
    res.send("works");
  }
);

app.get("/login", async (req, res) => {
  // get all user data
});

// Listening on 8080
const server = app.listen(8080, () => {
  const port = server.address().port;
  console.log(`Server listening on ${port}`);
});
