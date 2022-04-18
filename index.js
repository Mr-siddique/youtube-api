const express = require("express");
const bodyParser = require("body-parser");
const client = require("./connection");
const {
  fetchAllvideos,
  postVideo,
  deleteVideo,
  updateName,
  updateDescription,
  fetchSingleVideo,
} = require("./routes/videoRoutes");
const {
  getComments,
  postComment,
  putComment,
  deleteComment,
} = require("./routes/commentRoutes");
const { handleLike } = require("./routes/likeRoutes");
const app = express();
require('./services/passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  const corsWhiteList = ["http://localhost:3000"];
  if (corsWhiteList.indexOf(req.headers.origin) !== -1) {
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
  }
  next();
});


require('./routes/authRoutes')(app);
app.get("/", (req, res) => {
  res.send("Api is ready");
});

app.get("/videos", fetchAllvideos);
app.get("/video/:id", fetchSingleVideo);
app.post("/video", postVideo);
app.delete("/video/delete/:id", deleteVideo);
app.put("/video/name/:id", updateName);
app.put("/video/description/:id", updateDescription);
app.get("/comments/:id", getComments);
app.post("/comment", postComment);
app.put("/comment/:id", putComment);
app.delete("/comment/:id", deleteComment);
app.post("/video/like/:id", handleLike);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is up on port ${PORT}`));

client.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    console.log("connected");
  }
});

