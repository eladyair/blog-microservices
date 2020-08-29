const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

const posts = {};

// Basicly this route is no longer needed cause it exist in query microservice
app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts/create", async (req, res) => {
  const id = randomBytes(4).toString("hex");

  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  await axios.post("http://event-bus-srv:4005/events", {
    type: "POST_CREATED",
    data: { id, title },
  });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Posts - Received Event: ", req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log("So called version change - v55");
  console.log("Listening on port 4000");
});
