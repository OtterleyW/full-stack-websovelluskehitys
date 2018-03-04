const initialState = null;

const notificationReducer = (state = initialState, action) => {
  if (action.type === 'SET_NOTIFICATION') {
    return action.notification;
  }

  return state;
};

export const notificationChange = notification => {
  return {
    type: 'SET_NOTIFICATION',
    notification
  };
};

export const notify = (notification, time) => {
  console.log("Notify!", notification)
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    });

    await setTimeout(() => {
      notification = null;
      dispatch({
        type: 'SET_NOTIFICATION',
        notification
      });
    }, time * 1000);
  };
};

export default notificationReducer;