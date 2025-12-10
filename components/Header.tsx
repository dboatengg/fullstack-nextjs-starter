import Link from "next/link";
import { auth, signIn, signOut } from "@/lib/auth";

export default async function Header() {
  const session = await auth();

  return (
    <header style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <nav
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link href="/">Home</Link>

        {session?.user ? (
          <>
            <span>Hello, {session.user.name}</span>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button
                type="submit"
                className="px-4 py-1.5 rounded-md text-white bg-amber-600"
              >
                Sign Out
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
              className="px-4 py-1.5 rounded-md text-white bg-amber-600"
            >
              Sign In with GitHub
            </button>
          </form>
        )}
      </nav>
    </header>
  );
}
