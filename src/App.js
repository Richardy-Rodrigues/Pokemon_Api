import React, {useEffect, useState} from "react";
import './style.css';
import pokemon_logo from './assets/pokemon_logo.png';

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
        <img src={pokemon_logo} width={500} height={200}/>
      </header>
      <div className="main">
        <form onSubmit={handleSubmit}>
          <input 
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Digite o nome do Pokemon"
          />
          <button type="submit">Buscar</button>
        </form>
      </div>

      {loading && <div>Carregando...</div>}

      {pokemon && !loading && (
        <div>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} width={150} height={150}/>
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
