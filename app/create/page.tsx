import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import CreatePostForm from "@/components/CreatePostForm";

export default async function CreatePage() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="bg-gray-50 p-2 lg:p-12 flex justify-center items-center min-h-screen">
      <CreatePostForm />
    </div>
  );
}
