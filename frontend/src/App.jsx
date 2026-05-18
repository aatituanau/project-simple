import {useState} from "react";

function App() {
  const [name, setName] = useState("");
  const [pokemon, setPokemon] = useState(null);

  // 1. Searchar el Pokémon en la API externa (PokeAPI)
  const searchPokemon = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/pokemon/${name.toLowerCase()}`,
      );
      const data = await response.json();
      setPokemon(data);
    } catch (error) {
      alert("Error al buscar el Pokémon");
    }
  };

  // 2. Save the Pokémon in the database (our backend)
  const saveToDb = async () => {
    try {
      await fetch("http://localhost:5000/api/fav", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name: pokemon.name}),
      });
      alert(`${pokemon.name} guardado en la BD!`);
    } catch (error) {
      alert("No se pudo guardar");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center p-10 font-sans">
      <h1 className="text-5xl font-black text-yellow-400 mb-10 drop-shadow-md">
        Poke-Fullstack
      </h1>

      <div className="flex gap-3 bg-slate-800 p-4 rounded-lg shadow-xl">
        <input
          className="p-3 rounded bg-slate-700 text-white outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
          type="text"
          placeholder="Ej: pikachu, charizard..."
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="bg-yellow-200 hover:bg-yellow-600 px-6 py-3 rounded-md font-bold text-slate-900 transition-colors"
          onClick={searchPokemon}
        >
          Buscar
        </button>
      </div>

      {pokemon && (
        <div className="mt-12 bg-slate-800 p-8 rounded-2xl shadow-2xl border-b-8 border-yellow-500 text-center animate-fade-in">
          <img
            className="w-48 h-48 mx-auto drop-shadow-2xl"
            src={pokemon.sprites?.front_default}
            alt={pokemon.name}
          />
          <h2 className="text-3xl font-black capitalize mt-4">
            {pokemon.name}
          </h2>
          <div className="flex justify-center gap-4 mt-4">
            <span className="bg-slate-700 px-3 py-1 rounded-full text-sm">
              ID: {pokemon.id}
            </span>
            <span className="bg-slate-700 px-3 py-1 rounded-full text-sm">
              Peso: {pokemon.weight}
            </span>
          </div>
          <button
            onClick={saveToDb}
            className="mt-8 text-yellow-400 border border-yellow-400 px-4 py-2 rounded hover:bg-yellow-400 hover:text-slate-900 transition-all font-bold"
          >
            Guardar en Favoritos (BD)
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
