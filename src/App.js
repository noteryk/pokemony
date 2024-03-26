import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
 const [pokemonName, setPokemonName] = useState("");
 const [pokemonData, setPokemonData] = useState(null);
 const [allPokemon, setAllPokemon] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
 const [pokemonPerPage, setPokemonPerPage] = useState(10);

 useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=151&offset=0`).then((response) => {
      setAllPokemon(response.data.results);
    });
 }, []);

 const searchPokemon = () => {
  axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => {
      setPokemonData(response.data);
    })
    .catch((error) => {
      console.error("Error fetching Pokemon data:", error);
    });
};


 const randomPokemon = () => {
    const randomNumber = Math.floor(Math.random() * allPokemon.length);
    axios.get(`https://pokeapi.co/api/v2/pokemon/${allPokemon[randomNumber].name}`).then((response) => {
      setPokemonData(response.data);
    });
 };

 const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
 };

 const indexOfLastPokemon = currentPage * pokemonPerPage;
 const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
 const currentPokemon = allPokemon.slice(indexOfFirstPokemon, indexOfLastPokemon);

 const typeColors = {
 normal: 'bg-gray-500',
 fire: 'bg-red-500',
 water: 'bg-blue-500',
 electric: 'bg-yellow-500',
 grass: 'bg-green-500',
 ice: 'bg-cyan-500',
 fighting: 'bg-orange-500',
 poison: 'bg-purple-500',
 ground: 'bg-brown-500',
 flying: 'bg-teal-500',
 psychic: 'bg-pink-500',
 bug: 'bg-lime-500',
 rock: 'bg-stone-500',
 ghost: 'bg-indigo-500',
 dragon: 'bg-red-700',
 dark: 'bg-gray-800',
 steel: 'bg-gray-600',
 fairy: 'bg-pink-200',
 };

 return (
    <div className="bg-blue-950 min-h-screen flex flex-col justify-center items-center text-white">
      <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="PokeAPI logo" className="w-50 h-25 mb-4" />
      <h1 className="text-4xl mb-4 text-blue-500 glowing-text">Search your pokemon</h1>
      <div className="w-full max-w-md">
        <div className="flex mb-4">
          <input
            className="flex-1 px-4 py-2 rounded-l-md bg-blue-500 text-white focus:outline-none focus:ring focus:border-blue-500"
            type="text"
            onChange={(e) => setPokemonName(e.target.value)}
          />
          <button onClick={searchPokemon}
            className="px-4 py-2 rounded-r-md bg-blue-500 text-white font-semibold hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Search
          </button>
          <button onClick={randomPokemon}
            className="px-4 py-2 m-1 rounded-r-md bg-blue-500 text-white font-semibold hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Random Pokemon
          </button>
        </div>
        {pokemonData && (
 <div className="flex flex-col items-center">
    <img src={pokemonData.sprites.front_default} alt={pokemonData.name} className="w-35 h-35 object-cover mx-auto border-4 border-white rounded-full" />
    <h2 className="text-2xl font-bold mt-4">{pokemonData.name}</h2>
    <div className="flex space-x-2 mt-2">
      {pokemonData.types.map((type, index) => (
     <span key={index} className={`px-2 py-1 text-sm font-semibold text-white rounded-full ${typeColors[type.type.name]}`}>
     {type.type.name}
    </span>
      ))}
    </div>
    <div className="mt-4">
      <h3 className="text-xl font-semibold">Stats:</h3>
      <ul className="list-disc list-inside">
        {pokemonData.stats.map((stat, index) => (
          <li key={index}>{stat.stat.name}: {stat.base_stat}</li>
        ))}
      </ul>
    </div>
    <div className="mt-4">
      <h3 className="text-xl font-semibold">Abilities:</h3>
      <ul className="list-disc list-inside">
        {pokemonData.abilities.map((ability, index) => (
          <li key={index}>{ability.ability.name}</li>
        ))}
      </ul>
    </div>
 </div>
)}
        </div>
      </div>
 );
}

export default App;
