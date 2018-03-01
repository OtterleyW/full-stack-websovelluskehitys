const initialState = {
  good: 0,
  ok: 0,
  bad: 0
};

const counterReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case 'GOOD':
      const newGoodState = {
        good: state.good + 1,
        ok: state.ok,
        bad: state.bad
      };

      return newGoodState;
    case 'OK':
      const newOkState = {
        good: state.good,
        ok: state.ok + 1,
        bad: state.bad
      };
      return newOkState;
    case 'BAD':
      const newaBadState = {
        good: state.good,
        ok: state.ok,
        bad: state.bad + 1
      };
      return newaBadState;
    case 'ZERO':
      const newZeroState = { good: 0, ok: 0, bad: 0 };
      return newZeroState;
  }
  return state;
};

export default counterReducer;
