// backend.js
import express from "express";

const app = express();
const port = 8000;
const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
};

// helper functions
const findUserByName = (name) => {
  return users["users_list"].filter(
      (user) => user["name"] === name
  );
};
const findUserById = (id) =>
users["users_list"].find((user) => user["id"] === id);
const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};
const filterUsersByNameJob = (name, job) => {
  return users["users_list"].filter(
      (user) => (user["name"] === name) && (user["job"] === job)
  );
};
const removeUserById = (id) => {
  users["users_list"] = users["users_list"].filter(
    (user) => user["id"] != id
  );
  return id;
};

// instantiate the app
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
  if (name != undefined && job != undefined) {
    // get all users that match a given name and a given job.
      let result = filterUsersByNameJob(name, job);
      result = { users_list: result };
      res.send(result);
  } else if (name != undefined) {
    // get all users that match a given name.
      let result = findUserByName(name);
      result = { users_list: result };
      res.send(result);
  } else {
    // if no query provided, just send the JSON of all the users
      res.send(users);
  }
});

// get user with id
app.get("/users/:id", (req, res) => {
const id = req.params["id"]; //or req.params.id
let result = findUserById(id);
if (result === undefined) {
  res.status(404).send("Resource not found.");
} else {
  res.send(result);
}
});

// add a user based on the request body if it's a POST request
app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

// remove a particular user by id from the users list
app.delete("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = removeUserById(id);
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