import { Customers } from '../customer/customer';

export interface CustomerList {
  count: number;
  page: number;
  pageSize: number;
  data: Array<Customers>;
}
