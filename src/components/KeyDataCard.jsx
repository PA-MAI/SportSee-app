import React from 'react';
import PropTypes from 'prop-types';
//import '../../styles/css/keydata.css'; // Si tu veux un fichier dédié

const KeyDataCard = ({ icon, alt, value, label, unit, className }) => {
  return (
    <div className="result__article">
      <img src={icon} className={className} alt={alt} />
      <div className="result__keydata">
        <span className="result__keydata--data">{value}{unit}</span>
        <span>{label}</span>
      </div>
    </div>
  );
};

KeyDataCard.propTypes = {
  icon: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  unit: PropTypes.string,
  className: PropTypes.string
};

export default KeyDataCard;