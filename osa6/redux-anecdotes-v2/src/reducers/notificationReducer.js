const initialState = "Testi notifikaatio"

const notificationReducer = (state = initialState, action) => {
  if (action.type === 'SET_NOTIFICATION') {
 console.log("Set notification")
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
