import React from 'react';
import Notification from './components/Notification';
import Filter from './components/Filter';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import { anecdoteInitialization } from './reducers/anecdoteReducer';
import anecdoteService from './services/anecdotes';
import { connect } from 'react-redux'


class App extends React.Component {
  componentDidMount = async () => {
    const anecdotes = await anecdoteService.getAll()
    this.props.anecdoteInitialization(anecdotes)
  }

  render() {
    return (
      <div>
      <h1>Programming anecdotes</h1>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
    )
  }
}

export default connect(
  null,
  { anecdoteInitialization }
)(App)

