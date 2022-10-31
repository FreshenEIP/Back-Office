import { CustomerList } from '../interface/routes/customers.list';
import Axios from '../utils/axios';

export const fetchCustomers = async (
  token: string,
  page: number,
  pageSize: number,
): Promise<CustomerList> => {
  const response = await Axios.get('v2/users', token, {
    page,
    pageSize,
  });
  return response.data;
};
