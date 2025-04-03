import { IoDocumentAttachOutline } from "react-icons/io5";
import { FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function PostItem({ props }) {
    const { item } = props;
    const navigate = useNavigate();
    const handleClick =() => {
        navigate(`document/detail/${item._id}`);
        console.log(item._id);
    }
    return (
        <div className="post__item" onClick={handleClick}>
            <div className="post__image">
                <img src="image.png" alt="tai lieu" />
            </div>

            <div className="post__content">
                <h3 className="post__title">{item.title}</h3>

                <div className="post__info">
                    {/* <p className="post__price">
                        <IoDocumentAttachOutline />{" "}
                        <span>{item.price}</span> tài liệu
                    </p> */}
                    <p className="post__downloads">
                        <FaDownload />{" "}
                        <span>{item.downloadCount}</span> lượt tải xuống
                    </p>
                </div>

                <div className="post__btn">
                    <button>Chi tiết</button>
                </div>
            </div>
        </div>
    );
}

export default PostItem;
