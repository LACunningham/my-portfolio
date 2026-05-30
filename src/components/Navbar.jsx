import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navbar = ({ tema, toggleTema }) => {
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/about', label: 'Sobre Mí' },
    { to: '/projects', label: 'Proyectos' },
    { to: '/contact', label: 'Contacto' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
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
        letterSpacing: '-0.01em',
        whiteSpace: 'nowrap'
      }}>
        Luciano Cunningham
      </Link>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(12px, 3vw, 32px)',
        overflow: 'hidden'
      }}>
        {navLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            style={{
              color: isActive(link.to) ? 'var(--text-heading)' : 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
              fontWeight: isActive(link.to) ? 500 : 400,
              transition: 'color 0.2s ease',
              position: 'relative',
              padding: '4px 0',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => { if (!isActive(link.to)) e.target.style.color = 'var(--text-heading)'; }}
            onMouseLeave={(e) => { if (!isActive(link.to)) e.target.style.color = 'var(--text-secondary)'; }}
          >
            {link.label}
          </Link>
        ))}
        <ThemeToggle tema={tema} toggleTema={toggleTema} />
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  tema: PropTypes.string.isRequired,
  toggleTema: PropTypes.func.isRequired,
};

export default Navbar;
