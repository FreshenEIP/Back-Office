import { useQuery } from 'react-query';
import { fetchFriperie } from '../api/friperie';

export const useFetchFriperie = (token, page, pageSize) => {
  const result = useQuery(['friperie', page, pageSize], () =>
    fetchFriperie(token, page, pageSize),
  );
  return result;
};
