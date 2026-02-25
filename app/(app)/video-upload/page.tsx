"use client"

import React, {useState} from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

function VideoUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState("")
  const [isUploading, setIsUploading] = useState(false)

  const router = useRouter()

  const MAX_FILE_SIZE = 70 * 1024 * 1024

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    if (file.size > MAX_FILE_SIZE) {
      toast.error('File size too large 🤏')
      return
    }

    setIsUploading(true)

    const formData = new FormData()
    formData.append("file", file)
    formData.append("title", title)
    formData.append("description", description)
    formData.append("originalSize", file.size.toString())

    try {
      const response = await axios.post("/api/video-upload", formData)

      if (response.status === 200) {
        toast.success(response.data.message || "Upload successful 🚀")
      }

    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message || "Server error ❌")
      } else {
        toast.error("Network error 🔥")
      }
    } finally {
      setIsUploading(false)
    }
  }
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Upload Video</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='label'>
            <span className='label-text'>
              Title
            </span>
          </label>
          <input
           type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='input input-bordered w-full'
            required
           />
        </div>
        <div>
          <label className='label'>
            <span className='label-text'>Description</span>
          </label>
          <textarea className='input input-bordered w-full' value={description} onChange={(e)=>setDescription(e.target.value)} />
        </div>
        <div >
          <label className='label'>
            <span className='label-text'>
              Video File
            </span>
          </label>
          <input
           type="file" 
          accept='video/*'
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className='file-input file-input-bordered w-full'
          required
          />
        </div>
        <button 
        type='submit'
        className='btn btn-primary'
        disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </div>
  )
}
export default VideoUpload