const fetch = require('node-fetch');
const express = require('express');
const mongoose = require('mongoose');
const { mongoURI } = require("./config/key");
const cors = require("cors");
const app = express();
const port = 5000;
app.use(cors());

require("./modals/auth");
require("./modals/fav");

app.get('/', (req, res) => {
  res.send('Hello World');
});
app.use(express.json());
app.use(require("./routes/api.js"));
app.use(require("./routes/auth.js"));

mongoose.connect(mongoURI);

mongoose.connection.on("connected", () => {
  console.log("connection is on...all good");
});
mongoose.connection.on("error", (err) => {
  console.log("error is occured in mongodb",err);
});

app.listen(port, () => {
  console.log("server is started on:", port);
});
