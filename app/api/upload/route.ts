import { prisma } from "@/lib/prisma";
import { CSVDataRecord } from "@/lib/types";
import { parse } from "csv-parse/sync";
import { NextResponse } from "next/server";

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

  return records.map((row: Record<string, string>): CSVDataRecord | null => {
    const cleaned: Record<string, string | boolean> = {};

    for (const [key, rawValue] of Object.entries(row)) {
      const value = rawValue?.toString().trim();

      if (!key || key === "") continue;

      if (value === "-") {
        cleaned[key] = true;
      } else if (value !== "" && value != null) {
        cleaned[key] = value;
      }
    }

    if (!cleaned["Category"] || !cleaned["Sub-category"]) return null;

    return cleaned as CSVDataRecord;
  });
}

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file = data.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const csvText = Buffer.from(bytes).toString("utf-8");

    const finalRecords: CSVDataRecord[] = parseAndCleanCSV(csvText);

    const saved = await prisma.csvData.create({
      data: {
        name: file.name,
        data: finalRecords,
      },
    });

    return NextResponse.json({
      message: "✅ CSV stored successfully",
      id: saved.id,
      rows: finalRecords.length,
    });
  } catch (error) {
    console.error("❌ CSV import error:", error);
    return NextResponse.json(
      { error: "Failed to import CSV", details: String(error) },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
