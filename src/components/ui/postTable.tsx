import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Post } from "@/types/post";

interface Props {
  posts: Post[];
}

const PostTable: React.FC<Props> = ({ posts }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200 bg-white">
      <Table className="min-w-full text-sm text-left text-gray-700 table-fixed">
        <TableCaption className="mb-4 text-lg font-semibold text-gray-700">
          📋 A list of fetched posts
        </TableCaption>
        <TableHeader className="bg-blue-100 sticky top-0 z-10">
          <TableRow>
            <TableHead className="px-4 py-2 font-bold text-blue-800 w-[30px]">Sr.</TableHead>
            <TableHead className="px-4 py-2 font-bold text-blue-800 max-w-[200px] break-words whitespace-normal">
              Title
            </TableHead>
            <TableHead className="px-4 py-2 font-bold text-blue-800 max-w-[280px] break-words whitespace-normal">
              Body
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post, index) => (
            <TableRow
              key={post.id}
              className={index % 2 === 0 ? "bg-gray-50 hover:bg-gray-100" : "bg-white hover:bg-gray-100"}
            >
              <TableCell className="px-4 py-2 w-[30px]">{index + 1}</TableCell>
              <TableCell className="px-4 py-2 max-w-[200px] break-words whitespace-normal">
                {post.title}
              </TableCell>
              <TableCell className="px-4 py-2 max-w-[280px] break-words whitespace-normal">
                {post.body}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="bg-blue-50">
            <TableCell colSpan={3} className="px-4 py-2 font-medium text-center text-blue-900">
              Total: {posts.length} posts
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default PostTable;
