import { useQuery } from 'react-query';
import { fetchReports } from '../api/reports';

export const useFetchReports = (token, page, pageSize, status) => {
  const result = useQuery(['reports', page, pageSize, status], () =>
    fetchReports(token, page, pageSize, status),
  );
  return result;
};
