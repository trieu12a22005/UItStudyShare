// src/pages/DocumentDetail.jsx
import React from 'react';
import "./DocumentDetail.css"
import CommentBox from '../CommentBox/CommentBox';
import DocumentContent from '../DocumentContent/DocumentContent';
import AuthorInfo from '../AuthorInfo/AuthorInfo';
import RelatedDocument from '../RelatedDocument/RelatedDocument';
import Statistics from '../Statistics/Statistics';

const DocumentDetail = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
         <DocumentContent />
        <CommentBox />
        </div>
        <div className="space-y-6">
          {/* Author Info */}
         <AuthorInfo />
          {/* Related Documents */}
          <RelatedDocument />
          {/* Statistics */}
          <Statistics />
        </div>
      </div>

    </>
  )
};

export default DocumentDetail;
