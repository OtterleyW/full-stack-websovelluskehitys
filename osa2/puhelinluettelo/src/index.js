import React from "react";
import ReactDOM from "react-dom";

const Person = ({ person }) => {
  return <li>{person.name}</li>;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [{ name: "Arto Hellas" }],
      newName: ""
    };
  }

  addPerson = event => {
    event.preventDefault();

    const personObject = {
      name: this.state.newName
    };

    const names = this.state.persons.map(person => person.name)

    if (!names.includes(personObject.name)) {
      const persons = this.state.persons.concat(personObject);

      this.setState({
        persons,
        newName: ""
      });
    } else {alert("Nimi on jo luettelossa!")}
  };

  handleNewPerson = event => {
    this.setState({ newName: event.target.value });
  };

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addPerson}>
          <div>
            nimi:{" "}
            <input value={this.state.newName} onChange={this.handleNewPerson} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <ul>
          {this.state.persons.map(person => (
            <Person key={person.name} person={person} />
          ))}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));