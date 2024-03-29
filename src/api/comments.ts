import { CommentList } from '../interface/routes/comment.list';
import Axios from '../utils/axios';

export const fetchComments = async (
  token: string,
  page: number,
  pageSize: number,
): Promise<CommentList> => {
  const response = await Axios.get('v2/comment', token, {
    page,
    page_size: pageSize,
  });
  return response.data;
};

export const removeComment = async (data): Promise<any> => {
  const { token, reportId, commentId } = data;
  const response = await Axios.delete(`v2/comment/${commentId}`, token);
  if (reportId !== undefined)
    await Axios.patch(`v2/report/${reportId}`, token, {});
  return response.data;
};
