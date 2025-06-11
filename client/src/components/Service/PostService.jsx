import { get, patch, postform } from "../../utils/request";

export const getPosts = async () => {
  const result = await get(`posts`);
  return result;
};
export const getAllCategories = async () => {
  const result = await get(`categories`);
  return result;
};
  export const postPost = async (formData) => {
    const result = await postform(`posts/create`, formData);
    return result;
  };

export const toggleLikePost = async (postId, userId, token) => {
  const result = await patch(`posts/like/${postId}`, { userId }, token);
  return result;
};
