import { prisma } from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";
import Link from "next/link";

type PostWithAuthor = Prisma.PostGetPayload<{
  include: { author: true };
}>;

export default async function Home() {
  const posts: PostWithAuthor[] = await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
  });

  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
            {" — "}
            {post.author?.name ?? "Unknown"}
          </li>
        ))}
      </ul>
    </main>
  );
}
