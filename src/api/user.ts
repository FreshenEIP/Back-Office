import Axios from '../utils/axios';

export const login = async (data): Promise<any> => {
  const response = await Axios.post(`v2/auth/login`, '', data);
  return response.data;
};
