const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "youtube",
  password: "Aamir@123",
  port: 5432,
});

module.exports = client;
