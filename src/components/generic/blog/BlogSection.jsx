import { Row, Col } from "antd"
import BlogCard from "./BlogCard"
import { useNavigate } from "react-router-dom"

function BlogSection({ blogs }) {
  const navigate = useNavigate();

  const handleBlogClick = (blogId) => {
    console.log('Click', blogId)
    navigate(`/blog/${blogId}`);
  };

  const mappedBlogs = blogs.map((blog) => {
    return {
      id: blog.blogId,
      imageUrl: blog.blogImages?.[0]?.imageUrl || "https://via.placeholder.com/300",
      title: blog.title,
      description: blog.content.slice(0, 100) + "..."
    };
  });

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Bài viết hữu ích</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Khám phá các bài viết giúp bạn hiểu rõ hơn về tài chính cá nhân
          </p>
        </div>

        <Row gutter={[32, 32]} className="flex-wrap justify-center">
          {mappedBlogs.map((blog, index) => (
            <Col xs={24} md={12} lg={8} key={index} className="flex">
              <BlogCard
                image={blog.imageUrl}
                title={blog.title}
                description={blog.description}
                delay={index}
                className="h-full w-full"
                onClick={() => handleBlogClick(blog.id)}
              />
            </Col>
          ))}
        </Row>
      </div>
    </section>
  )
}

export default BlogSection
