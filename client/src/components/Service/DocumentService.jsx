import { del, get,  patch,  post } from "../../utils/request";

export const getDocument = async (currentPage) => {
  const result = await get(`documents?page=${currentPage}`);
  return result;
};
export const findDocument = async (search, page) => {
  // console.log(search)
  const result = await get(`documents/find?query=${search}&page=${page}`);
  // console.log(search);
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

export const getRelatedDocuments = async (categoryIds) => {
  const result = await post(`documents/byCategory`, {
    category: Array.isArray(categoryIds) ? categoryIds : [categoryIds],
  });
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
  const result = await get(`categories/${id}`);
  return result;
}

export const postReportDocument = async (docId, reason, description, token) => {
  return await post(
    `reports/create/${docId}`,
    { reason, description }, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


export const changeComment = async (toId, type, commentId, content, token) => {
  return await patch(
    `comments/${toId ?? "null"}/${type}/update/${commentId}/`,
    { content },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
};

export const deleteComment = async (toId, type, commentId, token) => {
  return await del(
    `comments/${toId ?? "null"}/${type}/delete/${commentId}/`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
};
