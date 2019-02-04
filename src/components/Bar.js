import React from 'react';
import PropTypes from 'prop-types';

const Bar = (props) => {
  const {
    x, y, width, height,
  } = props;
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      className="rect"
    />
  );
};

export default Bar;

Bar.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};

Bar.defaultProps = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};
