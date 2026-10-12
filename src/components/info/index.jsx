import './style.css'
import yoxd from '../../assets/yoxd.png'
import charizard from '../../assets/charizard.png'
import mewtho from '../../assets/mewtho.png'

function Info() {
  return (
    <main className="info-page">
      <div className="About-App">
        <h1>POKEAPI</h1>
        <h3>Aplicacion realizada por el estudiante: Gabriel Pino</h3>
        <img id="yo" src={yoxd} alt="Gabriel Pino" />
        <p><strong>Aplicaciones moviles | 2do Corte</strong></p>
      </div>

      <section className="info-card">
        <h3>Conocimientos adquiridos</h3>

        <div className="info-grid">
          <article className="info-item">
            <div className="info-text">
              <p>Creación de componentes en React</p>
              <p>Hooks básicos</p>
              <p>React Router DOM</p>
              <p>Renderizado Condicional</p>
            </div>
            <img className="pokemon-image left" src={charizard} alt="Charizard" />
          </article>

          <article className="info-item">
            <div className="info-text">
              <p>Obtener información a través de una API</p>
              <p>Gestionar endpoints</p>
              <p>Manejo de Formularios</p>
            </div>
            <img className="pokemon-image right" src={mewtho} alt="Mewtwo" />
          </article>
        </div>
      </section>
    </main>
  )
}

export default Info
