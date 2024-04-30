import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Masonry from 'react-masonry-css';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import FileUpload from "@/Pages/Files/FileUpload";

export default function FileGallery({ auth }) {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const response = await axios.get('/files');
            setFiles(response.data);
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    const handleFileClick = (file) => {
        setSelectedFile(file);
    };

    const handleCloseModal = () => {
        setSelectedFile(null);
    };

    const handleModalClick = (e) => {
        if (e.target === e.currentTarget) {
            handleCloseModal();
        }
    };

    const handleUpload = (newFiles) => {
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const breakpointColumnsObj = {
        default: 6,
        1100: 4,
        700: 2,
        500: 1
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">File Gallery</h1>
                <FileUpload onUpload={handleUpload} />
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {files.map(file => (
                        <div
                            key={file.fileName}
                            className="relative cursor-pointer mb-4"
                            onClick={() => handleFileClick(file)}
                        >
                            <img
                                src={`/file/${file.fileName}`}
                                alt={file.fileName}
                                className="w-full h-auto object-cover rounded-lg shadow-md"
                            />
                        </div>
                    ))}
                </Masonry>
                {selectedFile && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                        onClick={handleModalClick}
                    >
                        <div className="bg-white p-4 rounded-lg relative mx-auto">
                            <img
                                src={`/file/${selectedFile.fileName}`}
                                alt={selectedFile.fileName}
                                className="w-full h-auto max-h-[90vh] object-contain rounded-lg mb-4"
                            />
                            {/*<a*/}
                            {/*    href={`/file/${selectedFile.fileName}`}*/}
                            {/*    className="absolute top-4 right-4 text-blue-500"*/}
                            {/*    download*/}
                            {/*>*/}
                            {/*    <svg*/}
                            {/*        xmlns="http://www.w3.org/2000/svg"*/}
                            {/*        className="w-6 h-6"*/}
                            {/*        viewBox="0 0 24 24"*/}
                            {/*        fill="none"*/}
                            {/*        stroke="currentColor"*/}
                            {/*        strokeWidth="2"*/}
                            {/*        strokeLinecap="round"*/}
                            {/*        strokeLinejoin="round"*/}
                            {/*    >*/}
                            {/*        <path d="M12 20h9a2 2 0 0 0 2-2v-9"></path>*/}
                            {/*        <path d="M12 3v15"></path>*/}
                            {/*        <path d="M5 10l7 7 7-7"></path>*/}
                            {/*    </svg>*/}
                            {/*</a>*/}
                            {/*<button*/}
                            {/*    onClick={handleCloseModal}*/}
                            {/*    className="absolute top-4 left-4 text-white"*/}
                            {/*>*/}
                            {/*    Close*/}
                            {/*</button>*/}
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
