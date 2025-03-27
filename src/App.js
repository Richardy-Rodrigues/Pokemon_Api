import React, {useEffect, useState} from "react";
import './style.css';

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [input, setInput] = useState('ditto');
  const [loading, setLoading] = useState(false);

  function loadAPI(pokemonNome) {
    setLoading(true);

    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonNome}`;

    fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Pokemon não encontrado'); 
      }
      return response.json()
    })
    .then(json => {
      setPokemon(json);
      setLoading(false);
  })
    .catch(err => console.log(err));
  }

  useEffect(() => {

    loadAPI(input);

  }, []);

  function handleInputChange(e) {
    setInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    loadAPI(input);
  }

  return (
    <div className="container">
      <header>
        <strong>
          Pokemon API
        </strong>
      </header>

      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Digite o nome do Pokemon"
        />
        <button type="submit">Buscar</button>
      </form>

      {loading && <div>Carregando...</div>}

      {pokemon && !loading && (
        <div>
          <img src={pokemon.sprites.front_default} alt={pokemon.name}/>
          <div>Name: {pokemon.name}</div>
          <div>Nº {pokemon.id}</div>
          <div>Peso: {pokemon.weight / 10} Kg</div>
          <div>Altura: {pokemon.height / 10} m</div>
        </div>
      )}
      
    </div>
  );
}

export default App;
