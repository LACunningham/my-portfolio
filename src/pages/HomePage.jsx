import { Link } from 'react-router-dom';
import heroImg from '../assets/hero.png';
import SkillBadge from '../components/SkillBadge';
import ProjectCard from '../components/ProjectCard';
import proyectos from '../data/proyectos.json';

const HomePage = () => {
  const habilidadesPrincipales = ['React', 'JavaScript', 'Bootstrap', 'HTML5', 'CSS3', 'Git'];

  return (
    <div className="row align-items-center justify-content-center min-vh-75 py-4" style={{ animation: 'fadeInUp 0.6s ease-out' }}>
  
      <div className="col-12 col-md-6 text-center text-md-start mb-4 mb-md-0">
        <h1 className="display-4 fw-bold">Hola, soy Luciano</h1>
        <h2 className="text-muted mb-4">Desarrollador Front-End · Aplicaciones web modernas</h2>
        <p className="lead mb-4">
          Bienvenido/a a mi portafolio. Me apasiona crear aplicaciones web modernas, eficientes e interactivas utilizando las últimas tecnologías del mercado.
        </p>

        <div className="mb-4">
          <h5 className="mb-3">Mis tecnologías clave:</h5>
          <div className="d-flex flex-wrap justify-content-center justify-content-md-start gap-2">
            {habilidadesPrincipales.map((skill, index) => (
              <div key={index} style={{ animation: `slideIn 0.5s ease-out ${index * 0.1}s backwards` }}>
                <SkillBadge skill={skill} />
              </div>
            ))}
          </div>
        </div>

        <Link to="/contact" className="btn btn-primary btn-lg mt-2">
          Contactame
        </Link>
      </div>

     
      <div className="col-12 col-md-5 text-center">
        <img
          src={heroImg}
          alt="Representación de desarrollo"
          className="img-fluid rounded-circle shadow-lg"
          style={{ maxWidth: '350px', objectFit: 'cover', animation: 'fadeInUp 0.6s ease-out 0.2s backwards' }}
        />
      </div>

      <div className="col-12 mt-5">
        <h3 className="mb-4">Proyectos recientes</h3>
        <div className="row g-3 g-md-4">
          {proyectos.slice(0, 3).map((p, idx) => (
            <div key={p.id} className="col-12 col-sm-6 col-lg-4" style={{ animation: `slideIn 0.5s ease-out ${(idx + 3) * 0.1}s backwards` }}>
              <ProjectCard {...p} />
            </div>
          ))}
        </div>
        <div className="mt-3">
          <Link to="/projects" className="btn btn-outline-primary">Ver todos los proyectos</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;