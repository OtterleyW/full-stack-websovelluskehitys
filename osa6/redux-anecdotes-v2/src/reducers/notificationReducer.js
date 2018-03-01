const initialState = null

const notificationReducer = (state = initialState, action) => {
  if (action.type === 'SET_NOTIFICATION') {
    return action.notification
  }

  return state;
};

export const notificationChange = notification => {
  return {
    type: 'SET_NOTIFICATION',
    notification
  };
};

export default notificationReducer;
