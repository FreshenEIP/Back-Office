import { Customers } from '../customer/customer';

export interface Comment {
  _id: string;
  user: Customers;
  message: string;
  postId: string;
  like: Array<string>;
  reply: Array<Comment>;
  createdAt: string;
}
