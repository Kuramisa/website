require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();

const server = require("http").createServer(app);

const port = process.env.NODE_ENV === "development" ? 80 : process.env.PORT;
const publicPath = path.join(__dirname, "build");

app.use(express.static(publicPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

server.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});