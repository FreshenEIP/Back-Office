const logReducer = (
  state = {
    roles: 'freshen:user',
    username: '',
    accessToken: '',
    refreshToken: '',
  },
  action: {
    type: string;
    roles: string;
    username: string;
    accessToken: string;
    refreshToken: string;
  },
) => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        roles: action.roles,
        username: action.username,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      };
    case 'LOG_OUT':
      return {
        ...state,
        roles: 'freshen:user',
        username: '',
        accessToken: '',
        refreshToken: '',
      };
    case 'CHANGE_USERNAME':
      return {
        ...state,
        username: action.username,
      };
    default:
      return state;
  }
};

export default logReducer;
