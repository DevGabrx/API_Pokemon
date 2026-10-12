import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'

function Favoritos() {
  const navigate = useNavigate();
  const [favoritos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favoritos') || '[]');
    } catch {
      return [];
    }
  });

  return (
    <main className="favoritos">
      <header className="favoritos-header">
        <p>Equipo marcado</p>
        <h1>Favoritos</h1>
        <span>{favoritos.length} guardados</span>
      </header>

      {favoritos.length === 0 ? (
        <section className="favoritos-vacio">
          <h2>No tienes Pokémon favoritos todavía</h2>
          <p>Entra al detalle de un Pokémon y toca el corazón para guardarlo aquí.</p>
        </section>
      ) : (
        <section className="favoritos-lista">
          {favoritos.map((pokemon) => (
            <article
              key={pokemon.id}
              className="favoritos-card"
              onClick={() => navigate(`/pokemon/${pokemon.nombre}`)}
            >
              <span>#{pokemon.id}</span>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                alt={`Pokémon ${pokemon.nombre}`}
                width="120"
                height="120"
                loading="lazy"
              />
              <h2>{pokemon.nombre}</h2>
            </article>
          ))}
        </section>
      )}
    </main>
  )
}

export default Favoritos;
