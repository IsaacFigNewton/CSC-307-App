// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form"

function MyApp() {
  const [characters, setCharacters] = useState([]);
  
  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function updateList(person) {
    setCharacters([...characters, person]);
  }

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i != index;
    });
    setCharacters(updated);
  }

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