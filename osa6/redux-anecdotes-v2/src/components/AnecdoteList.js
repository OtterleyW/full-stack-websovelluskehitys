import React from 'react';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { notify } from '../reducers/notificationReducer';
import { connect } from 'react-redux';

class AnecdoteList extends React.Component {
  handleVoteAnecdote = async anecdote => {
    this.props.voteAnecdote(anecdote);

    this.props.notify(`you voted anecdote: '${anecdote.content}'`, 5)

  };

  render() {
    const { anecdotes } = this.props;

    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote => {
          return (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button onClick={() => this.handleVoteAnecdote(anecdote)}>
                  vote
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const filterAnecdotes = (anecdotes, filter) => {
  let filteredAnecdotes = anecdotes;

  if (filter) {
    filteredAnecdotes = anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().match(filter.toLowerCase())
    );
  }

  return filteredAnecdotes;
};

const mapStateToProps = state => {
  return {
    anecdotes: filterAnecdotes(state.anecdotes, state.filter)
  };
};

const ConnectedAnecdoteList = connect(mapStateToProps, {
  voteAnecdote,
  notify
})(AnecdoteList);

export default ConnectedAnecdoteList;
