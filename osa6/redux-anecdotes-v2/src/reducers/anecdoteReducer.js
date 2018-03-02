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

export const voteAnecdote = id => {
  return {
    type: 'VOTE',
    data: { id }
  };
};

export const createAnecdote = data => {
  return {
    type: 'CREATE',
    data
  };
};

export const anecdoteInitialization = data => {
  return {
    type: 'INIT_ANECDOTES',
    data
  };
};

export default anecdoteReducer;
