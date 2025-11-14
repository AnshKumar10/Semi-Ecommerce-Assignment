import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { groupBy, map } from "lodash";
import { CSVDataRecord, GroupedCsvData } from "@/lib/types";
import { parse } from "csv-parse/sync";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function groupCsvData(records: CSVDataRecord[]): GroupedCsvData[] {
  const grouped = groupBy(records, "Category");

  return Object.entries(grouped).map(([category, items]) => ({
    category,
    subCategories: map(
      groupBy(items, "Sub-category"),
      (subItems, subCategory) => ({
        subCategory,
        parts: map(subItems, (item) => {
          const { Category, "Sub-category": _, ...rest } = item;
          return rest;
        }),
      })
    ),
  }));
}

/**
 * Parses CSV text into a cleaned array of CSVDataRecord objects.
 *
 * Rules:
 * - Filled cell → keep its value.
 * - Empty cell → skip.
 * - Dash ("-") → mark as true (associated column).
 */
export function parseAndCleanCSV(csvText: string): CSVDataRecord[] {
  const records = parse(csvText, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  return map(records, (row: Record<string, string>): CSVDataRecord => {
    const cleaned: Record<string, string> = {};

    for (const [key, rawValue] of Object.entries(row)) {
      const value = rawValue?.toString().trim();

      if (!key || key === "") continue;
      if (value !== "" && value !== null) cleaned[key] = value;
    }

    return cleaned as CSVDataRecord;
  });
}
