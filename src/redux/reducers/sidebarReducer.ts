const sidebarReducer = (
  state = { index: 0 },
  action: { type: string; index: number },
) => {
  switch (action.type) {
    case 'SET_SIDEBAR_INDEX':
      return {
        ...state,
        index: action.index,
      };
    default:
      return state;
  }
};

export default sidebarReducer;
