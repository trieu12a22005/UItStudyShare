import { useState, useEffect, useRef } from "react";
import { Heart, MessageCircle } from "lucide-react";
import DetailPost from "./DetailPost";
import { useAuth } from "../../hooks/AuthContext";
import { toggleLikePost } from "../Service/PostService";

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
    const isFetching = useRef(false);
    const hasLoaded = useRef(false);

    const { user: authUser, token: authToken } = useAuth();

    const mapPosts = (data) =>
        data.map((post) => ({
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
            likes: post.likes || [],
        }));

    const loadInitialPosts = async () => {
        if (hasLoaded.current) return;
        hasLoaded.current = true;
        setLoading(true);
        try {
            const res = await fetch("https://beltw-production.up.railway.app/api/v1/posts", {
                method: "GET",
                credentials: "include",
            });
            const data = await res.json();
            console.log("Fetched data (initial):", data.posts);
            setPosts(mapPosts(data.posts));
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadMorePosts = async () => {
        if (!hasMore || loadingMore || isFetching.current) return;
        isFetching.current = true;
        setLoadingMore(true);
        try {
            const res = await fetch("https://beltw-production.up.railway.app/api/v1/posts", {
                method: "GET",
                credentials: "include",
            });
            const data = await res.json();
            console.log("Fetched data (load more):", data.posts);

            const mapped = mapPosts(data.posts);
            const unique = mapped.filter((p) => !posts.some((old) => old._id === p._id));

            if (unique.length === 0) {
                setHasMore(false); // ✅ Không còn bài viết mới -> ngừng gọi
            } else {
                setPosts((prev) => [...prev, ...unique]);
            }
        } catch (err) {
            console.error("Load more error:", err);
        } finally {
            setLoadingMore(false);
            isFetching.current = false;
        }
    };


    useEffect(() => {
        loadInitialPosts();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (
                entries[0].isIntersecting &&
                hasMore &&
                !loading &&
                !loadingMore &&
                !isFetching.current
            ) {
                loadMorePosts();
            }
        });
        const current = loader.current;
        if (current) observer.observe(current);
        return () => {
            if (current) observer.unobserve(current);
            observer.disconnect();
        };
    }, [hasMore, loading, loadingMore]);

    const handleLikeUpdate = (postId, liked, likesCount) => {
        setPosts((prev) =>
            prev.map((p) => {
                if (p._id !== postId) return p;
                let newLikes = [...p.likes];
                if (liked) newLikes.push({ idUser: authUser?.idUser });
                else newLikes = newLikes.filter((l) => l.idUser !== authUser?.idUser);
                return { ...p, likesCount, likes: newLikes };
            })
        );
    };

    const handleCommentUpdate = (postId) => {
        setPosts((prev) =>
            prev.map((p) =>
                p._id === postId ? { ...p, commentsCount: (p.commentsCount || 0) + 1 } : p
            )
        );
    };

    return (
        <main className="p-6 max-w-4xl mx-auto space-y-6">
            {posts.map((post) => {
                const isLiked = post.likes.some((l) => l.idUser === authUser?.idUser);
                return (
                    <div
                        key={post._id}
                        className="bg-white pt-10 pb-10 px-6 rounded-2xl shadow-lg space-y-4 border border-gray-300 cursor-pointer hover:bg-gray-50 transition-shadow min-h-[500px]"
                    >
                        <div onClick={() => setSelectedPost(post)}>
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
                                    {post.images[0].endsWith(".mp4") ? (
                                        <video
                                            src={post.images[0]}
                                            controls
                                            className="rounded-lg w-full max-h-[600px] object-cover"
                                        >
                                            Trình duyệt của bạn không hỗ trợ thẻ video.
                                        </video>
                                    ) : (
                                        <img
                                            src={post.images[0]}
                                            alt="cover"
                                            className="rounded-lg w-full object-cover max-h-[600px]"
                                        />
                                    )}
                                </div>
                            )}

                        </div>
                        <div className="flex gap-6 items-center text-gray-500 mt-4">
                            <div
                                className={`flex items-center gap-1 cursor-pointer select-none ${isLiked ? "text-red-500" : ""
                                    }`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleLikePost(post._id, authUser?.idUser, authToken)
                                        .then(({ liked, likesCount }) =>
                                            handleLikeUpdate(post._id, liked, likesCount)
                                        )
                                        .catch((err) => console.error("Like lỗi:", err));
                                }}
                            >
                                <Heart className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} />
                                <span>{post.likesCount}</span>
                            </div>
                            <div
                                className="flex items-center gap-1 cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedPost(post);
                                }}
                            >
                                <MessageCircle className="w-5 h-5" />
                                <span>{post.commentsCount}</span>
                            </div>
                        </div>
                    </div>
                );
            })}

            {(loading || loadingMore) &&
                Array(2)
                    .fill(null)
                    .map((_, i) => <LoadingSkeleton key={i} />)}

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
                    onLikeUpdate={handleLikeUpdate}
                    onCommentUpdate={handleCommentUpdate}
                />
            )}
        </main>
    );
}