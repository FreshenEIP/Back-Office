import { useQuery } from 'react-query';
import { fetchUserPost } from '../api/post';

export const useFetchPosts = (token, userId) => {
  const result = useQuery(['posts', userId], () =>
    fetchUserPost(token, userId),
  );
  return result;
};
