const express = require("express");
const DBHandle = require("../Controllers/testingwithnodeHandle");
const Router = express.Router();

const handleDAL = new DBHandle(
  "localhost",
  "root",
  "",
  "test",
  "testingwithnode"
);
Router.get("/", (req, res) => {
  handleDAL
    .getData()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
Router.get("/:id", (req, res) => {
  handleDAL
    .getSpecificData(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      throw err;
    });
});

Router.post("/", (req, res) => {
  const data = req.body;
  console.log(data);
  handleDAL
    .registerData(data)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      throw err;
    });
});

Router.delete("/:id", (req, res) => {
  handleDAL
    .DeleteUser(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      throw err;
    });
});

Router.put("/:id", (req, res) => {
  handleDAL
    .updateUser(req.params.id, req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      throw err;
    });
});

module.exports = Router;
