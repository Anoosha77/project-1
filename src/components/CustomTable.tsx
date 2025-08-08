type Column<T> = {
  key: string;
  label: string;
  render?: (row: T, index: number) => React.ReactNode;
};

type CustomTableProps<T> = {
  columns: Column<T>[];
  data: T[];
};

export default function CustomTable<T>({ columns, data }: CustomTableProps<T>) {
  return (
    <div className="overflow-x-auto border rounded-md shadow mt-4">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-2 border-b">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-4 text-gray-500">
                No data found
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={index} className="border-t">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-2">
                    {col.render ? col.render(row, index) : (row as any)[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
