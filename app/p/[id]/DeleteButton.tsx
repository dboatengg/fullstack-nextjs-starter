"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteButtonProps {
  postId: string;
}

export default function DeleteButton({ postId }: DeleteButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function deletePost() {
    if (!confirm("Are you sure you want to delete this post?")) {
      return;
    }

    setIsDeleting(true);

    try {
      await fetch(`/api/post/${postId}`, {
        method: "DELETE",
      });

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Failed to delete post:", error);
      setIsDeleting(false);
    }
  }

  return (
    <button
      onClick={deletePost}
      disabled={isDeleting}
      className="bg-red-100 hover:bg-red-200 text-red-700 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed px-6 py-2 rounded transition-colors"
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}
