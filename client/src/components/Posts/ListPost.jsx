import { useState, useEffect, useRef } from "react";
import { Heart, MessageCircle } from "lucide-react";
import DetailPost from "./DetailPost";
import { useAuth } from "../../hooks/AuthContext"; // ✅ Thêm dòng này

const LoadingSkeleton = () => (
    <div className="bg-white p-6 rounded-2xl shadow-md space-y-4 border border-gray-200 animate-pulse min-h-[500px]">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div className="flex-1 space-y-2">
                <div className="w-1/3 h-4 bg-gray-300 rounded"></div>
                <div className="w-1/5 h-3 bg-gray-200 rounded"></div>
            </div>
        </div>
        <div className="w-full h-48 bg-gray-200 rounded-lg"></div>
        <div className="space-y-2">
            <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
            <div className="w-full h-4 bg-gray-200 rounded"></div>
            <div className="w-5/6 h-4 bg-gray-200 rounded"></div>
        </div>
        <div className="flex gap-2 mt-2">
            <div className="h-5 w-16 bg-gray-300 rounded-full"></div>
            <div className="h-5 w-20 bg-gray-300 rounded-full"></div>
        </div>
        <div className="flex gap-6 mt-4">
            <div className="h-4 w-12 bg-gray-300 rounded"></div>
            <div className="h-4 w-12 bg-gray-300 rounded"></div>
        </div>
    </div>
);

export default function PostList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [selectedPost, setSelectedPost] = useState(null);
    const loader = useRef(null);

    const { user: authUser, token: authToken } = useAuth(); // ✅ Thêm dòng này

    useEffect(() => {
        loadInitialPosts();
    }, []);

    const loadInitialPosts = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:3055/api/v1/posts", {
                method: "GET",
                credentials: "include",
            });
            const data = await res.json();
            const mappedPosts = data.posts.map((post) => ({
                _id: post._id,
                title: post.title,
                content: post.content,
                author: post.fullNameAuthor,
                avatar: post.avatarAuthor,
                tags: [],
                images: post.media?.map((m) => m.url) || [],
                date: new Date(post.createdAt).toLocaleDateString("vi-VN"),
                views: post.views,
                likesCount: post.likesCount,
                commentsCount: post.commentsCount,
                comments: post.comments || [],
            }));
            setTimeout(() => {
                setPosts(mappedPosts);
                setLoading(false);
            }, 1500);
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
            setLoading(false);
        }
    };

    const loadMorePosts = async () => {
        if (!hasMore || loadingMore) return;
        setLoadingMore(true);
        setTimeout(async () => {
            const res = await fetch("http://localhost:3055/api/v1/posts", {
                method: "GET",
                credentials: "include",
            });
            const data = await res.json();
            const mapped = data.posts.map((post) => ({
                _id: post._id,
                title: post.title,
                content: post.content,
                author: post.fullNameAuthor,
                avatar: post.avatarAuthor,
                tags: [],
                images: post.media?.map((m) => m.url) || [],
                date: new Date(post.createdAt).toLocaleDateString("vi-VN"),
                views: post.views,
                likesCount: post.likesCount,
                commentsCount: post.commentsCount,
                comments: post.comments || [],
            }));
            setPosts((prev) => [...prev, ...mapped]);
            setLoadingMore(false);
            if (posts.length + mapped.length > 10) setHasMore(false);
        }, 2500);
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                loadMorePosts();
            }
        });
        if (loader.current) observer.observe(loader.current);
        return () => observer.disconnect();
    }, [loader, hasMore, loadingMore]);

    return (
        <main className="p-6 max-w-4xl mx-auto space-y-6">
            {posts.map((post, i) => (
                <div
                    key={post._id || i}
                    onClick={() => setSelectedPost(post)}
                    className="bg-white pt-10 pb-10 px-6 rounded-2xl shadow-lg space-y-4 border border-gray-300 cursor-pointer hover:bg-gray-50 transition-shadow min-h-[500px]"
                >
                    <div className="flex items-center gap-3">
                        <img src={post.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
                        <div>
                            <div className="font-semibold">{post.author}</div>
                            <div className="text-sm text-gray-500">{post.date}</div>
                        </div>
                    </div>

                    <h2 className="text-xl font-bold pt-2">{post.title}</h2>
                    <p className="text-gray-700">{post.content}</p>

                    {post.images.length > 0 && (
                        <div className="mt-4">
                            <img
                                src={post.images[0]}
                                alt="cover"
                                className="rounded-lg w-full object-cover max-h-[600px]"
                            />
                        </div>
                    )}

                    <div className="flex gap-6 items-center text-gray-500 mt-4">
                        <div className="flex items-center gap-1">
                            <Heart className="w-5 h-5" /> <span>{post.likesCount}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <MessageCircle className="w-5 h-5" /> <span>{post.commentsCount}</span>
                        </div>
                    </div>
                </div>
            ))}

            {loading &&
                Array(2)
                    .fill(null)
                    .map((_, i) => <LoadingSkeleton key={i} />)}

            {loadingMore &&
                Array(2)
                    .fill(null)
                    .map((_, i) => <LoadingSkeleton key={`loading-more-${i}`} />)}

            <div ref={loader} className="h-12 flex items-center justify-center">
                {!hasMore && !loading && !loadingMore && (
                    <span className="text-gray-400">Hết bài viết</span>
                )}
            </div>

            {selectedPost && (
                <DetailPost
                    post={selectedPost}
                    onClose={() => setSelectedPost(null)}
                    userId={authUser?.idUser}
                    token={authToken}
                />
            )}
        </main>
    );
}
