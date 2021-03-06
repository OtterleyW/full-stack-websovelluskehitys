import React from "react";
import "./App.css";
import axios from "axios";

const Filter = props => {
  return (
    <div>
      find countries: <input value={props.value} onChange={props.onChange} />
    </div>
  );
};

const Results = props => {
  let resultSet = "";
  if (props.maat instanceof Array) {
    if (props.maat.length === 1) {
      resultSet = (
        <div>
          <h1>
            {props.maat[0].name} {props.maat[0].nativeName}
          </h1>
          <p>
            capital: {props.maat[0].capital} <br />
            population: {props.maat[0].population}
          </p>
          <img
            src={props.maat[0].flag}
            alt={props.maat[0].name}
            width="300px"
          />
        </div>
      );
    } else {
      console.log(props.maat);
      resultSet = (
        <ul>
          {props.maat.map(maa => (
            <li key={maa.name} onClick={() => props.onClick(maa.name)}>
              {maa.name}
            </li>
          ))}
        </ul>
      );
    }
  } else {
    resultSet = <p>{props.maat}</p>;
  }

  return resultSet;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maat: [],
      filter: ""
    };
  }

  componentWillMount() {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      this.setState({ maat: response.data });
    });
  }

  handleFilter = event => {
    this.setState({ filter: event.target.value });
  };

  pickCountry = name => {
    this.setState({ filter: name });
  };

  render() {
    let maat = this.state.persons;

    if (this.state.filter) {
      maat = this.state.maat.filter(maa =>
        maa.name.toLowerCase().match(this.state.filter.toLowerCase())
      );

      if (maat.length > 10) {
        maat = "too many maches, specify another filter";
      }
    }

    return (
      <div>
        <Filter value={this.state.filter} onChange={this.handleFilter} />
        <Results maat={maat} onClick={this.pickCountry} />
      </div>
    );
  }
}

export default App;
