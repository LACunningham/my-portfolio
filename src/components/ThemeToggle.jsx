const ThemeToggle = ({ tema, toggleTema }) => {
  return (
    <button
      onClick={toggleTema}
      aria-label="Alternar tema claro/oscuro"
      title={tema === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      style={{
        background: 'transparent',
        border: '1px solid var(--border)',
        color: 'var(--text-h)',
        padding: '6px 10px',
        borderRadius: 6,
        cursor: 'pointer'
      }}
    >
      {tema === 'dark' ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;
