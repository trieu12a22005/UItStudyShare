import { get,  post } from "../../utils/request";

export const getDocument = async (currentPage) => {
  const result = await get(`documents?page=${currentPage}`);
  return result;
};
export const findDocument = async (search, page) => {
  console.log(search)
  const result = await get(`documents/find?query=${search}&page=${page}`);
  console.log(search);
  return result;
};
export const getDocumentById = async (id) => {
  // console.log("GỌI API GET DOCUMENT", id); // để kiểm tra thực sự gọi không
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
export const increaseDownloadCount = async (id) => {
  return await get(`documents/download/${id}`);
};

export const getRelatedDocuments = async (category_id) => {
  const result = await get(`documents/byCategory/${category_id}`);
  return result;
};
export const rateDocument = async (docId, score, token) => {
  return await post(
    `documents/rate/${docId}`,
    { score },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const postComment = async ({ docId, content, toReply = null, idUser }) => {
  const result = await post(`comments/${docId}/doc/create/${toReply || "null"}/`, {
    content,
    toReply,
    idUser,
  });
  return result;
};
export const getNameCategoryById = async (id) => {
  const result = await get(`category/${id}`);
  return result;
}