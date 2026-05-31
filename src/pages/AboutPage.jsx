import SkillBadge from '../components/SkillBadge';

export const AboutPage = () => {
  const habilidades = [
    'HTML5', 'CSS3', 'JavaScript (ES6+)', 'React.js',
    'Bootstrap', 'Git & GitHub', 'Node.js', 'SQL'
  ];

  const experiencia = [];

  const educacion = [
    {
      titulo: 'Curso de Programación Web Front End',
      institucion: 'Udemy',
      periodo: '2024 - 2025',
      estado: 'Completado'
    },
    {
      titulo: 'Tecnicatura Superior en Analista de Sistemas',
      institucion: 'Institución Cervantes',
      periodo: '2023 - 2025',
      estado: 'En curso'
    }
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 24px', animation: 'fadeInUp 0.6s ease-out' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '28px' }}>Sobre Mí</h1>

      <section style={{ marginBottom: '40px' }}>
        <p style={{ fontSize: '1rem', lineHeight: 1.8, marginBottom: '16px' }}>
          ¡Hola! Soy Luciano, un desarrollador front-end en formación con interés en crear experiencias web limpias y accesibles. Me gusta trabajar con React, optimizar interfaces y aprender nuevas herramientas que mejoren la calidad del código y la experiencia de usuario.
        </p>
        <p style={{ fontSize: '1rem', lineHeight: 1.8, marginBottom: '24px' }}>
          Actualmente estoy estudiando la carrera de Analista de Sistemas y estoy construyendo proyectos personales para practicar patrones modernos de arquitectura web, pruebas básicas y despliegue continuo. Busco oportunidades para aplicar mis conocimientos y seguir aprendiendo.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '10px 24px',
              fontSize: '0.9rem',
              fontWeight: 500,
              color: 'var(--text-heading)',
              backgroundColor: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              textDecoration: 'none',
              transition: 'border-color 0.2s ease, color 0.2s ease'
            }}
            onMouseEnter={(e) => { e.target.style.borderColor = 'var(--text-secondary)'; e.target.style.color = 'var(--text-heading)'; }}
            onMouseLeave={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--text-heading)'; }}
          >
            Descargar CV
          </a>
          <a href="https://github.com/LACunningham/" target="_blank" rel="noopener noreferrer" style={{
            padding: '10px 24px',
            fontSize: '0.9rem',
            fontWeight: 500,
            color: 'var(--text-heading)',
            backgroundColor: 'transparent',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            textDecoration: 'none',
            transition: 'border-color 0.2s ease'
          }}
            onMouseEnter={(e) => { e.target.style.borderColor = 'var(--text-secondary)'; }}
            onMouseLeave={(e) => { e.target.style.borderColor = 'var(--border)'; }}
          >
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/luciano-agustin-cunningham-martinez-a6ab0a309/" target="_blank" rel="noopener noreferrer" style={{
            padding: '10px 24px',
            fontSize: '0.9rem',
            fontWeight: 500,
            color: 'var(--accent)',
            backgroundColor: 'transparent',
            border: '1px solid var(--accent-border)',
            borderRadius: '8px',
            textDecoration: 'none',
            transition: 'background-color 0.2s ease, color 0.2s ease'
          }}
            onMouseEnter={(e) => { e.target.style.backgroundColor = 'var(--accent-light)'; }}
            onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; }}
          >
            LinkedIn
          </a>
        </div>
      </section>

      <hr />

      <section style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '16px' }}>Habilidades</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {habilidades.map((skill, index) => (
            <div key={index} style={{ animation: `slideIn 0.4s ease-out ${index * 0.06}s backwards` }}>
              <SkillBadge skill={skill} />
            </div>
          ))}
        </div>
      </section>

      <hr />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        <section>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '16px' }}>Experiencia</h3>
          {experiencia.length > 0 ? (
            experiencia.map((exp, index) => (
              <div
                key={index}
                style={{
                  padding: '20px',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  marginBottom: '12px',
                  animation: 'slideIn 0.4s ease-out backwards'
                }}
              >
                <h5 style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: 600 }}>{exp.puesto}</h5>
                {exp.empresa && <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 8px' }}>{exp.empresa}</p>}
                {exp.descripcion && <p style={{ fontSize: '0.9rem', margin: 0 }}>{exp.descripcion}</p>}
              </div>
            ))
          ) : (
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Buscando mi primera oportunidad laboral.</p>
          )}
        </section>

        <section>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '16px' }}>Educación</h3>
          {educacion.map((edu, index) => (
            <div
              key={index}
              style={{
                padding: '20px',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                marginBottom: '12px',
                animation: 'slideIn 0.4s ease-out backwards'
              }}
            >
              <h5 style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: 600 }}>{edu.titulo}</h5>
              {edu.institucion && <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 8px' }}>{edu.institucion}</p>}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{edu.periodo}</span>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  padding: '2px 10px',
                  borderRadius: '4px',
                  color: edu.estado === 'Completado' ? 'var(--success)' : 'var(--text-secondary)',
                  backgroundColor: edu.estado === 'Completado' ? 'rgba(74, 124, 89, 0.1)' : 'var(--accent-light)'
                }}>
                  {edu.estado}
                </span>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};
