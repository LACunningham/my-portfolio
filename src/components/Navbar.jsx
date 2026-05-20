import { Link } from 'react-router-dom'

const Navbar = ({ tema, toggleTema }) => {
  return (
    <nav style={{ display: 'flex', gap: '15px', padding: '15px', backgroundColor: '#222', color: '#fff', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: '15px' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Inicio</Link>
        <Link to="/about" style={{ color: '#fff', textDecoration: 'none' }}>Sobre Mí</Link>
        <Link to="/projects" style={{ color: '#fff', textDecoration: 'none' }}>Proyectos</Link>
        <Link to="/contact" style={{ color: '#fff', textDecoration: 'none' }}>Contacto</Link>
      </div>
      <button onClick={toggleTema} style={{ backgroundColor: tema === 'dark' ? '#fff' : '#333', color: tema === 'dark' ? '#333' : '#fff', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}>
        {tema === 'dark' ? '☀️ Claro' : '🌙 Oscuro'}
      </button>
    </nav>
  )
}

export default Navbar;