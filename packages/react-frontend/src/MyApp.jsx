// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form"

function MyApp() {
  const [characters, setCharacters] = useState([]);
  
  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(person)
    });
  
    return promise;
  }
  
  function updateList(person) {
    postUser(person)
    .then(() => setCharacters([...characters, person]))
    .catch((error) => {
      console.log(error);
    });
  }

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i != index;
    });
    setCharacters(updated);
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>My First React Web App!</h1>
      <div className="container">
        <h2>People and their Jobs</h2>
        <Table
          characterData={characters}
          removeCharacter={removeOneCharacter}
        />
        <h2>Add someone new</h2>
        <Form
          handleSubmit={updateList}
        />
      </div>
    </div>
  );
}

export default MyApp;