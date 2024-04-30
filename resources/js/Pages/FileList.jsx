// import React from 'react';
// import { Inertia } from '@inertiajs/inertia';
// import { Head } from '@inertiajs/react';
// import FileThumbnail from "@/Pages/FileThumbnail";
//
// const FileList = ({ files }) => {
//     const handleDownload = (fileName) => {
//         Inertia.visit(route('file.download', fileName));
//     };
//
//     return (
//         <div className="container mx-auto p-4">
//             <Head title="File List"/>
//             <h1 className="text-2xl font-semibold mb-4">File List</h1>
//
//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
//                 {files.map((file) => (
//                     <FileThumbnail key={file} fileName={file}/>
//                 ))}
//             </div>
//
//             {/*<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">*/}
//             {/*    {files.map((file, index) => (*/}
//             {/*        <div key={index} className="relative group">*/}
//             {/*            <img*/}
//             {/*                src={route('file.thumbnail', file.split('/').pop())}*/}
//             {/*                alt={file.split('/').pop()}*/}
//             {/*                className="w-full h-full object-cover rounded"*/}
//             {/*            />*/}
//             {/*            <div*/}
//             {/*                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">*/}
//             {/*                <button*/}
//             {/*                    onClick={() => handleDownload(file.split('/').pop())}*/}
//             {/*                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"*/}
//             {/*                >*/}
//             {/*                    Download*/}
//             {/*                </button>*/}
//             {/*            </div>*/}
//             {/*        </div>*/}
//             {/*    ))}*/}
//             {/*</div>*/}
//         </div>
//     );
// };
//
// export default FileList;
