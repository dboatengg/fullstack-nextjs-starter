// import { prisma } from "@/lib/prisma";
// import { Prisma } from "@/app/generated/prisma/client";
// import Link from "next/link";
// import { notFound } from "next/navigation";

// export const dynamic = "force-dynamic";

// type PostWithAuthor = Prisma.PostGetPayload<{
//   include: { author: true };
// }>;

// export default async function PostPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;

//   const post: PostWithAuthor | null = await prisma.post.findUnique({
//     where: { id },
//     include: { author: true },
//   });

//   if (!post) {
//     notFound();
//   }

//   return (
//     <main className="p-8 max-w-3xl mx-auto">
//       <Link href="/">← Back to posts</Link>

//       <article>
//         <h1>{post.title}</h1>
//         <p>By {post.author?.name ?? "Unknown"}</p>

//         {post.content && (
//           <div>
//             <p>{post.content}</p>
//           </div>
//         )}
//       </article>
//     </main>
//   );
// }

import { prisma } from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import PublishButton from "@/app/p/[id]/PublishButton";

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
  const session = await auth();

  const post: PostWithAuthor | null = await prisma.post.findUnique({
    where: { id },
    include: { author: true },
  });

  if (!post) {
    notFound();
  }

  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === post.author?.email;

  const title = post.published ? post.title : `${post.title} (Draft)`;

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <Link href="/">← Back to posts</Link>

      <article className="mt-8">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-gray-600 mb-6">
          By {post.author?.name ?? "Unknown"}
        </p>

        {post.content && (
          <div className="prose">
            <p>{post.content}</p>
          </div>
        )}

        {!post.published && userHasValidSession && postBelongsToUser && (
          <div className="mt-8">
            <PublishButton postId={post.id} />
          </div>
        )}
      </article>
    </main>
  );
}
