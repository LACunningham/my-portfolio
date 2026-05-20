import { Link } from 'react-router-dom';
import heroImg from '../assets/hero.png';
import SkillBadge from '../components/SkillBadge';

const HomePage = () => {
  // Lista de habilidades principales para renderizar con .map()
  const habilidadesPrincipales = ['React', 'JavaScript', 'Bootstrap', 'HTML5', 'CSS3', 'Git'];

  return (
    <div className="row align-items-center justify-content-center min-vh-75 py-4">
      {/* Columna de Texto */}
      <div className="col-md-6 text-center text-md-start">
        <h1 className="display-4 fw-bold">Hola, soy [Tu Nombre]</h1>
        <h2 className="text-muted mb-4">Desarrollador Front-End / Estudiante de Programación</h2>
        <p className="lead mb-4">
          Bienvenido/a a mi portafolio. Me apasiona crear aplicaciones web modernas, eficientes e interactivas utilizando las últimas tecnologías del mercado.
        </p>

        {/* Renderizado de Skills Principales */}
        <div className="mb-4">
          <h5 className="mb-3">Mis tecnologías clave:</h5>
          <div className="d-flex flex-wrap justify-content-center justify-content-md-start">
            {habilidadesPrincipales.map((skill, index) => (
              <SkillBadge key={index} skill={skill} />
            ))}
          </div>
        </div>

        {/* Link directo a la sección de contacto */}
        <Link to="/contact" className="btn btn-primary btn-lg mt-2">
          Contactame
        </Link>
      </div>

      {/* Columna de la Imagen */}
      <div className="col-md-5 text-center mt-4 mt-md-0">
        <img 
          src={heroImg} 
          alt="Representación de desarrollo" 
          className="img-fluid rounded-circle shadow-lg" 
          style={{ maxWidth: '350px', objectFit: 'cover' }}
        />
      </div>
    </div>
  );
};

export default HomePage;