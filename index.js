const express = require("express");
const app = express();
app.use(express.json());
//dotenv initialization
require("dotenv").config();

const Port = process.env.PORT;

//multer path
app.use("/Images", express.static("./Images"));

//get models
const db = require("./models");

//cors policy
const cors = require("cors");
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content_Type,Accept,Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  next();
});

//routers

const contactsRouter = require("./routes/Contacts");
app.use("/api/v1/contacts", contactsRouter);

const usersRouter = require("./routes/Users");
app.use("/api/v1/users", usersRouter);

const homeRouter = require("./routes/home");
app.use("/api/v1/home", homeRouter);

const cmsRouter = require("./routes/cms");
app.use("/api/v1/home/cms", cmsRouter);

// Sync sequelize every time it runs

db.sequelize.sync().then(() => {
  app.listen(Port, () => {
    console.log(`running on port ${Port}`);
  });
});
