import React from 'react';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { notificationChange } from '../reducers/notificationReducer';
import { connect } from 'react-redux';

class AnecdoteList extends React.Component {
  voteAnecdote = anecdote => {
    this.props.voteAnecdote(anecdote.id);
    this.props.notificationChange(`You voted anecdote: ${anecdote.content}`);

    setTimeout(() => this.props.notificationChange(null), 5000);
  };

  render() {
    let { anecdotes, filter } = this.props;

    if (filter) {
      anecdotes = anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().match(filter.toLowerCase())
      );
    }

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

const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  };
};

const ConnectedAnecdoteList = connect(mapStateToProps, {
  voteAnecdote,
  notificationChange
})(AnecdoteList);

export default ConnectedAnecdoteList;
