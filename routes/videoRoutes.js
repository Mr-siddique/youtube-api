const client = require("../connection");

const fetchAllvideos = (req, res) => {
  const queryString = `SELECT * FROM videos`;
  client.query(queryString, (error, result) => {
    if (error) {
      console.log(error);
      res.status(404).send({ message: "Unable to fetch data." });
    } else {
      res.status(200).send(result.rows);
    }
  });
};

const fetchSingleVideo = (req, res) => {
  const { id } = req.params;
  const queryString = `SELECT * FROM videos WHERE id=${id}`;
  client.query(queryString, (error, result) => {
    if (error) {
      return res.status(404).send({ message: "Unable to fetch this video" });
    } else {
      return res.status(200).send(result.rows[0]);
    }
  });
};

const postVideo = (req, res) => {
  const { user_id, name, description, url } = req.body;
  if (!user_id || !name || !description || !url)
    return res.status(404).send({ message: "Invalid data." });
  const queryString = `INSERT INTO videos(user_id,name,description,url) VALUES($1,$2,$3,$4) RETURNING *`;
  const values = [user_id, name, description, url];
  client.query(queryString, values, (error, result) => {
    if (error) {
      return res
        .status(404)
        .send({ message: "Unable to post video try later." });
    } else {
      return res.status(200).send(result.rows);
    }
  });
};

const deleteVideo = (req, res) => {
  const { id } = req.params;
  const queryString = `DELETE FROM videos WHERE id='${id}' RETURNING *`;
  client.query(queryString, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(404).send({ message: "You cannot delete this video." });
    } else {
      return res.status(200).send(result.rows);
    }
  });
};

const updateName = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const queryString = `UPDATE videos SET name='${name}' WHERE id='${id}' RETURNING *`;

  client.query(queryString, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(404).send({ message: "Unable to update" });
    } else {
      return res.status(200).send(result.rows);
    }
  });
};

const updateDescription = (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  const queryString = `UPDATE videos SET description="${description}" WHERE id='${id}' RETURNING *`;

  client.query(queryString, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(404).send({ message: "Unable to update" });
    } else {
      return res.status(200).send(result.rows);
    }
  });
};
module.exports = {
  fetchAllvideos,
  fetchSingleVideo,
  postVideo,
  deleteVideo,
  updateName,
  updateDescription,
};
