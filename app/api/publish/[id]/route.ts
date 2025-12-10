// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function PUT(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   const { id } = params;

//   try {
//     const post = await prisma.post.update({
//       where: { id },
//       data: { published: true },
//     });

//     return NextResponse.json(post);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to publish post" },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PUT /api/publish/:id
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    console.log("Publishing post with ID:", id);

    const post = await prisma.post.update({
      where: { id },
      data: { published: true },
    });

    console.log("Post published successfully:", post);

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error publishing post:", error);
    return NextResponse.json(
      {
        error: "Failed to publish post",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
