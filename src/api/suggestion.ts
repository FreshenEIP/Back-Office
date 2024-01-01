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

export const deleteSuggestion = async (data: {
  token: string;
  id: string;
}): Promise<any> => {
  const { token, id } = data;
  const response = await Axios.delete(`v2/suggestion/${id}`, token, {});
  return response.data;
};
