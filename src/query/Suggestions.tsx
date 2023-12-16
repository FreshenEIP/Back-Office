import { useQuery } from 'react-query';
import { fetchSuggestions } from '../api/suggestion';

export const useFetchSuggestions = (token, page, pageSize) => {
  const result = useQuery(['suggestions', page, pageSize], () =>
    fetchSuggestions(token, page, pageSize),
  );
  return result;
};
