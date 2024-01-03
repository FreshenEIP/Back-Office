import { useQuery } from 'react-query';
import { fetchComments } from '../api/comments';

export const useFetchComment = (token, page, pageSize) => {
  const result = useQuery(['comments', page, pageSize], () =>
    fetchComments(token, page, pageSize),
  );
  return result;
};
