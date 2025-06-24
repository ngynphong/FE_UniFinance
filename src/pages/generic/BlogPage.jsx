import { useEffect, useState } from "react"
import { getBlogs } from "../../services/blogService"
import BlogSection from "../../components/generic/blog/BlogSection"

const BlogPage = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getBlogs()
        setBlogs(Array.isArray(res) ? res : [])
      } catch (err) {
        console.error("Lỗi fetch blog:", err)
        setBlogs([])
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <BlogSection blogs={Array.isArray(blogs) ? blogs : []} />
      {/* Có thể thêm FilterBar, Pagination... dùng chung `blogs` */}
    </div>
  )
}

export default BlogPage
