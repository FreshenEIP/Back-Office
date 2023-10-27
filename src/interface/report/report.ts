import { Customers } from '../customer/customer';

export interface Report {
  type: string;
  status: string;
  reportedUser: Customers;
  category: string;
  description: string;
  createdAt: string;
  reporter: Customers;
}
