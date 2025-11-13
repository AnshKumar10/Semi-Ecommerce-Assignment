"use client";

import { useEffect, useState } from "react";
import ProductsTable from "@/components/ProductsTable";
import { Button } from "@/components/ui/button";
import { GroupedCsvData } from "@/lib/types";

export default function Products() {
  const [data, setData] = useState<GroupedCsvData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch("/api/products");
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("❌ Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-gray-500 space-y-4">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-lg font-medium">Loading products...</p>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-gray-500 space-y-4">
        <p className="text-lg font-medium">No product data available.</p>
      </div>
    );
  }

  const category = data.find(
    (product) => product.category === selectedCategory
  );

  const subCategory = category?.subCategories.find(
    (product) => product.subCategory === selectedSubCategory
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">📦 Product Browser</h1>

      <div className="flex flex-wrap gap-2">
        {data.map((product) => (
          <Button
            key={product.category}
            variant={
              product.category === selectedCategory ? "default" : "outline"
            }
            onClick={() => {
              setSelectedCategory(product.category);
              setSelectedSubCategory(null);
            }}
          >
            {product.category}
          </Button>
        ))}
      </div>

      {category && (
        <div className="flex flex-wrap gap-2 mt-4">
          {category.subCategories.map((product) => (
            <Button
              key={product.subCategory}
              variant={
                product.subCategory === selectedSubCategory
                  ? "default"
                  : "outline"
              }
              onClick={() => setSelectedSubCategory(product.subCategory)}
            >
              {product.subCategory}
            </Button>
          ))}
        </div>
      )}

      {/* Product Table */}
      <ProductsTable data={subCategory?.parts ?? []} />
    </div>
  );
}
