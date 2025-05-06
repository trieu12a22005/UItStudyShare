import { useEffect, useState } from "react";
import { getDocument} from "../../components/Service/DocumentService";
import { useAuth } from "../../hooks/AuthContext";
import { Link } from "react-router-dom";
import DocumentItem from "./DocumentItem";
import "./Document.scss";

function Document() {
  const { isLogin } = useAuth();
  const [document, setDocument] = useState([]);
  const [loading, setLoading] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);

  // Khi trạng thái đăng nhập thay đổi → quyết định có fetch tài liệu hay không
  useEffect(() => {
    if (isLogin) {
      setShouldFetch(true);
    } else {
      setDocument([]); // đăng xuất thì clear dữ liệu
    }
  }, [isLogin]);

  // Thực hiện gọi API khi cần
  useEffect(() => {
    if (!shouldFetch) return;

    const fetchApi = async () => {
      setLoading(true);
      try {
        const result = await getDocument();
        setDocument(result);
      } catch (err) {
        console.error("Lỗi tải tài liệu:", err);
      } finally {
        setLoading(false);
        setShouldFetch(false); // chỉ fetch 1 lần
      }
    };

    fetchApi();
  }, [shouldFetch]);

  // Nếu chưa đăng nhập
  if (!isLogin) {
    return (
      <div className="text-center py-20 text-xl text-red-600 font-semibold">
        Bạn chưa đăng nhập!!{" "}
        <Link to="/login" className="text-blue-500 underline hover:text-blue-700">
          Đăng nhập ngay
        </Link>
      </div>
    );
  }

  // Nếu đang loading
  if (loading) {
    return (
      <div className="text-center py-20 text-lg text-gray-600">
        Đang tải dữ liệu...
      </div>
    );
  }

  return (
    <div className="document__list">
      {document.length > 0 ? (
        document.map((item) => (
          <DocumentItem key={item._id} props={{ item }} />
        ))
      ) : (
        <p className="text-center text-gray-500">Không có tài liệu nào.</p>
      )}
    </div>
  );
}

export default Document;
