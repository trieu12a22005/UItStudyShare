import { del, get, patch, post } from "../../utils/request";

// ===== 📄 DOCUMENT API =====
export const getDocument = async (currentPage) => {
  return await get(`documents?page=${currentPage}`);
};

export const findDocument = async (search, page) => {
  return await get(`documents/find?query=${search}&page=${page}`);
};

export const getDocumentById = async (id) => {
  return await get(`documents/detail/${id}`);
};

export const getNameCategoryById = async (id) => {
  return await get(`categories/${id}`);
};

export const getRelatedDocuments = async (categoryIds) => {
  return await post(`documents/byCategory`, {
    category: Array.isArray(categoryIds) ? categoryIds : [categoryIds],
  });
};

export const increaseDownloadCount = async (id) => {
  return await get(`documents/download/${id}`);
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

export const postReportDocument = async (docId, reason, description, token) => {
  return await post(
    `reports/create/${docId}/doc`,
    { reason, description },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// ===== 👤 USER API =====
export const getUserById = async (id) => {
  return await get(`users/getUser/${id}`);
};

// ===== 💬 COMMENT API (dùng chung cho doc & post) =====

// Lấy comment theo ID (dùng cho cả doc & post)
export const getCommentByType = async (toId) => {
  return await get(`comments/${toId}`);
};

// Tạo bình luận (cho doc hoặc post)
export const postComment = async ({ docId, postId, content, toReply = null, idUser }) => {
  const toId = docId || postId;
  const type = docId ? "doc" : "post";
  return await post(`comments/${toId}/${type}/create/${toReply || "null"}/`, {
    content,
    toReply,
    idUser,
  });
};

// Cập nhật bình luận
export const changeComment = async (toId, type, commentId, content, token) => {
  return await patch(
    `comments/${toId ?? "null"}/${type}/update/${commentId}/`,
    { content },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

// Xóa bình luận
export const deleteComment = async (toId, type, commentId, token) => {
  return await del(
    `comments/${toId ?? "null"}/${type}/delete/${commentId}/`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
