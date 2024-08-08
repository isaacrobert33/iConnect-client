'use client';

import { DirItem } from "@/app/lib/definitions";
import { DocumentIcon, FolderIcon } from "@heroicons/react/20/solid";
import { lusitana } from "../fonts";
import Link from "next/link";

const DirectoryGrid = ({files, loading, fetchFiles}: { files: DirItem[], loading: boolean, fetchFiles: () => void }) => {
    return (
        loading ? (
            <></>
        ) : (
            <div className="grid gap-6 px-2 py-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
                {
                    files.map((item, index) => (
                        <DirectoryItem key={`file-${index}`} file={item} />
                    ))
                }
            </div>
        )
    );
}

const DirectoryItem = ({ file }: { file: DirItem }) => {
    return (
        file.isDir ? (
            <Link title={file.name} href={`/dashboard/files?path=${file.fullPath}&page=1`} className="flex flex-col items-center gap-2.5 max-w-28 max-h-28 hover:border-2 hover:outline-teal-200 rounded-md bg-gray-100 p-2 shadow-sm">
                        <FolderIcon className="text-teal-700" />
                <p className={`${lusitana.className} max-w-full text-sm text-ellipsis text-nowrap overflow-hidden`}>
                    {file.name}
                </p>
            </Link>
        ) : (
            <a title={file.name} href={`/api/files/download?path=${file.fullPath}`} target="_blank" className="flex flex-col items-center gap-2.5 cursor-pointer no-underline max-w-28 max-h-28 hover:border-2 hover:outline-teal-200 rounded-md bg-gray-100 p-2 shadow-sm" download={file.name}>
                <DocumentIcon className="text-teal-700" />
                <p className={`${lusitana.className} max-w-full text-sm text-black text-ellipsis text-nowrap overflow-hidden`}>
                    {file.name}
                </p>
            </a>
        )
    );
};

export default DirectoryGrid;