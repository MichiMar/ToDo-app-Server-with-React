require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const todoIetmRoutes = require("./Routes/todoRoutes");

const PORT = process.env.PORT || 4000;

const app = express();

mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log(" DB up and connected");
  })
  .catch(err => {
    console.log("connection err: " + err);
  });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", todoIetmRoutes);

app.listen(PORT, () => {
  console.log(`Is your server runnin? yes on ${PORT}`);
});
