"use client"

import { useEffect, useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import axios from "axios"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

const formSchema = z.object({
  title: z.string().min(2, { message: "Title is required" }),
  description: z.string().min(5, { message: "Description is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  client: z.string().optional(),
  image: z.any().refine((file) => file?.length === 1, "Image is required"),
  videoLink: z.string().url().optional(),
})

export default function UploadForm() {
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [posts, setPosts] = useState([])
  const [successMsg, setSuccessMsg] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      client: "",
      image: undefined,
      videoLink: "",
    },
  })

  const { watch, handleSubmit, setValue, reset } = form
  const watchedImage = watch("image")

  useEffect(() => {
    if (watchedImage?.[0]) {
      const file = watchedImage[0]
      setPreviewImage(URL.createObjectURL(file))
    }
  }, [watchedImage])

  const fetchPosts = async () => {
    const res = await fetch("/api/getPosts")
    const data = await res.json()
    setPosts(data)
  }

  const onSubmit = async (values: any) => {
    try {
      const formData = new FormData()
      formData.append("title", values.title)
      formData.append("description", values.description)
      formData.append("category", values.category)
      formData.append("client", values.client || "")
      formData.append("videoLink", values.videoLink || "")
      formData.append("image", values.image[0])

      const response = await axios.post("/api/addPost", formData)
      setSuccessMsg("Post uploaded successfully!")
      setErrorMsg("")
      fetchPosts()
      reset()
      setPreviewImage(null)
    } catch (error) {
      setErrorMsg("Something went wrong.")
      setSuccessMsg("")
    }
  }

  return (
    <div className="rounded-xl border border-[#F57C1F] bg-white/10 backdrop-blur-md p-6 w-8xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Upload New Post</h2>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField name="title" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl><Input placeholder="e.g. Northern Tunnel Project" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name="description" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl><Textarea placeholder="Project description..." {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name="category" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="infographic">Infographic</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="report">Report</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name="client" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Client</FormLabel>
              <FormControl><Input placeholder="e.g. Athi Water Works" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name="image" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl><Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files)} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {previewImage && (
            <div className="mt-2">
              <Image src={previewImage} alt="Preview" width={300} height={200} className="rounded-md" />
            </div>
          )}

          <FormField name="videoLink" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Video/Photo Link (optional)</FormLabel>
              <FormControl><Input placeholder="https://example.com" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <Button type="submit">Submit</Button>

          {successMsg && <p className="text-green-600">{successMsg}</p>}
          {errorMsg && <p className="text-red-600">{errorMsg}</p>}
        </form>
      </Form>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">All Posts</h3>
        <ul className="space-y-4">
          {posts.map((post: any, i: number) => (
            <li key={i} className="border p-4 rounded-md">
              <h4 className="font-bold">{post.title}</h4>
              <p>{post.description}</p>
              {post.image && <Image src={post.image} alt={post.title} width={300} height={200} className="mt-2 rounded-md" />}
              {post.videoLink && <a href={post.videoLink} target="_blank" className="text-blue-600 underline">Watch Video</a>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
