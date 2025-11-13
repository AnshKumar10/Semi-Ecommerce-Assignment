export type CSVDataRecord = {
  Category: string;
  "Sub-category": string;
  "Part Number": string;
  [key: string]: string | undefined;
};

export type ProductRecord = Omit<CSVDataRecord, "Category" | "Sub-category">;

export interface GroupedCsvData {
  category: string;
  subCategories: {
    subCategory: string;
    parts: ProductRecord[];
  }[];
}
