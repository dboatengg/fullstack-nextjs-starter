"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const submitData = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const body = { title, content };
      await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      router.push("/drafts");
      router.refresh();
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={submitData}
      className="w-full flex flex-col gap-5 bg-white p-8 rounded-xl shadow-md border border-gray-200"
    >
      <h1 className="text-2xl font-bold text-gray-900">New Draft</h1>

      <input
        autoFocus
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        placeholder="Title"
        type="text"
        required
        className="w-full p-3 border border-gray-300 rounded-md text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
      />

      <textarea
        onChange={(e) => setContent(e.target.value)}
        value={content}
        placeholder="Content"
        rows={8}
        className="w-full p-3 border border-gray-300 rounded-md text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 resize-none"
      />

      <div className="flex items-center gap-4">
        <button
          disabled={!content || !title || isSubmitting}
          className="px-5 py-3 rounded-md bg-black text-white font-medium hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          {isSubmitting ? "Creating..." : "Create"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/")}
          className="text-gray-700 hover:text-gray-900"
        >
          or Cancel
        </button>
      </div>
    </form>
  );
}
