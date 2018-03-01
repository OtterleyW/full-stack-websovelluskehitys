import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'
import PropTypes from 'prop-types'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.context.store.dispatch(createAnecdote(content))

    this.context.store.dispatch(
      notificationChange(`You created anecdote: ${content}`)
    );

    setTimeout(
      () => this.context.store.dispatch(notificationChange(null)),
      5000
    );
  
    e.target.anecdote.value = ''
  }
   render() {
     return (
       <div>
      <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button> 
        </form>
      </div>
     )
   }
}

AnecdoteForm.contextTypes = {
  store: PropTypes.object
}

export default AnecdoteForm
