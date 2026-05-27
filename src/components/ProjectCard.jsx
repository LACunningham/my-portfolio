import PropTypes from 'prop-types';

const ProjectCard = ({ titulo, descripcion, tecnologias, enlace, imagen }) => {
  return (
    <div style={{
      backgroundColor: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: '8px',
      overflow: 'hidden',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'box-shadow 0.25s ease, transform 0.25s ease',
      boxShadow: 'var(--shadow-sm)'
    }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      {imagen && (
        <div style={{ width: '100%', height: '180px', overflow: 'hidden', background: 'var(--accent-light)' }}>
          <img src={imagen} alt={titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h5 style={{ margin: '0 0 8px', fontSize: '1.1rem', fontWeight: 600 }}>{titulo}</h5>
        <p style={{ margin: '0 0 16px', fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.6, flex: 1 }}>{descripcion}</p>
        {tecnologias && tecnologias.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
            {tecnologias.map((tech, idx) => (
              <span key={idx} style={{
                display: 'inline-block',
                padding: '2px 10px',
                fontSize: '0.78rem',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                backgroundColor: 'var(--accent-light)',
                borderRadius: '3px',
                letterSpacing: '0.01em'
              }}>
                {tech}
              </span>
            ))}
          </div>
        )}
        {enlace && (
          <a
            href={enlace}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 20px',
              fontSize: '0.85rem',
              fontWeight: 500,
              color: '#fff',
              backgroundColor: 'var(--accent)',
              borderRadius: '6px',
              textDecoration: 'none',
              transition: 'background-color 0.2s ease',
              alignSelf: 'flex-start'
            }}
            onMouseEnter={(e) => { e.target.style.backgroundColor = 'var(--accent-hover)'; }}
            onMouseLeave={(e) => { e.target.style.backgroundColor = 'var(--accent)'; }}
          >
            Ver proyecto
          </a>
        )}
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  titulo: PropTypes.string.isRequired,
  descripcion: PropTypes.string.isRequired,
  tecnologias: PropTypes.arrayOf(PropTypes.string),
  enlace: PropTypes.string,
  imagen: PropTypes.string,
};

export default ProjectCard;
