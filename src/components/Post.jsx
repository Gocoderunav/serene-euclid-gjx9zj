export default function Post({ posts, loading }) {
  return (
    <div className="posts">
      {posts.map((post, index) => (
        <div key={index} className="img-post">
          <img src={post.download_url} alt={`Post ${index}`} />
        </div>
      ))}
      {loading && <div className="img-post loading">Loading...</div>}
    </div>
  );
}
