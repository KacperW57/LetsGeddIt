const { response } = require("express");
const express = require("express");
const { DateTime } = require("luxon");

const recordRoutes = express.Router();

const dbo = require("../db/conn");

const ObjectId = require("mongodb").ObjectId;

//Registering new users
recordRoutes.route("/register").post(async function (req, response) {
  let db_connect = dbo.getDb();
  const date = new Date(Date.now());
  const formattedDate = DateTime.fromJSDate(date).toLocaleString(
    DateTime.DATETIME_MED
  );
  let myquery = {
    login: req.body.login,
  };
  let myobj = {
    login: req.body.login,
    email: req.body.email,
    password: req.body.password,
    registration_date: formattedDate,
  };
  db_connect
    .collection("users")
    .findOne(myquery, function (err, res) {
      if (err) throw err;
    })
    .then((data) => {
      console.log(data);
      if (data !== null) {
        response.sendStatus(403);
      } else if (data === null) {
        db_connect
          .collection("users")
          .insertOne(myobj, function (err, res) {
            if (err) throw err;
            response.json(res);
          })
          .then((data) => {
            console.log(data);
            response.sendStatus(200);
          });
      }
    });
});

//Logging in
recordRoutes.route("/login").post(async function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = {
    login: req.body.login,
  };
  db_connect
    .collection("users")
    .findOne(myquery, function (err, res) {
      if (err) throw err;
    })
    .then((data) => {
      console.log(data);
      if (data !== null) {
        if (req.body.password === data.password) {
          response.sendStatus(200);
        } else if (req.body.password !== data.password) {
          response.sendStatus(403);
        }
      } else if (data === null) {
        response.sendStatus(403);
      }
    });
});

//adding new posts
recordRoutes.route("/addPost").post(async function (req, response) {
  let db_connect = dbo.getDb();
  const date = new Date(Date.now());
  const formattedDate = DateTime.fromJSDate(date).toLocaleString(
    DateTime.DATETIME_MED
  );
  let myobj = {
    login: req.body.login,
    post: req.body.post,
    postAdd_date: formattedDate,
  };
  db_connect
    .collection("posts")
    .insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    })
    .then((data) => {
      response.json(data);
    });
});

//Getting all posts
recordRoutes.route("/posts").get(async function (req, response) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("posts")
    .find({})
    .sort({ _id: -1 })
    .toArray()
    .then((data) => {
      response.json(data);
    });
});

//Getting all users
recordRoutes.route("/users").get(async function (req, response) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("users")
    .find({})
    .sort({ _id: -1 })
    .toArray()
    .then((data) => {
      response.json(data);
    });
});

//Getting single user
recordRoutes.route("/users/:id").get(async function (req, response) {
  let db_connect = dbo.getDb();
  myquery = {
    _id: new ObjectId(req.params.id),
  };
  db_connect
    .collection("users")
    .findOne(myquery, function (err, res) {
      if (err) throw err;
    })
    .then((data) => {
      console.log(data);
      response.json(data);
    });
});

//Getting single post
recordRoutes.route("/posts/:id").get(async function (req, response) {
  let db_connect = dbo.getDb();
  myquery = {
    _id: new ObjectId(req.params.id),
  };
  db_connect
    .collection("posts")
    .findOne(myquery, function (err, res) {
      if (err) throw err;
    })
    .then((data) => {
      console.log(data);
      response.json(data);
    });
});

//Deleting single post
recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();

  let myquery = { _id: new ObjectId(req.params.id) };
  db_connect.collection("posts").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 post deleted");
    response.json(obj);
  });
});
module.exports = recordRoutes;
