import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import './style.css'

function Pokemon() {
  const { name } = useParams();
  const [datapoke, setDatapoke] = useState([]);
  const [favoritos, setFavoritos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favoritos') || '[]');
    } catch {
      return [];
    }
  });
  const esFavorito = favoritos.some(p => p.id === datapoke.id);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response => response.json())
      .then(responseData => setDatapoke(responseData))
      .catch(error => console.error("Error:", error));
  }, [name]);

  const toggleFavorito = () => {
    let nuevosFavoritos;
    if (esFavorito) {
      nuevosFavoritos = favoritos.filter(p => p.id !== datapoke.id);
    } else {
      nuevosFavoritos = [...favoritos, { id: datapoke.id, nombre: datapoke.name }];
    }
    setFavoritos(nuevosFavoritos);
    localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
  };

  if (!datapoke || !datapoke.id) return <p className="loading-page">Cargando Pokemon...</p>;

  const stats = [
    ['HP', datapoke.stats[0].base_stat],
    ['Ataque', datapoke.stats[1].base_stat],
    ['Defensa', datapoke.stats[2].base_stat],
    ['At. Especial', datapoke.stats[3].base_stat],
    ['Def. Especial', datapoke.stats[4].base_stat],
    ['Velocidad', datapoke.stats[5].base_stat],
  ];

  return (
    <main className="pokemon-detalle">
      <section className="pokemon-card-grande">
        <div className="pokemon-presentacion">
          <span className="pokemon-numero">#{datapoke.id}</span>
          <h1>{datapoke.name}</h1>
          <div className="pokemon-tipos">
            {datapoke.types?.map(t => <span key={t.type.name}>{t.type.name}</span>)}
          </div>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${datapoke.id}.png`}
            alt={datapoke.name}
            width="300"
            height="300"
          />
        </div>

        <div className="pokemon-datos">
          <button className={esFavorito ? 'favorito activo' : 'favorito'} onClick={toggleFavorito}>
            {esFavorito ? 'Quitar favorito' : 'Agregar favorito'}
          </button>

          <div className="pokemon-medidas">
            <article>
              <span>Altura</span>
              <strong>{datapoke.height / 10} m</strong>
            </article>
            <article>
              <span>Peso</span>
              <strong>{datapoke.weight / 10} kg</strong>
            </article>
          </div>

          <div className="pokemon-stats">
            <h2>Estadisticas</h2>
            {stats.map(([label, value]) => (
              <div className="stat" key={label}>
                <span>{label}</span>
                <div className="stat-barra"><i style={{ width: `${Math.min(value, 180) / 180 * 100}%` }} /></div>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Pokemon
