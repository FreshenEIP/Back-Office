import { Comment } from '../comment/comment';
import { Customers } from '../customer/customer';

export interface Report {
  _id: string;
  type: string;
  status: string;
  reportedUser: Customers;
  category: string;
  description: string;
  createdAt: string;
  reporterUser: Customers;
  comment?: Comment;
  post?: any;
}
