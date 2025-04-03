import React, { useState } from 'react';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabNames = ["Nội dung", "Thông tin", "Đánh giá (28)"];

  return (
    <div className="bg-white rounded-t-xl shadow-sm">
      <div className="flex border-b">
        {tabNames.map((tab, index) => (
          <button
            key={index}
            className={`tab-button px-6 py-3 text-gray-700 ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
  