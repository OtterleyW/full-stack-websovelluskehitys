import anecdoteService from '../services/anecdotes';

const anecdoteReducer = (state = [], action) => {
  if (action.type === 'VOTE') {
    const old = state.filter(a => a.id !== action.data.id);
    const voted = state.find(a => a.id === action.data.id);

    return [...old, { ...voted, votes: voted.votes + 1 }];
  }
  if (action.type === 'CREATE') {
    return [
      ...state,
      { content: action.data.content, id: action.data.id, votes: 0 }
    ];
  }
  if (action.type === 'INIT_ANECDOTES') {
    return action.data;
  }

  return state;
};

export const voteAnecdote = anecdote => {
  console.log("Anecdote", anecdote)
  return async dispatch => {
    const newAnecdote = {
      content: anecdote.content,
      id: anecdote.id,
      votes: anecdote.votes + 1
    };

    await anecdoteService.update(newAnecdote);

    dispatch({
      type: 'VOTE',
      data: anecdote
    });
  };
};

export const createAnecdote = data => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(data);
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    });
  };
};

export const anecdoteInitialization = data => {
  return async dispatch => {
    const notes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: notes
    });
  };
};

export default anecdoteReducer;
