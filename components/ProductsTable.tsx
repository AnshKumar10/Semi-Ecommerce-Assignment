"use client";

import { ProductRecord } from "@/lib/types";

interface ProductsTableProps {
  data: ProductRecord[];
}

export default function ProductsTable({ data }: ProductsTableProps) {
  if (!data?.length)
    return (
      <div className="p-4 text-gray-500">
        Select a subcategory to view parts
      </div>
    );

  const keys = Object.keys(data[0]);

  return (
    <div className="overflow-x-auto mt-4 border rounded-lg">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            {keys.map((key) => (
              <th key={key} className="text-left px-4 py-2 capitalize">
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-t hover:bg-gray-50">
              {keys.map((key) => (
                <td key={key} className="px-4 py-2">
                  {row[key] || "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
