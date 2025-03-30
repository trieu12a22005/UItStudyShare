import { get } from "../../utils/request";

export const getPost = async () => {
  const result = await get("products");
  return result;
};

