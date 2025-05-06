import { IoDocumentAttachOutline } from "react-icons/io5";
import { FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function DocumentItem({ props }) {
    const { item } = props;
    const navigate = useNavigate();
    const handleClick =() => {
        navigate(`/document/detail/${item._id}`);
        console.log(item._id);
    }
    return (
        <div className="document__item" onClick={handleClick}>
            <div className="document__image">
                <img src="image.png" alt="tai lieu" />
            </div>

            <div className="document__content">
                <h3 className="document__title">{item.title}</h3>

                <div className="document__info">
                    {/* <p className="post__price">
                        <IoDocumentAttachOutline />{" "}
                        <span>{item.price}</span> tài liệu
                    </p> */}
                    <p className="document__downloads">
                        <FaDownload />{" "}
                        <span>{item.downloadCount}</span> lượt tải xuống
                    </p>
                </div>

                <div className="document__btn">
                    <button>Chi tiết</button>
                </div>
            </div>
        </div>
    );
}

export default DocumentItem;
