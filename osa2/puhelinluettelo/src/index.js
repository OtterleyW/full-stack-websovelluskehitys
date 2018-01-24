import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const Numbers = ({ persons }) => {
  return (
    <ul>
      {persons.map(person => <Person key={person.name} person={person} />)}
    </ul>
  );
};
const Person = ({ person }) => {
  return (
    <li>
      {person.name} {person.number}
    </li>
  );
};

const Filter = props => {
  return (
    <div>
      Rajaa näytettäviä <input value={props.value} onChange={props.onChange} />
    </div>
  );
};

const Form = props => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        nimi: <input value={props.nameValue} onChange={props.nameOnChange} />
      </div>
      <div>
        numero:
        <input value={props.numberValue} onChange={props.numberOnChange} />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      newName: "",
      newNumber: "",
      filter: ""
    };
  }

  componentWillMount() {
    axios.get("http://localhost:3001/persons").then(response => {
      this.setState({ persons: response.data });
    });
  }

  addPerson = event => {
    event.preventDefault();

    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    };

    const names = this.state.persons.map(person => person.name);

    if (!names.includes(personObject.name)) {
      const persons = this.state.persons.concat(personObject);

      axios
        .post("http://localhost:3001/persons", personObject)
        .then(response => {});

      this.setState({
        persons,
        newName: "",
        newNumber: ""
      });
    } else {
      alert("Nimi on jo luettelossa!");
    }
  };

  handleNewPerson = event => {
    this.setState({ newName: event.target.value });
  };

  handleNewNumber = event => {
    this.setState({ newNumber: event.target.value });
  };

  handleFilter = event => {
    this.setState({ filter: event.target.value });
  };

  render() {
    let persons = this.state.persons;

    if (this.state.filter) {
      persons = this.state.persons.filter(person =>
        person.name.toLowerCase().match(this.state.filter.toLowerCase())
      );
    }

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Filter value={this.state.filter} onChange={this.handleFilter} />
        <h3>Lisää uusi numero</h3>
        <Form
          onSubmit={this.addPerson}
          valueName={this.state.newName}
          nameOnChange={this.handleNewPerson}
          valueNumber={this.state.newNumber}
          numberOnChange={this.handleNewNumber}
        />

        <h2>Numerot</h2>
        <Numbers persons={persons} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
