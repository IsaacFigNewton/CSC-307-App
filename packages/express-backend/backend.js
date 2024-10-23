// backend.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userServices from "./services/user-service.js";
import User from "./models/user.js"

dotenv.config();
const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

// mongoose
//   .connect(MONGO_CONNECTION_STRING)
//   .catch((error) => console.log(error));


const app = express();
const port = 8000;

// instantiate the app
app.use(cors());
app.use(express.json());

// get index page
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1><br>\
    <h2>Go to <a href=\"http://localhost:8000/users\">this link</a>\
    to see a list of all users.</h2><br>\
    <h2>Or <a href=\"http://localhost:8000/users?name=Mac&job=Bouncer\">this link</a>\
    to filter to just Mac from It's Always Sunny in Philadelphia.</h2>");
});

// get user with query
app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  
  // get all users that match a given name.
  userServices.getUsers(name, job)
  .then((users) => {
    res.send({ users_list: users });
  })
  .catch((error) => {
    console.log(error);
  });
});

// get user with id
app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  userServices.findUserById(id)
  .then((user) => {
    if (user === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.send(user);
    }
  })
  .catch((error) => {
    console.log(error);
  });
});

// add a user based on the request body if it's a POST request
app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userServices.addUser(userToAdd)
  .then((user) => {
    res
    .status(201)
    .location(`/users/${user.id}`)
    .json(user);
  })
  .catch((error) => {
    console.log(error);
  });
});

// remove a particular user by id from the users list
app.delete("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = userServices.removeUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
  });
  
// listen for requests
app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});