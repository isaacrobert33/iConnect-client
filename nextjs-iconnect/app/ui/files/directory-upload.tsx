'use client';

import FileUpload from "./files-upload";
import { Button } from "../button";
import { useState } from "react";


const DirectoryUpload = ({path, open, onClose, fetchFiles}: {path: string; open: boolean; onClose: () => void; fetchFiles: () => void;}) => {
    const [uploading, setUploading] = useState(false);
    const handleUploadFinish = () => {
        onClose();
        fetchFiles();
    }

    const handleUploadStart = () => {
        setUploading(true);
    }

    console.log(open);
    

    return (
        <div className={`${open ? 'block' : 'hidden'} fixed backdrop-blur-sm w-full h-full overflow-hidden z-10 top-0 bottom-0 right-0 left-0`}>
            <div className="flex items-center justify-center w-full h-full">
                <div className={`flex flex-col shadow-2xl rounded-md max-w-96 p-4 bg-white`}>
                    <div className="flex flex-row justify-center items-center">
                        <p className="text-lg text-semibold">Upload file</p>
                    </div>
                    <hr className="shrink-0 my-2" />
                    <FileUpload 
                        open={open}
                        path={path}
                        uploadUrl="/api/files"
                        onUploadFinish={handleUploadFinish}
                        onUploadStart={handleUploadStart}
                        maxFiles={5}
                        />
                    <hr className="shrink-0 my-2" />
                    <div className="flex flex-row justify-end items-center">
                        <Button onClick={onClose} disabled={uploading}>Close</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DirectoryUpload;