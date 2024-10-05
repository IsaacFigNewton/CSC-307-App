// src/MyApp.jsx
import React, { useState} from "react";
import Table from "./Table";
import Form from "./Form"

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i != index;
    });
    setCharacters(updated);
  }

  return (
    // <div>
      // <h1>My First React Web App!</h1>
      <div className="container">
        {/* <h2>People and their Jobs</h2> */}
        <Table
          characterData={characters}
          removeCharacter={removeOneCharacter}
        />
        {/* <h2>Add someone new</h2> */}
        <Form />
      </div>
    // </div>
  );
}

export default MyApp;