const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  res.send(commentsByPostId[postId] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const postId = req.params.id;
  const commentId = randomBytes(4).toString("hex");

  const { content } = req.body;

  let comments = commentsByPostId[postId] || [];

  comments.push({ id: commentId, content, status: "pending" });

  commentsByPostId[postId] = comments;

  await axios.post("http://event-bus-srv:4005/events", {
    type: "COMMENT_CREATED",
    data: { id: commentId, content, postId, status: "pending" },
  });

  res.status(201).send(commentsByPostId[postId]);
});

app.post("/events", async (req, res) => {
  console.log("Comments - Received Event: ", req.body.type);
  const { type, data } = req.body;

  if (type === "COMMENT_MODERATED") {
    const { id, postId, status, content } = data;

    const comments = commentsByPostId[postId];

    const comment = comments.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;

    await axios.post("http://event-bus-srv:4005/events", {
      type: "COMMENT_UPDATED",
      data: { id, postId, status, content },
    });
  }

  res.send({});
});

app.listen(4001, () => {
  console.log("Listening on port 4001");
});
