// src/pages/DocumentDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDocumentById } from '../../components/Service/DocumentService';
import { useAuth } from '../../hooks/AuthContext'; // ✅ thêm dòng này

import DocumentContent from '../../components/DocumentContent/DocumentContent';
import CommentBox from '../../components/CommentBox/CommentBox';
import AuthorInfo from '../../components/AuthorInfo/AuthorInfo';
import RelatedDocument from '../../components/RelatedDocument/RelatedDocument';
import Statistics from '../../components/Statistics/Statistics';
import DocumentHeader from '../../components/DocumentHeader/DocumentHeader';
import "./DocumentDetail.css";

const DocumentDetail = () => {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user: authUser, token: authToken } = useAuth(); // ✅ lấy từ context

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const data = await getDocumentById(id);
        setDocument(data.document); // ✅ lấy object document từ API
      } catch (error) {
        console.error("Lỗi tải chi tiết tài liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [id]);
  // console.log("authUser:", authUser);

  if (loading) {
    return <div className="text-center py-10 text-gray-600">Đang tải tài liệu...</div>;
  }

  if (!document) {
    return <div className="text-center py-10 text-red-500">Không tìm thấy tài liệu.</div>;
  }

  return (
    <div className="w-[70%] mx-auto">
      <DocumentHeader document={document} userId={authUser?.idUser} token={authToken} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DocumentContent document={document} />
          <CommentBox
            userId={authUser?.idUser}
            token={authToken}
            id={document._id} // ✅ truyền id tài liệu
            type="doc"        // ✅ truyền loại là doc
          />

        </div>
        <div className="space-y-6">
          <AuthorInfo document={document} />
          <RelatedDocument document={document} />
          <Statistics document={document} />
        </div>
      </div>
    </div>
  );
};

export default DocumentDetail;
