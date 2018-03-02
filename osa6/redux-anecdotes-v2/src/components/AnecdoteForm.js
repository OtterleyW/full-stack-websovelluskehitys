import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { notificationChange } from '../reducers/notificationReducer';
import { connect } from 'react-redux';
import anecdoteService from '../services/anecdotes';

class AnecdoteForm extends React.Component {
  handleSubmit = async e => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = '';

    const newAnecdote = await anecdoteService.createNew(content);

    this.props.createAnecdote(newAnecdote);

    this.props.notificationChange(
      `You created anecdote: ${newAnecdote.content}`
    );

    setTimeout(() => this.props.notificationChange(null), 5000);
  };
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input name="anecdote" />
          </div>
          <button>create</button>
        </form>
      </div>
    );
  }
}

const ConnectedAnecdoteForm = connect(null, {
  createAnecdote,
  notificationChange
})(AnecdoteForm);

export default ConnectedAnecdoteForm;
