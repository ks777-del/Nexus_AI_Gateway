import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  
  let items = [
    { id: "m-1", name: "Data Extraction Template", category: "workflows", author: "Nexus AI Gateway", price: 0, rating: 4.8 },
    { id: "m-2", name: "Advanced Analytics Plugin", category: "plugins", author: "DataCo", price: 10, rating: 4.5 },
    { id: "m-3", name: "Medical Knowledge Base", category: "knowledge", author: "HealthCorp", price: 50, rating: 4.9 }
  ];

  if (category) {
    items = items.filter(i => i.category === category);
  }

  return NextResponse.json({ items });
}
