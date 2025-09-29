import { usePosts } from '../hooks/useSanity'
import { urlForImage } from '../lib/sanity'
import { Link } from 'react-router-dom'

const Posts = () => {
  const { data: posts, isLoading, error } = usePosts()

  if (isLoading) return <div className="p-8">Loading posts...</div>
  if (error) return <div className="p-8">Error: {error.message}</div>

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts?.map((post: any) => (
          <article key={post._id} className="border rounded-lg p-6 shadow-md">
            {post.mainImage && (
              <img 
                src={urlForImage(post.mainImage)} 
                alt={post.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            {post.excerpt && (
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
            )}
            {post.publishedAt && (
              <p className="text-sm text-gray-500 mb-4">
                {new Date(post.publishedAt).toLocaleDateString()}
              </p>
            )}
            <Link 
              to={`/post/${post.slug?.current}`}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Read More →
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}

export default Posts