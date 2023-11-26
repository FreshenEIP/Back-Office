import toast from 'react-hot-toast';

const LogIn = (accessToken: string, refreshToken) => {
  return {
    type: 'LOG_IN',
    accessToken,
    refreshToken,
  };
};

const LogOut = () => {
  return {
    type: 'LOG_OUT',
  };
};

const exportDefault = {
  LogIn,
  LogOut,
};

export default exportDefault;
