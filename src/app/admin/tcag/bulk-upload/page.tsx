// src/app/admin/tcag/bulk-upload/page.tsx
'use client';
import axios from 'axios';
import { useState } from 'react';

export default function BulkImageUpload() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!files) return alert("No files selected");
    setUploading(true);

    const imageUrls: string[] = [];

    for (const file of Array.from(files)) {
      const { data } = await axios.post('/api/create-presigned-url', {
        fileName: file.name,
        fileType: file.type,
      });

      await axios.put(data.uploadUrl, file, {
        headers: { 'Content-Type': file.type },
      });

      imageUrls.push(data.imageUrl);
    }

    await axios.post('/api/save-products', { imageUrls });

    setUploading(false);
    alert("All images uploaded and products saved!");
  };

  return (
    <div className="min-h-screen p-8 bg-gray-900">
      <input
        type="file"
        accept="image/png"
        multiple
        onChange={(e) => setFiles(e.target.files)}
        className="text-white"
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="px-4 py-2 mt-4 text-white bg-green-500 rounded"
      >
        {uploading ? 'Uploading...' : 'Upload Images'}
      </button>
    </div>
  );
}
