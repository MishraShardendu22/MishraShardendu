/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import type { File as FileType } from "@/lib/db/schema"

interface FileProps {
  userId: string
  parentId?: string | null
}

const FileList = ({ userId, parentId = null }: FileProps) => {
  const [currentFolder, setCurrentFolder] = useState<string | null>(parentId || null)
  const [folderPath, setFolderPath] = useState<Array<{ id: string; name: string }>>([])
  const [files, setFiles] = useState<FileType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    setCurrentFolder(parentId || null)
    setFolderPath([])
  }, [parentId])

  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true)
      try {
        let url = `/api/files?userId=${userId}`
        if (currentFolder) {
          url += `&parentId=${currentFolder}`
        }
        const res = await axios.get(url)
        setFiles(res.data)
        setError("")
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to load files")
        setFiles([])
      } finally {
        setLoading(false)
      }
    }
    fetchFiles()
  }, [userId, currentFolder])

  const navigateToFolder = (folderId: string, folderName: string) => {
    setCurrentFolder(folderId)
    setFolderPath([...folderPath, { id: folderId, name: folderName }])
  }

  const navigateUp = () => {
    if (folderPath.length > 0) {
      const newPath = [...folderPath]
      newPath.pop()
      setFolderPath(newPath)
      const newFolderId = newPath.length > 0 ? newPath[newPath.length - 1].id : null
      setCurrentFolder(newFolderId)
    }
  }

  const navigateToPathFolder = (index: number) => {
    if (index < 0) {
      setFolderPath([])
      setCurrentFolder(null)
    } else {
      const newPath = folderPath.slice(0, index + 1)
      setFolderPath(newPath)
      setCurrentFolder(newPath[newPath.length - 1].id)
    }
  }

  if (loading) return <p>Loading files...</p>
  if (error) return <p className="text-red-500">{error}</p>
  if (files.length === 0) return <p>No files found.</p>

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <button onClick={() => navigateToPathFolder(-1)}>Home</button>
        {folderPath.map((f, i) => (
          <span key={f.id}>
            /<button onClick={() => navigateToPathFolder(i)}>{f.name}</button>
          </span>
        ))}
      </div>
      <ul className="space-y-2">
        {files.map((file) => (
          <li
            key={file.id}
            className={`border p-2 rounded ${file.isFolder ? "cursor-pointer" : ""}`}
            onClick={() => {
              if (file.isFolder) {
                navigateToFolder(file.id, file.name)
              }
            }}
          >
            <div className="font-medium">{file.name}</div>
            <div className="text-sm text-gray-600">
              {file.isFolder ? "Folder" : file.type} -{" "}
              {new Date(file.createdAt).toLocaleDateString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FileList
