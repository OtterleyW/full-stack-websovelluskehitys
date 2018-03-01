const initialState = null;

const filterReducer = (state = initialState, action) => {
  if (action.type === 'FILTER') {
   return action.filter;
  }

  return state;
};

export const filterData = filter => {
  return {
    type: 'FILTER',
    filter
  };
};

export default filterReducer;
