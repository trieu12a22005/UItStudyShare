import { useEffect, useState } from "react";
import { getPost } from "../Service/postService";
import PostItem from "./PostItem";
import Paginations from "../Pagination/Pagination";
import "./Post.scss";


function Post() {

    const [post, setPost] = useState([]);


    useEffect(() => {
        const fetchApi = async () => {
            const result = await getPost();
            setPost(result);
        };
        fetchApi();
    }, []);
    console.log(post)
    return (
        <>
            <div className="post__list">
                {post.map(item => (
                    <PostItem key={item._id} props={{ item }} />
                ))}
            </div>


        </>
    );
}
export default Post;  