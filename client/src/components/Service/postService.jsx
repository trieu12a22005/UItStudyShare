import { get } from "../../utils/request";

export const getPost = async () => {
  const result = await get("document");
  return result;
};

