'use client';

import Pagination from '@/app/ui/notes/pagination';
import { useSession } from '@/app/context/session';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BreadCrumbType, DirItem } from '@/app/lib/definitions';
import DirectoryGrid from './grids';
import Breadcrumbs from '../notes/breadcrumbs';
import { createPathBreadcrumbs } from '@/app/lib/utils';


const DirectoryList = ({ currentPage, query, path }: { currentPage: number, query: string, path: string }) => {
    const [totalFiles, setTotalFiles] = useState<number>(0);
    const [files, setFiles] = useState<DirItem[]>([]);
    const [crumbs, setCrumbs] = useState<BreadCrumbType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const session = useSession();

    const fetchFiles = async () => {
        setLoading(true);
        await axios.get(`/api/files?path=${path}&q=${query}&page=${currentPage}&limit=50`, session?.state?.apiConfig)
            .then(({ data: { results } }) => {
                setFiles(results.data);
                setTotalFiles(Math.ceil(results.count/50));
                setLoading(false);
            }).catch(({ response }) => {
                console.log(response);
                setLoading(false);
            })
    }
  
    useEffect(() => {
        if (session?.state?.apiConfig?.headers?.Authorization) {
            fetchFiles();
        }
        setCrumbs(createPathBreadcrumbs(path));
    }, [session?.state?.apiConfig, currentPage, query, path])

    return (
        <div className='w-full py-2'>
            <Breadcrumbs
                breadcrumbs={[
                    {label: 'Root', href: `/dashboard/files?path=/&page=1`, active: !crumbs.length},
                    ...crumbs]}
            />
            <DirectoryGrid files={files} loading={loading} fetchFiles={fetchFiles} />
            <div className="mt-5 flex w-full justify-center">
                <Pagination total={totalFiles} />
            </div>
        </div>
    );
};

export default DirectoryList;