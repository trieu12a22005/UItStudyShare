import { get, post } from "../../utils/request";

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


export const postComment = async ({ docId, content, toReply = null, idUser }) => {
  const result = await post(`comments/${docId}/doc/create/${toReply || "null"}/`, {
    content,
    toReply,
    idUser,
  });
  return result;
};
export const deleteComment = async (commentId) => {
  const result = await post(`comments/${commentId}/delete`);
  return result;
};
export const editComment = async (commentId, newContent) => {
  const result = await post(`comments/${commentId}/edit`, {
    content: newContent,
  });
  return result;
};


