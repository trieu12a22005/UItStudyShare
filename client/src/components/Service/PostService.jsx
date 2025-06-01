import { get } from "../../utils/request";

export const getPosts = async () => {
  const result = await get(`posts`);

  return result;
};