import Axios from '../utils/axios';

export const fetchProfile = async (token): Promise<any> => {
  const response = await Axios.get('v2/profile', token, {});
  console.log(response);
  return response.data;
};

export const updateProfile = async (data): Promise<any> => {
  const { payload, token } = data;
  const response = await Axios.patch('v2/users/username', token, payload);
  return response.data;
};
