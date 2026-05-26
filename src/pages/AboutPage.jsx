import SkillBadge from '../components/SkillBadge';

export const AboutPage = () => {
  const habilidades = [
    'HTML5', 'CSS3', 'JavaScript (ES6+)', 'React.js',
    'Bootstrap', 'Git & GitHub', 'Node.js', 'SQL'
  ];

  const experiencia = [
    {
      puesto: 'Desarrollador Web Junior',
    }
  ];

  const educacion = [
    {
      titulo: 'Curso de Programación Web Full Stack',
    },
    {
      titulo: 'Tecnicatura Superior en Analista de Sistemas',
    }
  ];

  return (
    <div className="container py-3" style={{ animation: 'fadeInUp 0.6s ease-out' }}>
      <h1 className="display-5 fw-bold mb-4">Sobre Mí</h1>
      <section className="mb-4 text-start">
        <p className="lead">
          ¡Hola! Soy Luciano, un desarrollador front-end en formación con interés en crear experiencias web limpias y accesibles. Me gusta trabajar con React, optimizar interfaces y aprender nuevas herramientas que mejoren la calidad del código y la experiencia de usuario.
        </p>
        <p>
          Actualmente estudio programación y estoy construyendo proyectos personales para practicar patrones modernos de arquitectura web, pruebas básicas y despliegue continuo. Busco oportunidades para aplicar mis conocimientos y seguir aprendiendo.
        </p>
        <div className="mt-3 d-flex flex-wrap gap-2">
          <a href="/resume.pdf" className="btn btn-outline-secondary" target="_blank" rel="noopener noreferrer">Descargar CV</a>
          <a href="https://github.com/tuusuario" className="btn btn-outline-dark" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/" className="btn btn-outline-primary" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </section>

      <hr />

      <section className="mb-5">
        <h3 className="mb-3">Mis Habilidades</h3>
        <div className="d-flex flex-wrap gap-2">
          {habilidades.map((skill, index) => (
            <div key={index} style={{ animation: `slideIn 0.4s ease-out ${index * 0.08}s backwards` }}>
              <SkillBadge skill={skill} />
            </div>
          ))}
        </div>
      </section>

      <hr />

      <div className="row">
        <div className="col-12 col-md-6 mb-4">
          <h3 className="mb-3">Experiencia</h3>
          {experiencia.length > 0 ? (
            experiencia.map((exp, index) => (
              <div
                key={index}
                className="mb-3 p-3 border rounded shadow-sm"
                style={{ animation: 'slideIn 0.5s ease-out 0.2s backwards' }}
              >
                <h5>{exp.puesto}</h5>
                <h6 className="text-muted">{exp.empresa} | <small>{exp.periodo}</small></h6>
                <p className="mb-0 mt-2">{exp.descripcion}</p>
              </div>
            ))
          ) : (
            <p>Buscando mi primera oportunidad laboral.</p>
          )}
        </div>

        <div className="col-12 col-md-6 mb-4">
          <h3 className="mb-3">Educación</h3>
          {educacion.map((edu, index) => (
            <div
              key={index}
              className="mb-3 p-3 border rounded shadow-sm"
              style={{ animation: 'slideIn 0.5s ease-out 0.3s backwards' }}
            >
              <h5>{edu.titulo}</h5>
              <h6 className="text-muted">{edu.institucion}</h6>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <small className="text-secondary">{edu.periodo}</small>
                <span className={`badge ${edu.estado === 'Completado' ? 'bg-success' : 'bg-warning text-dark'}`}>
                  {edu.estado}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};