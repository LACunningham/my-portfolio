import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navbar = ({ tema, toggleTema }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/about', label: 'Sobre Mí' },
    { to: '/projects', label: 'Proyectos' },
    { to: '/contact', label: 'Contacto' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        height: '60px',
        backgroundColor: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(8px)',
        backgroundClip: 'padding-box'
      }}>
        <Link to="/" style={{
          color: 'var(--text-heading)',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: '1.1rem',
          letterSpacing: '-0.01em'
        }}>
          Luciano Cunningham
        </Link>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px'
        }} className="d-none d-md-flex">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                color: isActive(link.to) ? 'var(--text-heading)' : 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: isActive(link.to) ? 500 : 400,
                transition: 'color 0.2s ease',
                position: 'relative',
                padding: '4px 0'
              }}
              onMouseEnter={(e) => { if (!isActive(link.to)) e.target.style.color = 'var(--text-heading)'; }}
              onMouseLeave={(e) => { if (!isActive(link.to)) e.target.style.color = 'var(--text-secondary)'; }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <ThemeToggle tema={tema} toggleTema={toggleTema} />
          <button
            className="d-md-none"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--text-heading)',
              padding: '6px 10px',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: '1.1rem',
              lineHeight: 1
            }}
            aria-label="Abrir menú"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '8px 0',
          backgroundColor: 'var(--bg-card)',
          borderBottom: '1px solid var(--border)',
          animation: 'slideIn 0.25s ease-out'
        }} className="d-md-none">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              style={{
                color: isActive(link.to) ? 'var(--text-heading)' : 'var(--text)',
                textDecoration: 'none',
                padding: '12px 24px',
                fontSize: '0.95rem',
                fontWeight: isActive(link.to) ? 500 : 400,
                transition: 'background 0.2s ease',
                background: isActive(link.to) ? 'var(--accent-light)' : 'transparent'
              }}
              onMouseEnter={(e) => { e.target.style.background = 'var(--accent-light)'; }}
              onMouseLeave={(e) => { if (!isActive(link.to)) e.target.style.background = 'transparent'; }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

Navbar.propTypes = {
  tema: PropTypes.string.isRequired,
  toggleTema: PropTypes.func.isRequired,
};

export default Navbar;
