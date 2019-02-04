import React, { Component } from 'react';
import './App.css';
import BarChart from './components/BarChart';

class App extends Component {
  state = {
    precipitation: {},
    city: 'van',
  };

  componentDidMount() {
    Promise.all([
      fetch(`${process.env.PUBLIC_URL || ''}/van.json`),
      fetch(`${process.env.PUBLIC_URL || ''}/yel.json`),
      fetch(`${process.env.PUBLIC_URL || ''}/cal.json`),
      fetch(`${process.env.PUBLIC_URL || ''}/tor.json`),
      fetch(`${process.env.PUBLIC_URL || ''}/stj.json`),
    ])
      .then(responses => Promise.all(responses.map(resp => resp.json())))
      .then(([van, yel, cal, tor, stj]) => {
        this.setState({
          precipitation: {
            van, yel, cal, tor, stj,
          },
        });
      });
  }

  updateCity = (e) => {
    this.setState({ city: e.target.value });
  };

  render() {
    const data = this.state.precipitation[this.state.city];
    return (
      <div className="App">
        <div className="Intro">
          <h1> Rainfall in Canada </h1>
          <p>
            There are five distinct regions in Canada: the West Coast, the
            Northern Territories, the Prairie Provinces, Central Canada and
            the Atlantic Region. The West Coast precipitation is higher in
            winter than in summer. In the Prairie Provinces and in the Northern
            Territories spring and summer are wetter than winter. In Central
            Canada winter and summer precipitation levels are approximately
            the same. Rainfall is fairly evenly distributed throughout the
            year in the Atlantic Provinces.
          </p>
          <p>
            Bar charts show monthly rainfall (in mm) in Vancouver (West Coast),
            Yellowknife (Northern Territories), Calgary (Prairies), Toronto
            (Central Canada) and St. John&apos;s (Atlantic Region) in 2018.
            Data provided by
            {' '}
            {' '}
            <a
              href="https://www.canada.ca/en/environment-climate-change.html"
              target="_blank"
              rel="noopener noreferrer"
            >
            Environment and Climate Change Canada
            </a>
            {' '}
            via
            <a
              href="https://www.weatherstats.ca/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              weatherstats
            </a>
.
          </p>
        </div>
        <div className="Selector">
          <select name="city" onChange={this.updateCity}>
            {[
              { label: 'Vancouver', value: 'van' },
              { label: 'Yellowknife', value: 'yel' },
              { label: 'Calgary', value: 'cal' },
              { label: 'Toronto', value: 'tor' },
              { label: "St. John's", value: 'stj' },
            ].map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="Chart">
          <BarChart data={data} />
        </div>
      </div>
    );
  }
}

export default App;
