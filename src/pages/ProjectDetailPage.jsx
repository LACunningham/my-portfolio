import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [proyecto, setProyecto] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchProyecto = async () => {
      try {
        const res = await fetch('../data/proyectos.json');
        const data = await res.json();
        const encontrado = data.find((p) => p.id === Number(id));
        setProyecto(encontrado || null);
      } catch {
        setProyecto(null);
      } finally {
        setCargando(false);
      }
    };
    fetchProyecto();
  }, [id]);

  if (cargando) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 24px' }}>
        <div style={{
          width: '32px',
          height: '32px',
          border: '3px solid var(--border)',
          borderTopColor: 'var(--accent)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          margin: '0 auto 16px'
        }} />
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Cargando proyecto...</p>
      </div>
    );
  }

  if (!proyecto) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 24px' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '12px' }}>Proyecto no encontrado</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>El proyecto que buscas no existe.</p>
        <Link to="/projects" style={{
          display: 'inline-flex',
          padding: '10px 24px',
          fontSize: '0.9rem',
          fontWeight: 500,
          color: '#fff',
          backgroundColor: 'var(--accent)',
          borderRadius: '8px',
          textDecoration: 'none'
        }}>
          Volver a proyectos
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '48px 24px', animation: 'fadeInUp 0.6s ease-out' }}>
      <Link to="/projects" style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '0.9rem',
        color: 'var(--text-secondary)',
        textDecoration: 'none',
        marginBottom: '24px'
      }}
        onMouseEnter={(e) => { e.target.style.color = 'var(--text-heading)'; }}
        onMouseLeave={(e) => { e.target.style.color = 'var(--text-secondary)'; }}
      >
        &larr; Volver a proyectos
      </Link>

      {proyecto.imagen && (
        <div style={{
          width: '100%',
          height: '280px',
          borderRadius: '12px',
          overflow: 'hidden',
          background: 'var(--accent-light)',
          marginBottom: '32px'
        }}>
          <img src={proyecto.imagen} alt={proyecto.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}

      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '12px' }}>{proyecto.titulo}</h1>

      <p style={{ fontSize: '1rem', color: 'var(--text)', lineHeight: 1.8, marginBottom: '24px' }}>
        {proyecto.descripcion}
      </p>

      {proyecto.tecnologias && proyecto.tecnologias.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
            Tecnologías utilizadas
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {proyecto.tecnologias.map((tech, idx) => (
              <span key={idx} style={{
                display: 'inline-block',
                padding: '4px 14px',
                fontSize: '0.85rem',
                fontWeight: 500,
                color: 'var(--text-heading)',
                backgroundColor: 'var(--accent-light)',
                border: '1px solid var(--accent-border)',
                borderRadius: '4px'
              }}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {proyecto.enlace && (
        <a
          href={proyecto.enlace}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '12px 32px',
            fontSize: '0.9rem',
            fontWeight: 500,
            color: '#fff',
            backgroundColor: 'var(--accent)',
            borderRadius: '8px',
            textDecoration: 'none',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => { e.target.style.backgroundColor = 'var(--accent-hover)'; }}
          onMouseLeave={(e) => { e.target.style.backgroundColor = 'var(--accent)'; }}
        >
          Ver en GitHub &rarr;
        </a>
      )}
    </div>
  );
};

export default ProjectDetailPage;
