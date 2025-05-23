import { get } from "../../utils/request";

export const getDocument = async () => {
  const result = await get("documents");
  return result;
};

export const getDocumentById = async (id) => {
  const result = await get(`documents/detail/${id}`);
  return result;
};


export const getCommentByDocumentId = async (id) => {
  const result = await get(`comments/${id}`);
  return result;
};
export const getUserById = async (id) => {
 const result = await get(`users/getUser/${id}`);
  return result;
};



