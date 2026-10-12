import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import './style.css'

function Inicio() {
  const navigate = useNavigate();
  const [todoslospokes, setTodoslospokes] = useState([]);
  const [busqueda, setBusqueda] = useState('')
  const [tipopoke, setTipopoke] = useState('All')

  const tipos = [
    'All',
    'normal', 'fighting', 'flying', 'poison', 'ground', 'rock',
    'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric',
    'psychic', 'ice', 'dragon', 'dark', 'fairy', 'stellar', 'shadow', 'unknown'
  ]

  let resultados = todoslospokes

  if (busqueda.length >= 3 && isNaN(busqueda)) {
    resultados = todoslospokes.filter(pokemon =>
      pokemon.name.toLowerCase().includes(busqueda.toLowerCase())
    );
  }

  useEffect(() => {
    const cargarPokemons = async () => {
      try {
        if (tipopoke === 'All') {
          const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025')
          const responseData = await response.json()
          setTodoslospokes(responseData.results ?? [])
          return
        }

        const response = await fetch(`https://pokeapi.co/api/v2/type/${tipopoke}`)
        const responseData = await response.json()
        const mascotas = responseData.pokemon?.map((entry) => entry.pokemon) ?? []
        setTodoslospokes(mascotas)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    cargarPokemons()
  }, [tipopoke])

  if (todoslospokes.length === 0) {
    return <p className="loading-page">Cargando Pokedex...</p>;
  }

  return (
    <main className="inicio">
      <header className="inicio-hero">
        <p className="inicio-etiqueta">PokeAPI Explorer</p>
        <h1>Encuentra tu proximo Pokemon</h1>
        <p>Filtra por tipo, busca por nombre y entra al detalle para guardar favoritos.</p>
      </header>

      <div className="inicio-panel">
        <input
          type="text"
          placeholder='Buscar Pokemon.....'
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="c-buscador"
        />

        <div className="c-filtro" aria-label="Filtrar por tipo">
          {tipos.map((unTipo) => (
            <button
              type="button"
              key={unTipo}
              className={tipopoke === unTipo ? 'activo' : ''}
              onClick={() => setTipopoke(unTipo)}
            >
              {unTipo}
            </button>
          ))}
        </div>
      </div>

      <section className="c-lista" aria-label="Lista de Pokemon">
        {resultados.map((pokemon) => {
          const id = pokemon.url.split('/')[6]
          return (
            <article
              key={pokemon.name}
              className="c-lista-pokemon"
              onClick={() => navigate(`/pokemon/${pokemon.name}`)}
            >
              <span className="pokemon-id">#{id}</span>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                alt={`Pokemon ${pokemon.name}`}
                width="120"
                height="120"
                loading="lazy"
              />
              <h2>{pokemon.name}</h2>
            </article>
          )
        })}
      </section>
    </main>
  )
}

export default Inicio;
