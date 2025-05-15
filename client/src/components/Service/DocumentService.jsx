import { get } from "../../utils/request";

export const getDocument = async () => {
  const result = await get("document");
  return result;
};

export const getDocumentById = async (id) => {
  const result = await get(`document/detail/${id}`);
  return result;
};

