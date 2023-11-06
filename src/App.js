
import './App.css';
import React from 'react';
import { useState, useEffect} from 'react';

const StarWarsComponent=()=>{
const [character, setCharacter]= useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

  function FetchCharacter(){
    const randomCharacterId = Math.floor(Math.random() * 88) + 1; 
    const characterUrl = `https://akabab.github.io/starwars-api/api/id/${randomCharacterId}.json`;

    fetch(characterUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((result) => {
        setCharacter(result);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
      
      

  }
  
  useEffect(() => {
    FetchCharacter();
  }, []);



  return(
    <div>
      <h1>Star Wars Character Viewer</h1>
      <button onClick={FetchCharacter}>Click me</button>
      {character && (
        <div>
          <h2>Name: {character.name}</h2>
          <h3>Height: {character.height} cm</h3>
          <h3>Homeworld: {character.homeworld}</h3>
          <ul>
            {character.apprentices && character.apprentices.length > 0 ? (
              character.apprentices.map((apprentice, index) => (
                <li key={index}>{apprentice}</li>
              ))
            ) : (
              <li>No apprentices found.</li>
            )}
          </ul>
          <h3>Image:</h3>
          <img src={character.image} alt={character.name}
          style={{ maxWidth: "300px", maxHeight: "300px" }}/>
        </div>
      )}
      
    </div>

    )
  }

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <StarWarsComponent/>
      </header>
    </div>
  );
}

export default App;
