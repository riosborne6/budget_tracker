const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

require("dotenv").config();

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () =>
  console.log('Connected to MongoDB Endpoint')
);
mongoose.connection.on('error', (err) =>
  console.log(`Mongoose default connection error: ${err}`)
);

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});