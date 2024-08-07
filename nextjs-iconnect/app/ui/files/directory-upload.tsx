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

    return (
        <div className={`${open ? 'block' : 'hidden'} absolute blur-md w-full h-full overflow-hidden z-10 top-0 bottom-0 right-0 left-0`}>
            <div className={`relative flex flex-col shadow-xl rounded-md min-w-80 bg-white p-2`}>
                <p className="text-lg text-bold">Upload file</p>
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
                    <Button disabled={uploading}>Close</Button>
                </div>
            </div>
        </div>
    );
}

export default DirectoryUpload;