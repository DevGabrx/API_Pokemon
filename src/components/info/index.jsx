import './style.css'

function Info() {
  return (
    <main className="info-page">
      <section className="info-card">
        <p className="info-tag">Sobre la app</p>
        <h1>POKEAPI</h1>

        <div className="info-grid">
          <article>
            <span>01</span>
            <h2>Explora</h2>
            <p>Busca por nombre o navega por tipo desde la pantalla de inicio.</p>
          </article>
          <article>
            <span>02</span>
            <h2>Guarda</h2>
            <p>Marca favoritos</p>
          </article>
          <article>
            <span>03</span>
            <h2>Colecciona</h2>
            <p>Captura Pokemon aleatorios y llena tu album progresivamente.</p>
          </article>
        </div>
      </section>
    </main>
  )
}

export default Info
