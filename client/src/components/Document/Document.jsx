import { useEffect, useState } from "react";
import { getPost } from "../Service/postService";
import PostItem from "./DocumentItem";
import Paginations from "../Pagination/Pagination";
import "./Document.scss";


function Document() {

    const [document, setdocument] = useState([]);


    useEffect(() => {
        const fetchApi = async () => {
            const result = await getPost();
            setdocument(result);
        };
        fetchApi();
    }, []);
    console.log(document)
    return (
        <>
            <div className="document__list">
                {document.map(item => (
                    <PostItem key={item._id} props={{ item }} />
                ))}
            </div>


        </>
    );
}
export default Document;  