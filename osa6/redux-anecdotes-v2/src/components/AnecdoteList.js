import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import PropTypes from 'prop-types'

class AnecdoteList extends React.Component {
  render() {
    console.log(this.context.store.anecdotes)
    const anecdotes = this.context.store.getState().anecdotes
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => 
                this.context.store.dispatch(voteAnecdote(anecdote.id))
              }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

AnecdoteList.contextTypes = {
  store: PropTypes.object
}

export default AnecdoteList

