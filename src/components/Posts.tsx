// src/components/Posts.jsx
import { useEffect, useState } from 'react'
import { client, urlForImage } from '../lib/sanity'

function Posts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query = `*[_type == "post"]{
          _id,
          title,
          slug,
          publishedAt,
          excerpt,
          body,
          mainImage
        }`
        
        const data = await client.fetch(query)
        setPosts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) return <div>Loading posts...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="posts">
      <h1>Blog Posts</h1>
      {posts.map((post) => (
        <article key={post._id} className="post">
          <h2>{post.title}</h2>
          {post.mainImage && (
            <img 
              src={urlForImage(post.mainImage)} 
              alt={post.title}
              style={{ maxWidth: '400px' }}
            />
          )}
          <p>{post.excerpt}</p>
          {post.publishedAt && (
            <small>Published: {new Date(post.publishedAt).toLocaleDateString()}</small>
          )}
        </article>
      ))}
    </div>
  )
}

export default Posts