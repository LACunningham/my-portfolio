import { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import proyectosData from '../data/proyectos.json';

const ProjectsPage = () => {
  const [proyectos, setProyectos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    try {
      setTimeout(() => {
        setProyectos(proyectosData);
        setCargando(false);
      }, 500);
    } catch (error) {
      console.error('Error cargando proyectos:', error);
      setCargando(false);
    }
  }, []);

  return (
    <div className="container py-5" style={{ animation: 'fadeInUp 0.6s ease-out' }}>
      <h1 className="display-5 fw-bold mb-4">Mis Proyectos</h1>
      <p className="text-muted mb-5">Aquí están algunos de mis proyectos destacados. Cada uno representa mi crecimiento como desarrollador.</p>

      {cargando && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3 text-muted">Cargando proyectos...</p>
        </div>
      )}

      {!cargando && (
        <div className="row g-4">
          {proyectos.length > 0 ? (
            proyectos.map((proyecto, idx) => (
              <div
                key={proyecto.id}
                className="col-12 col-sm-6 col-lg-4"
                style={{ animation: `slideIn 0.5s ease-out ${idx * 0.1}s backwards` }}
              >
                <ProjectCard
                  titulo={proyecto.titulo}
                  descripcion={proyecto.descripcion}
                  tecnologias={proyecto.tecnologias}
                  enlace={proyecto.enlace}
                  imagen={proyecto.imagen}
                />
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <p className="text-muted">No hay proyectos disponibles por el momento.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;