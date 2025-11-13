import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { groupCsvData } from "@/lib/utils";
import { CSVDataRecord } from "@/lib/types";

export async function GET() {
  try {
    const last = await prisma.csvData.findFirst({
      orderBy: { createdAt: "desc" },
    });

    if (!last) {
      return NextResponse.json({ error: "No data found" }, { status: 404 });
    }

    const rawData = last.data as CSVDataRecord[];
    const grouped = groupCsvData(rawData);

    return NextResponse.json(grouped);
  } catch (error) {
    console.error("❌ Fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data", details: String(error) },
      { status: 500 }
    );
  }
}
