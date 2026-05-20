import PropTypes from 'prop-types';

const ProjectCard = ({ titulo, descripcion, tecnologias, enlace, imagen }) => {
  return (
    <div className="card shadow-sm h-100">
      {imagen && <img src={imagen} className="card-img-top" alt={titulo} />}
      <div className="card-body">
        <h5 className="card-title">{titulo}</h5>
        <p className="card-text">{descripcion}</p>
        <div className="mb-3">
          {tecnologias && tecnologias.map((tech, idx) => (
            <span key={idx} className="badge bg-info me-2 mb-2">{tech}</span>
          ))}
        </div>
        {enlace && (
          <a href={enlace} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
            Ver Proyecto
          </a>
        )}
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  titulo: PropTypes.string.isRequired,
  descripcion: PropTypes.string.isRequired,
  tecnologias: PropTypes.arrayOf(PropTypes.string),
  enlace: PropTypes.string,
  imagen: PropTypes.string,
};

export default ProjectCard;