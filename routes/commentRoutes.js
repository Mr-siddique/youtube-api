const client = require("../connection");

const getComments = (req, res) => {
  const videoId = req.params.id;
  const queryString = `SELECT * FROM comments WHERE video_id='${videoId}'`;

  client.query(queryString, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(404).send({ message: "Unable to fetch comments." });
    } else {
      return res.status(200).send(result.rows);
    }
  });
};

const postComment = (req, res) => {
  const { user_id, video_id, content } = req.body;
  if (!user_id || !video_id || !content) {
    return res.status(404).send({ message: "All fields are required" });
  }
  const queryString = `INSERT INTO comments(user_id,video_id,content) VALUES($1,$2,$3) RETURNING *`;
  const values = [user_id, video_id, content];
  client.query(queryString, values, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(404).send({ message: "unable to post comment" });
    } else {
      return res.status(200).send(result.rows[0]);
    }
  });
};

const putComment = (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  if (!content) {
    return res.status(404).send({ message: "content is required." });
  }
  const queryString = `UPDATE comments SET content='${content}' WHERE id='${id}' RETURNING *`;
  client.query(queryString, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(404).send({ message: "Unable to update." });
    } else {
      return res.status(200).send(result.rows);
    }
  });
};

const deleteComment = (req, res) => {
  const { id } = req.params;
  const queryString = `DELETE FROM comments WHERE id='${id}' RETURNING *`;

  client.query(queryString, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(404).send({ message: "Unable to delete." });
    } else {
      return res.status(200).send(result.rows);
    }
  });
};
module.exports = {
  getComments,
  postComment,
  putComment,
  deleteComment,
};
