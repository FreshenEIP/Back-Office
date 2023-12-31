import { jwtDecode } from 'jwt-decode';

const LogIn = (accessToken: string, refreshToken) => {
  const decoded: any = jwtDecode(accessToken);
  if (decoded.roles.includes('freshen:admin'))
    return {
      type: 'LOG_IN',
      roles: 'freshen:admin',
      username: decoded.username,
      accessToken: 'Bearer ' + accessToken,
      refreshToken,
    };
  else if (decoded.roles.includes('freshen:author'))
    return {
      type: 'LOG_IN',
      roles: 'freshen:author',
      username: decoded.username,
      accessToken: 'Bearer ' + accessToken,
      refreshToken,
    };
  else
    return {
      type: 'LOG_OUT',
    };
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
