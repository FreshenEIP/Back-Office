const logReducer = (
  state = {
    roles: 'freshen:user',
    accessToken: '',
    refreshToken: '',
  },
  action: {
    type: string,
    roles?: string,
    accessToken?: string,
    refreshToken?: string,
  },
) => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        roles: action.roles,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      };
    case 'LOG_OUT':
      return {
        ...state,
        roles: 'freshen:user',
        accessToken: '',
        refreshToken: '',
      };
    default:
      return state;
  }
};

export default logReducer;
