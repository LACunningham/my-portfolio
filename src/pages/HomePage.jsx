import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SkillBadge from '../components/SkillBadge';
import ProjectCard from '../components/ProjectCard';

const HomePage = () => {
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const res = await fetch('./data/proyectos.json');
        const data = await res.json();
        setProyectos(data);
      } catch {
        setProyectos([]);
      }
    };
    fetchProyectos();
  }, []);

  const habilidadesPrincipales = ['React', 'JavaScript', 'Bootstrap', 'HTML5', 'CSS3', 'Git'];

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '48px 24px', animation: 'fadeInUp 0.6s ease-out' }}>
      <div style={{ marginBottom: '64px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.75rem', fontWeight: 700, marginBottom: '12px', letterSpacing: '-0.03em' }}>
          Hola, soy Luciano
        </h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginBottom: '24px', fontWeight: 400 }}>
          Desarrollador Front-End &middot; Aplicaciones web modernas
        </p>
        <p style={{ fontSize: '1rem', color: 'var(--text)', maxWidth: '600px', margin: '0 auto 32px', lineHeight: 1.7 }}>
          Bienvenido a mi portafolio. Me apasiona crear aplicaciones web modernas, eficientes e interactivas utilizando las últimas tecnologías del mercado.
        </p>

        <div style={{ marginBottom: '28px' }}>
          <p style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
            Tecnologías clave
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
            {habilidadesPrincipales.map((skill, index) => (
              <div key={index} style={{ animation: `slideIn 0.4s ease-out ${index * 0.08}s backwards` }}>
                <SkillBadge skill={skill} />
              </div>
            ))}
          </div>
        </div>

        <Link to="/contact" style={{
          display: 'inline-flex',
          alignItems: 'center',
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
          Contáctame
        </Link>
      </div>

      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 600 }}>Proyectos recientes</h3>
          <Link to="/projects" style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--accent)' }}>
            Ver todos &rarr;
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
          {proyectos.slice(0, 3).map((p, idx) => (
            <div key={p.id} style={{ animation: `slideIn 0.5s ease-out ${(idx + 3) * 0.1}s backwards` }}>
              <ProjectCard {...p} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
