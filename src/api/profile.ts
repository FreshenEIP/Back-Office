import Axios from '../utils/axios';

export const fetchProfile = async (token): Promise<any> => {
  const response = await Axios.get('v2/profile', token, {});
  return response.data;
};
