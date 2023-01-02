import { user as User } from '../customer/customer';

export interface Comment {
  user: User;
  postId: string;
  like: number;
  reply: Array<Comment>;
  createdAt: string;
}
