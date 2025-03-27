import React, {useEffect, useState} from "react";

function App() {
  const {pokemon, setPokemon} = useState([]);

  function loadAPI() {
    let url = 'https://pokeapi.co/api/v2/pokemon/ditto';
    fetch(url)
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log(err));
  }

  useEffect(() => {
    loadAPI();
  }, []);
  return (
    <div>
      <h1>TESTE</h1>
    </div>
  );
}

export default App;
