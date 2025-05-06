// src/pages/DocumentDetail.jsx
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getDocumentById } from '../../components/Service/DocumentService';

import DocumentContent from '../../components/DocumentContent/DocumentContent';
import CommentBox from '../../components/CommentBox/CommentBox';
import AuthorInfo from '../../components/AuthorInfo/AuthorInfo';
import RelatedDocument from '../../components/RelatedDocument/RelatedDocument';
import Statistics from '../../components/Statistics/Statistics';
import DocumentHeader from '../../components/DocumentHeader/DocumentHeader';
import "./DocumentDetail.css";
import { clearDocument, setDocument } from '../../redux/slices/DocumentSilce';

const DocumentDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const document = useSelector((state) => state.document.currentDocument);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const data = await getDocumentById(id);
        dispatch(setDocument(data));
      } catch (error) {
        console.error("Lỗi tải chi tiết tài liệu:", error);
      }
    };

    fetchDocument();
    return () => dispatch(clearDocument()); // clear khi thoát trang
  }, [id, dispatch]);

  if (!document) {
    return <div className="text-center py-10 text-gray-600">Đang tải tài liệu...</div>;
  }

  return (
    <div className="w-[70%] mx-auto">
      <DocumentHeader />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DocumentContent />
          <CommentBox />
        </div>
        <div className="space-y-6">
          <AuthorInfo />
          <RelatedDocument />
          <Statistics />
        </div>
      </div>
    </div>
  );
};

export default DocumentDetail;
