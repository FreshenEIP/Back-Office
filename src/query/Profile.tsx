import { useQuery } from 'react-query';
import { fetchProfile } from '../api/profile';

export const useFetchProfile = (token) => {
  const result = useQuery(['profile'], () => fetchProfile(token));
  return result;
};
