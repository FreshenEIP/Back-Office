import { Customers } from '../interface/customer/customer';
import { CustomerList } from '../interface/routes/customers.list';
import Axios from '../utils/axios';

export const fetchCustomers = async (
  token: string,
  page: number,
  pageSize: number,
  type: string,
  username: string,
  roles: string,
): Promise<CustomerList> => {
  if (type === '') type = undefined;
  if (username === '') username = undefined;
  if (roles === '') roles = undefined;
  const response = await Axios.get('v2/users', token, {
    page,
    pageSize,
    friperie: type,
    username,
    roles,
  });
  return response.data;
};

export const fetchCustomerById = async (
  token: string,
  userId: string,
): Promise<Customers> => {
  const response = await Axios.get(`/v2/users/${userId}`, token, {});
  return response.data;
};

export const updateCustomerRoles = async (data) => {
  const { token, userId, roles } = data;
  const response = await Axios.patch(`/v2/users/${userId}/roles`, token, {
    roles,
  });
  return response.data;
};

export const banUser = async (data): Promise<any> => {
  const { userId, block, token } = data;
  const response = await Axios.post(`v2/users/ban/${userId}`, token, {
    block: !block,
    reason: "You've been ban by the administrator",
  });
  return response.data;
};
