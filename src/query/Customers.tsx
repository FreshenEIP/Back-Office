import { useQuery } from 'react-query';
import { fetchCustomerById, fetchCustomers } from '../api/customers';

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

export const useFetchCustomerId = (token, userId) => {
  const result = useQuery(['customer', userId], () =>
    fetchCustomerById(token, userId),
  );
  return result;
};
