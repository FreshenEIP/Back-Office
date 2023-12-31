import Axios from '../utils/axios';

export const fetchFriperie = async (
  token: string,
  page: number,
  pageSize: number,
): Promise<any> => {
  const response = await Axios.get('v2/friperies', token, {
    page,
    page_size: pageSize,
  });
  return response.data;
};
