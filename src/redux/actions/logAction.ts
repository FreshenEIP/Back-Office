import { jwtDecode } from 'jwt-decode';

const LogIn = (accessToken: string, refreshToken) => {
  const decoded: any = jwtDecode(accessToken);
  if (decoded.roles.includes('freshen:admin'))
    return {
      type: 'LOG_IN',
      roles: 'freshen:admin',
      accessToken: 'Bearer ' + accessToken,
      refreshToken,
    };
  else if (decoded.roles.includes('freshen:author'))
    return {
      type: 'LOG_IN',
      roles: 'freshen:author',
      accessToken: 'Bearer ' + accessToken,
      refreshToken,
    };
  else
    return {
      type: 'LOG_OUT',
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
