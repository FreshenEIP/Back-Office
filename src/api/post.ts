import { PostList } from '../interface/routes/post.list';
import Axios from '../utils/axios';

export const fetchUserPost = async (
  token: string,
  userId: string,
): Promise<PostList> => {
  const response = await Axios.get(`v2/post/user/${userId}`, token, {});
  return response.data;
};

export const removePost = async (data): Promise<any> => {
  const { token, reportId, postId } = data;
  const response = await Axios.delete(`v2/post/${postId}`, token);
  await Axios.patch(`v2/report/${reportId}`, token, {});
  return response.data;
};
