import Axios from '../utils/axios';

export const fetchBrands = async (
  token: string,
  page: number,
  pageSize: number,
): Promise<any> => {
  const response = await Axios.get('v2/gestion_article/brand', token, {
    page,
    pageSize,
  });
  return response.data;
};
