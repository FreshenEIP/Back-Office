import Axios from '../utils/axios';

export const fetchNews = async (
  token: string,
  page: number,
  pageSize: number,
): Promise<any> => {
  const response = await Axios.get('v2/', token, {
    page,
    pageSize,
  });
  return response.data;
};

// export const createNews = async (data): Promise<any> => {
//   const { payload, token } = data;
//   const response = await Axios.post('v2/', token, payload);
//   return response.data;
// };

export const deleteNews = async (data: { token: string; _id }) => {
  const { token, _id } = data;
  const response = await Axios.delete(`v2/`, token);
  return response.data;
};
