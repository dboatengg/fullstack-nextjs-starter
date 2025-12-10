import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

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
            {post.title} — {post.author?.name ?? "Unknown"}
          </li>
        ))}
      </ul>
    </main>
  );
}
