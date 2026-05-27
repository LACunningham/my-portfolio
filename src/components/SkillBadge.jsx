import PropTypes from 'prop-types';

const SkillBadge = ({ skill }) => {
  return (
    <span style={{
      display: 'inline-block',
      padding: '4px 14px',
      fontSize: '0.85rem',
      fontWeight: 500,
      color: 'var(--text-heading)',
      backgroundColor: 'var(--accent-light)',
      border: '1px solid var(--accent-border)',
      borderRadius: '4px',
      letterSpacing: '0.01em',
      lineHeight: 1.6
    }}>
      {skill}
    </span>
  );
};

SkillBadge.propTypes = {
  skill: PropTypes.string.isRequired,
};

export default SkillBadge;
