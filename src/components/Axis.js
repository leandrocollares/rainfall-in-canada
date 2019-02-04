import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class Axis extends Component {
  static propTypes = {
    orientation: PropTypes.oneOf(['Top', 'Right', 'Bottom', 'Left']),
    scale: PropTypes.func,
    xTransform: PropTypes.number,
    yTransform: PropTypes.number,
    className: PropTypes.string,
  };

  static defaultProps = {
    orientation: 'Left',
    xTransform: 0,
    yTransform: 0,
    className: null,
  };

  axisRef = React.createRef();

  componentDidMount() {
    this.updateAxis();
  }

  componentDidUpdate() {
    this.updateAxis();
  }

  updateAxis() {
    const { orientation, scale } = this.props;

    d3.select(this.axisRef.current)
      .transition()
      .duration(500)
      .call(d3[`axis${orientation}`](scale));
  }

  render() {
    const { xTransform, yTransform, className } = this.props;
    return (
      <g
        ref={this.axisRef}
        transform={`translate(${xTransform}, ${yTransform})`}
        className={className}
      />
    );
  }
}

export default Axis;
