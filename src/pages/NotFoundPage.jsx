import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '80px 24px', animation: 'fadeInUp 0.6s ease-out' }}>
      <h1 style={{ fontSize: '4rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-heading)' }}>404</h1>
      <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '32px' }}>
        Página no encontrada
      </p>
      <Link to="/" style={{
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
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFoundPage;
