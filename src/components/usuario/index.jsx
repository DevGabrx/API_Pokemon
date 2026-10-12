import './style.css'

function leerListaLocal(clave) {
  try {
    const valor = JSON.parse(localStorage.getItem(clave) || '[]');
    return Array.isArray(valor) ? valor : [];
  } catch {
    return [];
  }
}

function Usuario() {
  const favoritos = leerListaLocal('favoritos');
  const capturados = leerListaLocal('misNumeros');

  return (
    <main className="usuario-page">
      <section className="usuario-card">
        <div className="usuario-avatar">PK</div>
        <div>
          <p className="usuario-tag">Entrenador</p>
          <h1>Mi perfil</h1>
          <p className="usuario-texto">Resumen local de tu progreso en esta Pokedex</p>
        </div>
      </section>

      <section className="usuario-stats">
        <article>
          <span>{favoritos.length}</span>
          <p>Favoritos</p>
        </article>
        <article>
          <span>{capturados.length}</span>
          <p>Capturados</p>
        </article>
        <article>
          <span>{Math.round((capturados.length / 1025) * 100)}%</span>
          <p>Album completo</p>
        </article>
      </section>
    </main>
  )
}

export default Usuario
