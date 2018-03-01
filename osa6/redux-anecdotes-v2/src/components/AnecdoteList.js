import React from 'react';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { notificationChange } from '../reducers/notificationReducer';
import PropTypes from 'prop-types';

class AnecdoteList extends React.Component {
  voteAnecdote = anecdote => {
    this.context.store.dispatch(voteAnecdote(anecdote.id));
    this.context.store.dispatch(
      notificationChange(`You voted anecdote: ${anecdote.content}`)
    );

    setTimeout(
      () => this.context.store.dispatch(notificationChange(null)),
      5000
    );
  };

  render() {
    const anecdotes = this.context.store.getState().anecdotes;
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => this.voteAnecdote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

AnecdoteList.contextTypes = {
  store: PropTypes.object
};

export default AnecdoteList;
