/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import {
    Dropzone,
    FileMosaic,
    FullScreen,
    ImagePreview,
    VideoPreview,
    ExtFile
} from '@files-ui/react';
import React, {useEffect, useState} from 'react';
import '../App.css';

const MAX_FILE_SIZE = 100 * 1024*1024;

const FileUpload = ({open, path, uploadUrl, onUploadFinish, onUploadStart=() => {}, maxFiles}: {open: boolean; path: string; uploadUrl: string; onUploadFinish: (uploadedFiles: ExtFile[]) => void; onUploadStart: () => void; maxFiles: number}) => {
    const [extFiles, setExtFiles] = useState<ExtFile[]>([]);
    const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
    const [videoSrc, setVideoSrc] = useState<File | string | undefined>(undefined);


    const updateFiles = (incommingFiles: ExtFile[]) => {
        setExtFiles(incommingFiles);
    };
    const onDelete = (id: string | number | undefined) => {
        setExtFiles(extFiles.filter((x) => x.id !== id));
    };
    const handleSee = (imageSource: string | undefined) => {
        setImageSrc(imageSource);
    };

    const handleWatch = (videoSource: File | string | undefined) => {
        setVideoSrc(videoSource);
    };
    const handleFinish = (uploadedFiles: object[]) => {
        onUploadFinish(uploadedFiles);
    };
    const handleAbort = (id: string | number | undefined) => {
        setExtFiles(
            extFiles.map((ef) => {
            if (ef.id === id) {
                return {...ef, uploadStatus: 'aborted'};
            } else return {...ef};
            }),
        );
    };
    const handleCancel = (id: string | number | undefined) => {
        setExtFiles(
            extFiles.map((ef) => {
            if (ef.id === id) {
                return {...ef, uploadStatus: undefined};
            } else return {...ef};
            }),
        );
    };

    useEffect(() => {
        if (!open) {
        setExtFiles([]);
        }
    }, [open]);

    return (
        <div className='flex flex-col items-center w-full'>
        <Dropzone
            onChange={updateFiles}
            minHeight="195px"
            value={extFiles}
            accept=".xlsx"
            maxFiles={maxFiles}
            maxFileSize={MAX_FILE_SIZE}
            label="Drag'n drop files here or click to browse"
            uploadConfig={{
            // autoUpload: true
                url: `${uploadUrl}?path=${path}`,
                cleanOnUpload: true,
            }}
            onUploadStart={onUploadStart}
            onUploadFinish={handleFinish}
            actionButtons={{
            position: 'after',
            abortButton: {className: 'bg-teal-500'},
            deleteButton: {className: 'bg-teal-500'},
            uploadButton: {className: 'bg-teal-500'},
            }}
        >
            {extFiles.map((file) => (
                <FileMosaic
                    {...file}
                    key={file.id}
                    onDelete={onDelete}
                    onSee={handleSee}
                    onWatch={handleWatch}
                    onAbort={handleAbort}
                    onCancel={handleCancel}
                    resultOnTooltip
                    alwaysActive
                    preview
                    info
                />
            ))}
        </Dropzone>
        <FullScreen
            open={imageSrc !== undefined}
            onClose={() => setImageSrc(undefined)}
        >
            <ImagePreview src={imageSrc} />
        </FullScreen>
        <FullScreen
            open={videoSrc !== undefined}
            onClose={() => setVideoSrc(undefined)}
        >
            <VideoPreview src={videoSrc} autoPlay controls />
        </FullScreen>
        </div>
    );
};

export default FileUpload;
