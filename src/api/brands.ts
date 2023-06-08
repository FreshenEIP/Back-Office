import { BrandsList } from '../interface/routes/brands.list';
import Axios from '../utils/axios';

export const fetchBrands = async (
  token: string,
  page: number,
  pageSize: number,
): Promise<BrandsList> => {
  const response = await Axios.get('v2/gestion_article/brand', token, {
    page,
    pageSize,
  });
  return response.data;
};
