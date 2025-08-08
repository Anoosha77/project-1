import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Post } from "../types/post";
import PostTable from "../components/ui/postTable";
import { toast } from "sonner"; // ✅ import toast from sonner

const fetchPosts = async (): Promise<Post[]> => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return res.data;
};

const Posts: React.FC = () => {
  const { data, isLoading, error, isSuccess, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  //  useEffect to show toast
  useEffect(() => {
    if (isSuccess) {
      toast.success(` Successfully fetched ${data?.length} posts`);
    }

    if (isError) {
      toast.error("❌ Failed to fetch posts. Please try again.");
    }
  }, [isSuccess, isError, data]);

  if (isLoading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-4">Error loading posts</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">🧑‍💻 Posts Table</h1>
      {data && <PostTable posts={data} />}
    </div>
  );
};

export default Posts;
