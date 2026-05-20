import { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';

const ProjectsPage = () => {
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    // Aquí puedes cargar proyectos desde un JSON o API
    // Por ahora usamos datos de ejemplo
    const proyectosEjemplo = [
      {
        id: 1,
        titulo: 'Mi Portafolio',
        descripcion: 'Portafolio personal desarrollado con React y Vite',
        tecnologias: ['React', 'Vite', 'Bootstrap', 'React Router'],
        enlace: 'https://github.com',
      },
      {
        id: 2,
        titulo: 'Proyecto 2',
        descripcion: 'Descripción del proyecto 2',
        tecnologias: ['JavaScript', 'HTML5', 'CSS3'],
        enlace: 'https://github.com',
      },
    ];
    setProyectos(proyectosEjemplo);
  }, []);

  return (
    <div className="container py-5">
      <h1 className="display-5 fw-bold mb-4">Mis Proyectos</h1>
      <div className="row g-4">
        {proyectos.map((proyecto) => (
          <div key={proyecto.id} className="col-md-6 col-lg-4">
            <ProjectCard
              titulo={proyecto.titulo}
              descripcion={proyecto.descripcion}
              tecnologias={proyecto.tecnologias}
              enlace={proyecto.enlace}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;