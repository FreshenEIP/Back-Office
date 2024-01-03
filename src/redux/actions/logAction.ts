import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';

const LogIn = (accessToken: string, refreshToken) => {
  const decoded: any = jwtDecode(accessToken);
  if (decoded.roles.includes('freshen:admin')) {
    toast.success('Successfully logged-in');
    return {
      type: 'LOG_IN',
      roles: 'freshen:admin',
      username: decoded.username,
      accessToken: 'Bearer ' + accessToken,
      refreshToken,
    };
  } else if (decoded.roles.includes('freshen:author')) {
    toast.success('Successfully logged-in');
    return {
      type: 'LOG_IN',
      roles: 'freshen:author',
      username: decoded.username,
      accessToken: 'Bearer ' + accessToken,
      refreshToken,
    };
  } else {
    toast.error("You can't log as user");
    return {
      type: 'LOG_OUT',
    };
  }
};

const ChangeUserName = (username) => {
  return {
    type: 'CHANGE_USERNAME',
    username,
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
  ChangeUserName,
};

export default exportDefault;
