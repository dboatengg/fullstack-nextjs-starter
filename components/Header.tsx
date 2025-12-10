import Link from "next/link";
import { auth, signIn, signOut } from "@/lib/auth";

export default async function Header() {
  const session = await auth();

  return (
    <nav className="flex items-center border-b border-gray-200 px-8 py-6">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="font-semibold text-gray-900 hover:text-gray-700"
        >
          Feed
        </Link>

        {session && (
          <Link href="/drafts" className="text-gray-700 hover:text-gray-900">
            My drafts
          </Link>
        )}
      </div>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-4">
        {session ? (
          <>
            <p className="text-sm text-gray-600">
              {session.user?.name} ({session.user?.email})
            </p>

            <Link href="/create">
              <button className="border border-gray-900 px-4 py-2 rounded-md hover:bg-gray-100 transition">
                New post
              </button>
            </Link>

            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button
                type="submit"
                className="border border-amber-300 px-4 py-2 rounded-md transition"
              >
                Log out
              </button>
            </form>
          </>
        ) : (
          <form
            action={async () => {
              "use server";
              await signIn("github");
            }}
          >
            <button
              type="submit"
              className="border border-amber-300 px-4 py-2 rounded-md transition"
            >
              Log in
            </button>
          </form>
        )}
      </div>
    </nav>
  );
}
