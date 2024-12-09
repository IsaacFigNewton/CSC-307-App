import mongoose from "mongoose";
import userModel from "../models/user.js";

// mongoose.set("debug", true);
// mongoose
//   .connect("mongodb://localhost:27017/users", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .catch((error) => console.log(error));

//rewrite this
const removeUserById = (id) => {
  return userModel.findByIdAndDelete({_id : id})
};

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}

function findUserByNameJob(name, job) {
  return userModel.find({
     name: name,
     job: job 
    });
}

function getUsers(name, job) {
  let promise;
  if (name === undefined && job === undefined) {
    promise = userModel.find();
  } else if (name && !job) {
    promise = findUserByName(name);
  } else if (job && !name) {
    promise = findUserByJob(job);
  } else {
    console.log("finding user by name and job")
    promise = findUserByNameJob(name, job);
  }
  return promise;
}

function findUserById(id) {
  return userModel.findById(id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

export default {
  addUser,
  removeUserById,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
};
