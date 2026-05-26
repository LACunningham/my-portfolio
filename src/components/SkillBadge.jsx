import PropTypes from 'prop-types';

const SkillBadge = ({ skill }) => {
  return (
    <span className="badge bg-secondary p-2 m-1 fs-6">
      {skill}
    </span>
  );
};


SkillBadge.propTypes = {
  skill: PropTypes.string.isRequired,
};

export default SkillBadge;