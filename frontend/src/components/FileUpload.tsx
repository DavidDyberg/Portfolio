import { useState, type ChangeEvent } from 'react'

type FileUploadProps = {
  onFileSelect: (file: File, previewUrl: string) => void
}

export default function FileUpload({ onFileSelect }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const previewUrl = URL.createObjectURL(selectedFile)
      onFileSelect(selectedFile, previewUrl)
    }
  }

  return (
    <div className="text-white space-y-2">
      <input
        id="imageUpload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      {file && (
        <div className="mb-4 text-sm text-white">
          <p>File name: {file.name}</p>
          <p>File size: {(file.size / 1024).toFixed(2)} KB</p>
          <p>File type: {file.type}</p>
          <img
            className="w-32 h-32 object-cover"
            src={URL.createObjectURL(file)}
            alt="Preview"
          />
        </div>
      )}
    </div>
  )
}
