import DocumentItem from "../../pages/Document/DocumentItem";


const DocumentList = ({ documents }) => {
    if (documents.length === 0) {
        return <p className="text-center text-gray-500">Không có tài liệu nào.</p>;
    }

    return (
        <>
            {documents.map((item) => (
                <DocumentItem key={item._id} props={{ item }} />
            ))}
        </>
    );
};

export default DocumentList;
