import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle';

const Navbar = ({ tema, toggleTema }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/about', label: 'Sobre Mí' },
    { to: '/projects', label: 'Proyectos' },
    { to: '/contact', label: 'Contacto' }
  ];

  return (
    <>
      <nav style={{
        display: 'flex',
        gap: '15px',
        padding: '12px 18px',
        backgroundColor: 'var(--bg)',
        color: 'var(--text-h)',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid var(--border)',
        flexWrap: 'wrap'
      }}>
        
        <Link to="/" style={{ color: 'var(--text-h)', textDecoration: 'none', fontWeight: 600, fontSize: '18px' }}>
          Luciano Dev
        </Link>

       
        <div style={{
          display: 'none',
          gap: '20px',
          alignItems: 'center',
          '@media (min-width: 768px)': { display: 'flex' }
        }} className="d-none d-md-flex">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                color: 'var(--text-h)',
                textDecoration: 'none',
                transition: 'opacity 0.3s',
                fontSize: '16px'
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.7'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <ThemeToggle tema={tema} toggleTema={toggleTema} />
          <button
            className="d-md-none"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--text-h)',
              padding: '6px 10px',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: '18px'
            }}
            aria-label="Toggle menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0',
          padding: '16px',
          backgroundColor: 'var(--bg)',
          borderBottom: '1px solid var(--border)',
          animation: 'slideIn 0.3s ease-out'
        }} className="d-md-none">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              style={{
                color: 'var(--text-h)',
                textDecoration: 'none',
                padding: '12px 0',
                borderBottom: '1px solid var(--border)',
                transition: 'color 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--accent)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-h)'}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}

Navbar.propTypes = {
  tema: PropTypes.string.isRequired,
  toggleTema: PropTypes.func.isRequired,
};

export default Navbar;