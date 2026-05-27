import { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';

const ProjectsPage = () => {
  const [proyectos, setProyectos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const res = await fetch('./data/proyectos.json');
        const data = await res.json();
        setProyectos(data);
      } catch {
        setProyectos([]);
      } finally {
        setCargando(false);
      }
    };
    const timer = setTimeout(fetchProyectos, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '48px 24px', animation: 'fadeInUp 0.6s ease-out' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '12px' }}>Mis Proyectos</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '0.95rem' }}>
        Estos son algunos de mis proyectos destacados. Cada uno representa mi crecimiento como desarrollador.
      </p>

      {cargando && (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <div style={{
            width: '32px',
            height: '32px',
            border: '3px solid var(--border)',
            borderTopColor: 'var(--accent)',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 16px'
          }} />
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Cargando proyectos...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {!cargando && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
          {proyectos.length > 0 ? (
            proyectos.map((proyecto, idx) => (
              <div
                key={proyecto.id}
                style={{ animation: `slideIn 0.5s ease-out ${idx * 0.1}s backwards` }}
              >
                <ProjectCard {...proyecto} />
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0' }}>
              <p style={{ color: 'var(--text-secondary)' }}>No hay proyectos disponibles por el momento.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
