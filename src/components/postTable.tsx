// import React from 'react';
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '../components/ui/table';
// import type { Post } from '../types/post';

// interface PostTableProps {
//   posts: Post[];
// }

// const PostTable: React.FC<PostTableProps> = ({ posts }) => {
//   return (
//     <Table>
//       <TableCaption className="mb-4">📋 A list of fetched posts</TableCaption>
//       <TableHeader>
//         <TableRow>
//           <TableHead className="w-[80px] text-center">Sr No</TableHead>
//           <TableHead className="text-center">ID</TableHead>
//           <TableHead className="text-center">Title</TableHead>
//           <TableHead className="text-center">Body</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {posts.map((post, index) => (
//           <TableRow key={post.id}>
//             <TableCell className="text-center font-medium">{index + 1}</TableCell>
//             <TableCell className="text-center">{post.id}</TableCell>
//             <TableCell className="text-center">{post.title}</TableCell>
//             <TableCell className="text-center">{post.body.slice(0, 100)}{post.body.length > 100 ? '…' : ''}</TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//       <TableFooter>
//         <TableRow>
//           <TableCell colSpan={4} className="text-right text-sm text-gray-500">
//             Total Posts: {posts.length}
//           </TableCell>
//         </TableRow>
//       </TableFooter>
//     </Table>
//   );
// };

// export default PostTable;
