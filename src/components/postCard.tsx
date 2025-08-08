import React from 'react';
import type { Post } from '../types/post';

interface Props {
  userId: number;
  posts: Post[];
}

const PostCard: React.FC<Props> = ({ userId, posts }) => {
  return (
    <div className="bg-[#aaa2a2] border border-gray-200 shadow-sm p-4 transition hover:shadow-md text-center max-w-[500px] mx-auto">
      {/* Header */}
      <h2 className="text-base font-bold text-gray-700 border-b border-gray-300 pb-2 mb-4">
        🧑‍💻 User #{userId}
      </h2>

      {/* Post list */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white border border-gray-100 p-4 hover:bg-gray-50 transition"
          >
            <p className="text-sm font-medium text-indigo-700 mb-2">{post.title}</p>
            <p className="text-sm text-gray-600 mx-auto max-w-[90%]">
              {post.body.length > 120 ? post.body.slice(0, 120) + '…' : post.body}
            </p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 text-xs font-bold text-gray-500 text-center">
        ➤ {posts.length} post{posts.length > 1 ? 's' : ''}
      </div>
    </div>
  );
};

export default PostCard;
