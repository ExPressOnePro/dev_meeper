import React, { useState } from 'react';
import axios from 'axios';

export default function FileUpload({ onUpload }) {
    const [files, setFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState([]);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (event) => {
        setFiles(event.target.files);
    };

    const handleUpload = async () => {
        setUploading(true);
        const uploadProgressArray = Array.from({ length: files.length }, () => 0);
        setUploadProgress(uploadProgressArray);

        const promises = Array.from(files).map((file, index) => {
            const formData = new FormData();
            formData.append('file', file);

            return axios.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress((prevProgress) => {
                        const newProgress = [...prevProgress];
                        newProgress[index] = percentCompleted;
                        return newProgress;
                    });
                },
            });
        });

        try {
            const responses = await Promise.all(promises);
            const newFiles = responses.map((response) => ({
                fileName: response.data.original,
                thumbnail: response.data.thumbnail
            }));
            onUpload(newFiles); // Call onUpload with new files
        } catch (error) {
            console.error('Error uploading files:', error.response || error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <input type="file" multiple onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={uploading} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                Upload
            </button>
            {uploading && <div className="mt-2">Uploading...</div>}
            {files.length > 0 && (
                <div className="mt-4">

                </div>
            )}
        </div>
    );
}
