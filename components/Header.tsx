import Link from "next/link";
import { auth, signIn, signOut } from "@/lib/auth";

export default async function Header() {
  const session = await auth();

  return (
    <nav className="flex flex-col md:flex-row items-center gap-4 border-b border-gray-200 px-6 py-4">
      {/* Left navigation */}
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

      {/* Right section */}
      <div className="flex items-center gap-4 md:ml-auto">
        {session ? (
          <>
            <p className="text-sm text-gray-600 text-center md:text-left">
              {session.user?.name} ({session.user?.email})
            </p>

            <Link href="/create">
              <button className="border border-gray-900 px-4 py-2 rounded-md hover:bg-gray-100 transition text-sm">
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
                className="border border-gray-900 px-4 py-2 rounded-md hover:bg-gray-100 transition text-sm"
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
              className="border border-gray-900 px-4 py-2 rounded-md hover:bg-gray-100 transition text-sm"
            >
              Log in
            </button>
          </form>
        )}
      </div>
    </nav>
  );
}
