import { useState } from 'react';
import Header from './components/Header';
import PokemonCard from './components/PokemonCard';

// Datos locales temporales (Etapa 2 antes de conectar PokéAPI)
const POKEMONES_INICIALES = [
  {
    id: 1,
    nombre: 'Bulbasaur',
    tipo: 'Planta / Veneno',
    imagen: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
  },
  {
    id: 4,
    nombre: 'Charmander',
    tipo: 'Fuego',
    imagen: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png'
  },
  {
    id: 7,
    nombre: 'Squirtle',
    tipo: 'Agua',
    imagen: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png'
  },
  {
    id: 25,
    nombre: 'Pikachu',
    tipo: 'Eléctrico',
    imagen: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
  }
];

function App() {
  // 3. Estados con useState
  const [busqueda, setBusqueda] = useState('');
  const [favoritos, setFavoritos] = useState([]);

  // 4. Manejador de evento para agregar/quitar favoritos
  const toggleFavorito = (id) => {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter((favId) => favId !== id));
    } else {
      setFavoritos([...favoritos, id]);
    }
  };

  // Filtrado dinámico basado en el estado del input
  const pokemonesFiltrados = POKEMONES_INICIALES.filter((pokemon) =>
    pokemon.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      <Header />

      <main className="main-content">
        <section className="hero-section">
          <h2>Catálogo Interactivo</h2>
          <p>Favoritos seleccionados: <strong>{favoritos.length}</strong></p>

          {/* Input controlado + Botón de evento */}
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <input
              type="text"
              placeholder="Buscar Pokémon por nombre..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc', width: '250px' }}
            />
            <button 
              onClick={() => setBusqueda('')}
              style={{ padding: '8px 14px', borderRadius: '6px', border: 'none', backgroundColor: '#ef5350', color: 'white', cursor: 'pointer' }}
            >
              Limpiar
            </button>
          </div>
        </section>

        {/* 2. Renderizado de lista con .map() */}
        <section className="pokedex-grid">
          {pokemonesFiltrados.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              id={pokemon.id}
              nombre={pokemon.nombre}
              tipo={pokemon.tipo}
              imagen={pokemon.imagen}
              esFavorito={favoritos.includes(pokemon.id)}
              onToggleFavorito={toggleFavorito}
            />
          ))}
        </section>
      </main>
    </>
  );
}

export default App;
