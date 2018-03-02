import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { notificationChange } from '../reducers/notificationReducer';
import { connect } from 'react-redux';

class AnecdoteForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    this.props.createAnecdote(content);

    this.props.notificationChange(`You created anecdote: ${content}`);

    setTimeout(() => this.props.notificationChange(null), 5000);

    e.target.anecdote.value = '';
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

const ConnectedAnecdoteForm = connect(
  null,
  { createAnecdote, notificationChange  }
)(AnecdoteForm);

export default ConnectedAnecdoteForm;
