import { IoDocumentAttachOutline } from "react-icons/io5";
import { FaDownload } from "react-icons/fa";

function PostItem({ props }) {
    const { item } = props;

    return (
        <div className="post__item">
            <div className="post__image">
                <img src={item.images} alt={item.title} />
            </div>

            <div className="post__content">
                <h3 className="post__title">{item.title}</h3>

                <div className="post__info">
                    <p className="post__price">
                        <IoDocumentAttachOutline />{" "}
                        <span>{item.price}</span> tài liệu
                    </p>
                    <p className="post__downloads">
                        <FaDownload />{" "}
                        <span>{item.stock}</span> lượt tải xuống
                    </p>
                </div>

                <div className="post__btn">
                    <button>Tải xuống</button>
                </div>
            </div>
        </div>
    );
}

export default PostItem;
