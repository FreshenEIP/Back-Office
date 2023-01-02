import { Comment } from '../comment/comment';

export interface CommentList {
  count: number;
  page: number;
  pageSize: number;
  data: Array<Comment>;
}
