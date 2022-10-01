const themeReducer = (
  state = {},
  action: { type: string; payload: string },
) => {
  switch (action.type) {
    case 'SET_MODE':
      return {
        ...state,
        mode: action.payload,
      };
    case 'SET_COLOR':
      return {
        ...state,
        color: action.payload,
      };
    default:
      return state;
  }
};

export default themeReducer;
