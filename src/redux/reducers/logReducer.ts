import config from '../../config';

const logReducer = (
  state = {
    roles: 'freshen:admin',
    accessToken: config.TOKEN,
    refreshToken: '',
  },
  action: { type: string; accessToken?: string; refreshToken?: string },
) => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      };
    case 'LOG_OUT':
      return {
        ...state,
        accessToken: '',
        refreshToken: '',
      };
    default:
      return state;
  }
};

export default logReducer;
