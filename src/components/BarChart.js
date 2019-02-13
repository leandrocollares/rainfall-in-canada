import React, { Component } from 'react';
import * as d3 from 'd3';

import Bar from './Bar';
import Axis from './Axis';

const margin = {
  top: 20, right: 10, bottom: 30, left: 35,
};
const width = 750 - margin.left - margin.right;
const height = 300 - margin.top - margin.bottom;

class BarChart extends Component {
  state = {
    bars: [],
    xScale: null,
    yScale: null,
  };

  static getDerivedStateFromProps(nextProps) {
    const { data } = nextProps;

    if (!data) return {};

    const xScale = d3
      .scaleBand()
      .domain(data.map(d => d.month))
      .rangeRound([0, width])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.rainfall)])
      .range([height, 0])
      .nice();

    const bars = data.map(d => ({
      x: xScale(d.month),
      y: yScale(d.rainfall),
      height: height - yScale(d.rainfall),
      width: xScale.bandwidth(),
    }));

    return { xScale, yScale, bars };
  }

  render() {
    const { xScale, yScale, bars } = this.state;
    if (!xScale || !yScale) return null;

    return (
      <svg
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {bars.map(d => (
            <Bar x={d.x} y={d.y} width={d.width} height={d.height} key={d.x} />
          ))}
          <Axis
            orientation="Bottom"
            scale={xScale}
            xTransform={0}
            yTransform={height}
            className="XAxis"
          />
          <Axis
            orientation="Left"
            xTransform={0}
            yTransform={0}
            scale={yScale}
            className={null}
          />
        </g>
      </svg>
    );
  }
}

export default BarChart;
