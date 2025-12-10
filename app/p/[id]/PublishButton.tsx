"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface PublishButtonProps {
  postId: string;
}

export default function PublishButton({ postId }: PublishButtonProps) {
  const router = useRouter();
  const [isPublishing, setIsPublishing] = useState(false);

  async function publishPost() {
    setIsPublishing(true);

    try {
      await fetch(`/api/publish/${postId}`, {
        method: "PUT",
      });

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Failed to publish post:", error);
      setIsPublishing(false);
    }
  }

  return (
    <button
      onClick={publishPost}
      disabled={isPublishing}
      className="bg-amber-600 hover:bg-gray-300 text-white disabled:opacity-40 disabled:cursor-not-allowed px-6 py-3 rounded transition-colors"
    >
      {isPublishing ? "Publishing..." : "Publish"}
    </button>
  );
}
