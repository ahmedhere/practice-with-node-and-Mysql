const express = require("express");


const mysql = require("mysql");

let db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Mysql Connected ......");
});
const app = express();

app.get("/", (req, res) => {
  res.send("Hello I am working with SQL");
});

app.get("/createTable/:name", (req, res) => {
  const tableName = req.params.name;
  const sql = `create table ${tableName}(id int PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255), email varchar(255))`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Table created");
  });
});

app.get("/addpost", (req, res) => {
  const post = {
    name: "Muhammad Ahmed",
    email: "test@gmail.com",
  };
  const sql = "INSERT testingwithnode SET ?";
  db.query(sql, post, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/getposts", (req, res) => {
  const sql = `SELECT * from testingwithnode`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/getposts/:id", (req, res) => {
  const sql = `SELECT * from testingwithnode where id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/updateposts/:id/:name", (req, res) => {
  const updatedName = req.params.name;
  const sql = `UPDATE testingwithnode SET name = '${updatedName}'  where id = ${req.params.id} `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/deleteposts/:id", (req, res) => {
  const sql = `DELETE FROM testingwithnode  where id = ${req.params.id} `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(3000, () => {
  console.log("Server is listening on port 30000");
});
