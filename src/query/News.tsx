import { useQuery } from 'react-query';
import { fetchNews } from '../api/news';

export const useFetchNews = (token, page, pageSize) => {
  const result = useQuery(['news', page, pageSize], () =>
    fetchNews(token, page, pageSize),
  );
  return result;
};
