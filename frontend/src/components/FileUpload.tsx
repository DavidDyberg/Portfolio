import { type ChangeEvent } from 'react'

type FileUploadProps = {
  onFileSelect: (file: File, previewUrl: string) => void
}

export default function FileUpload({ onFileSelect }: FileUploadProps) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
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
    </div>
  )
}
