import { CustomerList } from '../interface/routes/customers.list';
import Axios from '../utils/axios';

export const fetchCustomers = async (
  token: string,
  page: number,
  pageSize: number,
  type: string,
  username: string,
): Promise<CustomerList> => {
  if (type === '') type = undefined;
  if (username === '') type = undefined;
  const response = await Axios.get('v2/users', token, {
    page,
    pageSize,
    friperie: type,
    username,
  });
  return response.data;
};
