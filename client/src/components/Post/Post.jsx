import { useEffect, useState } from "react";
import { getPost } from "../Service/postService";
import PostItem from "./PostItem";
import Paginations from "../Pagination/Pagination";
import "./Post.scss";


function Post() {
    const postsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(0);
    const [post, setPost] = useState([]);

    const offset = currentPage * postsPerPage;
    const currentPosts = post.slice(offset, offset + postsPerPage);
    // const pageCount = Math.ceil(post.length / postsPerPage);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getPost();
            setPost(result);
        };
        fetchApi();
    }, []);

    return (
        <>
            <div className="post__list">
                {currentPosts.map(item => (
                    <PostItem key={item.id} props={{ item }} />
                ))}
            </div>
            <div className="pagination__wrapper">
                <Paginations
                    current={currentPage}
                    total={post.length}
                    pageSize={postsPerPage}
                    onChange={(page) => setCurrentPage(page)}
                />
            </div>

        </>
    );
}
export default Post;  