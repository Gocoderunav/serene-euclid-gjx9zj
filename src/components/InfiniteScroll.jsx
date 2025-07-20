import "../styles.css";
import { useEffect, useState, useRef } from "react";
import Post from "./Post";

export default function InfiniteScroll() {
  const [posts, setPosts] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const loaderRef = useRef(null); // for IntersectionObserver

  async function fetchData() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${pageNo}&limit=12`
      );
      const res = await response.json();
      setPosts((prev) => [...prev, ...res]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setIsError(true);
      setError(err.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, [pageNo]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log(entry);
        if (entry.isIntersecting) {
          setPageNo((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, []);

  return (
    <div className="container">
      {isError ? (
        <h1>Error: {error}</h1>
      ) : (
        <Post posts={posts} loading={loading} />
      )}
      <div ref={loaderRef} className="loading-indicator">
        {loading && <h3>Loading more...</h3>}
      </div>
    </div>
  );
}
