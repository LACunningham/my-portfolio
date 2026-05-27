import PropTypes from 'prop-types';

const ThemeToggle = ({ tema, toggleTema }) => {
  return (
    <button
      onClick={toggleTema}
      aria-label="Alternar tema claro/oscuro"
      title={tema === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      style={{
        background: 'transparent',
        border: '1px solid var(--border)',
        color: 'var(--text-secondary)',
        padding: '6px 10px',
        borderRadius: 6,
        cursor: 'pointer',
        fontSize: '0.85rem',
        fontWeight: 500,
        transition: 'color 0.2s ease, border-color 0.2s ease',
        lineHeight: 1
      }}
      onMouseEnter={(e) => { e.target.style.color = 'var(--text-heading)'; e.target.style.borderColor = 'var(--text-secondary)'; }}
      onMouseLeave={(e) => { e.target.style.color = 'var(--text-secondary)'; e.target.style.borderColor = 'var(--border)'; }}
    >
      {tema === 'dark' ? 'Claro' : 'Oscuro'}
    </button>
  );
};

ThemeToggle.propTypes = {
  tema: PropTypes.string.isRequired,
  toggleTema: PropTypes.func.isRequired,
};

export default ThemeToggle;
