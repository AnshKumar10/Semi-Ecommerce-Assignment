import { prisma } from "@/lib/prisma";
import { CSVDataRecord } from "@/lib/types";
import { parseAndCleanCSV } from "@/lib/utils";
import { NextResponse } from "next/server";

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
