import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";
import { redirect } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

type PostWithAuthor = Prisma.PostGetPayload<{
  include: { author: true };
}>;

export default async function DraftsPage() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const drafts: PostWithAuthor[] = await prisma.post.findMany({
    where: {
      author: { email: session.user?.email },
      published: false,
    },
    include: {
      author: true,
    },
  });

  return (
    <div className="p-12">
      <h1 className="text-3xl font-semibold mb-8">My Drafts</h1>

      {drafts.length === 0 ? (
        <p className="text-gray-600">You dont have any drafts yet.</p>
      ) : (
        <ul className="space-y-4">
          {drafts.map((post) => (
            <li
              key={post.id}
              className="p-4 border border-gray-200 rounded-md transition hover:border-gray-300"
            >
              <Link
                href={`/posts/${post.id}`}
                className="text-gray-900 font-medium hover:text-blue-600"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
