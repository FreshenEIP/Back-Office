import { Customers } from '../customer/customer';

export interface Comment {
  user: Customers;
  postId: string;
  like: Array<string>;
  reply: Array<Comment>;
  createdAt: string;
}
