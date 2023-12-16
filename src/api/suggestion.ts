import Axios from '../utils/axios';

export const fetchSuggestions = async (
  token: string,
  page: number,
  pageSize: number,
): Promise<any> => {
  const response = await Axios.get('v2/suggestion', token, {
    page,
    pageSize,
  });
  return response.data;
};
