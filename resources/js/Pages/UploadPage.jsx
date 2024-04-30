// import React, { useState } from 'react';
// import UploadFile from "@/Pages/Files/UploadFile";
// import FileGallery from "@/Pages/Files/FileGallery";
//
//
// const UploadPage = () => {
//     const [fileName, setFileName] = useState(null);
//     const [fileUrl, setFileUrl] = useState(null);
//
//     const handleFileUpload = (file) => {
//         setFileName(file.name);
//         setFileUrl(URL.createObjectURL(file));
//     };
//
//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-2xl font-semibold text-center mb-4">File Upload and Display</h1>
//             <UploadFile onFileUpload={handleFileUpload} />
//             <FileGallery fileName={fileName} fileUrl={fileUrl} />
//         </div>
//     );
// };
//
// export default UploadPage;
