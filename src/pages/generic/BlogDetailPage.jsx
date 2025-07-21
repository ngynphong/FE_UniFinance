import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogById } from "../../services/blogService";

const BlogDetailPage = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogDetail = async () => {
            try {
                const data = await getBlogById(id);
                setBlog(data);
            } catch (error) {
                console.error("Error fetching blog detail:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogDetail();
    }, [id]);

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (!blog) {
        return <div className="flex justify-center items-center min-h-screen">Blog not found</div>;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">{blog.title}</h1>

            {blog.blogImages && blog.blogImages.length > 0 && (
                <img
                    src={blog.blogImages[0].imageUrl}
                    alt={blog.title}
                    className="w-full h-96 object-cover rounded-lg mb-8"
                />
            )}

            <div className="prose max-w-none">
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {blog.content}
                </div>
            </div>
        </div>
    );
};

export default BlogDetailPage;
