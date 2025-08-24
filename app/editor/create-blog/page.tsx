"use client"

import React, { useState } from "react"
import dynamic from "next/dynamic"

const RichTextEditor = dynamic(() => import("@/components/persional/Editor"), {
  ssr: false,
})

export default function Page() {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [tags, setTags] = useState("")
  const [image, setImage] = useState<File | null>(null)

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault()
    const content = localStorage.getItem("editor-text") || ""

    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", desc)
    formData.append("tags", tags)
    formData.append("content", content)
    if (image) formData.append("image", image)

    try {
      const res = await fetch("/api/insertblog", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      if (res.ok) {
        alert("Blog inserted successfully ✅")
        console.log("Response:", data)
      } else {
        alert("Error: " + data.message)
      }
    } catch (error) {
      console.error("Error submitting blog:", error)
      alert("Something went wrong")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="props">
      <div className="my-2 bg-white text-black text-xl p-4 w-full">
        <input
          placeholder="Enter Title."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-black p-4 w-full"
          required
        />
      </div>

      {/* render editor only on client */}
      {typeof window !== "undefined" && <RichTextEditor />}

      <div className="my-2 bg-white text-black text-lg p-4 w-full">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] ?? null)}
          className="border border-black p-4 w-full"
        />

        <textarea
          placeholder="Enter Description."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="border border-black p-4 w-full my-2"
          rows={6}
        ></textarea>

        <input
          placeholder="Tags (separate by ,)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="border border-black p-4 w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-black text-white px-6 py-3 rounded-lg mt-4"
      >
        Submit Blog
      </button>
    </form>
  )
}
