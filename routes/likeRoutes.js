const client = require("../connection");

const handleLike = (req, res) => {
  const videoId = req.params.id;
  const userId = req.body.id;
  const queryString = `SELECT likes FROM users WHERE id='${userId}'`;
  client.query(queryString, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(404).send({ message: "Unknown error" });
    } else {
        console.log(result.rows);
      if (!result.rows || !result.rows[0]?.likes.includes(videoId)) {
        const queryString = `INSERT INTO users(likes) values('{${videoId}}') WHERE id='${userId}' RETURNING *`;
        client.query(queryString, (error, result) => {
          if (error) {
            console.log(error);
            return res.status(404).send({ message: "Technical issue" });
          } else {
            return res.status(200).send(result.rows);
          }
        });
      } else {
        const newLikes = result.rows[0].likes
          .filter((id) => id != videoId)
          .join(",");
        const queryString = `UPDATE users SET likes='{${newLikes}}' WHERE id='${userId}' RETURNING *`;
        client.query(queryString, (error, result) => {
          if (error) {
            console.log(error);
            return res.status(404).send({ message: "Technical issue" });
          } else {
            return res.status(200).send(result.rows);
          }
        });
      }
    }
    res.status(200);
  });
};

const removeLike = (req, res) => {};

module.exports = {
  handleLike,
  removeLike,
};
