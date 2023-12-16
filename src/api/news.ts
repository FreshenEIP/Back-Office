import Axios from '../utils/axios';

export const fetchNews = async (
  token: string,
  page: number,
  pageSize: number,
): Promise<any> => {
  const response = await Axios.get('v2/news', token, {
    page,
    pageSize,
  });
  return response.data;
};

export const createNews = async (data): Promise<any> => {
  const { payload, token } = data;
  const response = await Axios.post('v2/news', token, payload);
  return response.data;
};

export const updateNews = async (data): Promise<any> => {
  const { payload, id, token } = data;
  const response = await Axios.patch(`v2/news/${id}`, token, payload);
  return response.data;
};

export const deleteNews = async (data: { token: string; id: string }) => {
  const { token, id } = data;
  const response = await Axios.delete(`v2/news/${id}`, token);
  return response.data;
};
