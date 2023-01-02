import { CommentList } from '../interface/routes/comment.list';
import Axios from '../utils/axios';

export const fetchComments = async (
  token: string,
  page: number,
  pageSize: number,
): Promise<CommentList> => {
  const response = await Axios.get('v2/comment', token, {
    page,
    pageSize,
  });
  return response.data;
};
