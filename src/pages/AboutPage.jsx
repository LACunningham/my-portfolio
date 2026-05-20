import SkillBadge from '../components/SkillBadge';

export const AboutPage = () => {
  // Datos para renderizar dinámicamente con .map()
  const habilidades = [
    'HTML5', 'CSS3', 'JavaScript (ES6+)', 'React.js', 
    'Bootstrap', 'Git & GitHub', 'Node.js', 'SQL'
  ];

  const experiencia = [
    {
      puesto: 'Desarrollador Front-End Trainee',
      empresa: 'Freelance / Proyectos Propios',
      periodo: '2025 - Presente',
      descripcion: 'Creación de interfaces web responsivas y funcionales utilizando React y Bootstrap. Control de versiones con Git.'
    }
  ];

  const educacion = [
    {
      titulo: 'Curso de Programación Web Full Stack',
      institucion: 'Institución / Universidad',
      periodo: '2025',
      estado: 'Completado'
    },
    {
      titulo: 'Tecnicatura en Programación / Carrera Afín',
      institucion: 'Tu Instituto',
      periodo: 'En curso',
      estado: 'Cursando'
    }
  ];

  return (
    <div className="container py-3">
      <h1 className="display-5 fw-bold mb-4">Sobre Mí</h1>
      
      {/* 1. Descripción Personal */}
      <section className="mb-5">
        <p className="lead">
          ¡Hola! Soy un apasionado por la tecnología y el desarrollo de software. Me encanta resolver problemas mediante el código y aprender herramientas nuevas todos los días. Mi objetivo actual es insertarme en el mundo laboral para aportar mis conocimientos en React y seguir creciendo profesionalmente.
        </p>
      </section>

      <hr />

      {/* 2. Habilidades con Badges (Requisito) */}
      <section className="mb-5">
        <h3 className="mb-3">Mis Habilidades</h3>
        <div className="d-flex flex-wrap">
          {habilidades.map((skill, index) => (
            <SkillBadge key={index} skill={skill} />
          ))}
        </div>
      </section>

      <hr />

      <div className="row">
        {/* 3. Experiencia Laboral */}
        <div className="col-md-6 mb-4">
          <h3 className="mb-3">Experiencia</h3>
          {experiencia.length > 0 ? (
            experiencia.map((exp, index) => (
              <div key={index} className="mb-3 p-3 border rounded shadow-sm">
                <h5>{exp.puesto}</h5>
                <h6 className="text-muted">{exp.empresa} | <small>{exp.periodo}</small></h6>
                <p className="mb-0 mt-2">{exp.descripcion}</p>
              </div>
            ))
          ) : (
            <p>Buscando mi primera oportunidad laboral.</p>
          )}
        </div>

        {/* 4. Educación */}
        <div className="col-md-6 mb-4">
          <h3 className="mb-3">Educación</h3>
          {educacion.map((edu, index) => (
            <div key={index} className="mb-3 p-3 border rounded shadow-sm">
              <h5>{edu.titulo}</h5>
              <h6 className="text-muted">{edu.institucion}</h6>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <small className="text-secondary">{edu.periodo}</small>
                {/* Renderizado condicional para destacar si está cursando o completado */}
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