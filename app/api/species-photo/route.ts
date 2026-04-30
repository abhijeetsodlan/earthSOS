import { NextRequest, NextResponse } from "next/server";

interface WikipediaPage {
  title?: string;
  thumbnail?: { source?: string };
  terms?: { description?: string[] };
}

interface WikipediaResponse {
  query?: {
    pages?: Record<string, WikipediaPage>;
  };
}

const getFirstPage = (payload: WikipediaResponse) => {
  const pages = payload.query?.pages;
  return pages ? Object.values(pages)[0] : undefined;
};

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get("name");

  if (!name) {
    return NextResponse.json({ success: false, data: null, error: "Missing species name" }, { status: 400 });
  }

  try {
    const params = new URLSearchParams({
      action: "query",
      titles: name,
      prop: "pageimages|pageterms",
      format: "json",
      pithumbsize: "600",
      origin: "*"
    });

    const response = await fetch(`https://en.wikipedia.org/w/api.php?${params.toString()}`, {
      next: { revalidate: 60 * 60 * 24 }
    });

    if (!response.ok) {
      throw new Error("Wikipedia photo request failed");
    }

    const page = getFirstPage(await response.json() as WikipediaResponse);

    return NextResponse.json({
      success: true,
      data: {
        photoUrl: page?.thumbnail?.source ?? null,
        commonName: page?.terms?.description?.[0] ?? null,
        photoCredit: page?.thumbnail?.source ? "Wikipedia / Wikimedia Commons" : null
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      data: null,
      error: error instanceof Error ? error.message : "Could not fetch species photo"
    });
  }
}
