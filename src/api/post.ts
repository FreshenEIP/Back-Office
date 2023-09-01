import { PostList } from '../interface/routes/post.list';
import Axios from '../utils/axios';

export const fetchUserPost = async (
  token: string,
  userId: string,
): Promise<PostList> => {
  const response = await Axios.get(`v2/post/user/${userId}`, token, {});
  return response.data;
};
