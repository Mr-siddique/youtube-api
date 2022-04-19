const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");
const client = require("./connection");
const { cookieKey } = require("./config/keys");
const cors = require("cors");
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
require("./services/passport");

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

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Api is ready");
});
require("./routes/authRoutes")(app);

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
