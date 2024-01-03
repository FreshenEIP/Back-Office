import { useQuery } from 'react-query';
import { fetchBrands } from '../api/brands';

export const useFetchBrands = (token) => {
  const result = useQuery(['brands', 0, 25], () => fetchBrands(token, 0, 25));
  return result;
};
