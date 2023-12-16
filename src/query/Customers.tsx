import { useQuery } from 'react-query';
import { fetchCustomers } from '../api/customers';

export const useFetchCustomers = (
  token,
  page,
  pageSize,
  type,
  username,
  roles,
) => {
  const result = useQuery(
    ['customers', page, pageSize, type, username, roles],
    () => fetchCustomers(token, page, pageSize, type, username, roles),
  );
  return result;
};
