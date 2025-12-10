import { prisma } from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type PostWithAuthor = Prisma.PostGetPayload<{
  include: { author: true };
}>;

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const post: PostWithAuthor | null = await prisma.post.findUnique({
    where: { id },
    include: { author: true },
  });

  if (!post) {
    notFound();
  }

  return (
    <main>
      <Link href="/">← Back to posts</Link>

      <article>
        <h1>{post.title}</h1>
        <p>By {post.author?.name ?? "Unknown"}</p>

        {post.content && (
          <div>
            <p>{post.content}</p>
          </div>
        )}
      </article>
    </main>
  );
}
