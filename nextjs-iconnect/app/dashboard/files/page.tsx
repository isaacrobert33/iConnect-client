import DirectoryList from '@/app/ui/files/directory-list';
import { lusitana } from '@/app/ui/fonts';
import Breadcrumbs from '@/app/ui/notes/breadcrumbs';
import { UploadFile } from '@/app/ui/notes/buttons';
import Search from '@/app/ui/search';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Files | iConnect',
};


export default function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    path?: string;
  };
}) {
  const query = searchParams?.query || '';
  const path = searchParams?.path || '';
  const currentPage = Number(searchParams?.page) || 1;

return (
  <div className="w-full">
    <div className="flex w-full items-center justify-between">
      <h1 className={`${lusitana.className} text-2xl`}>Files</h1>
    </div>
    <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
      <Search placeholder="Search files..." />
      <UploadFile />
    </div>
    <DirectoryList path={path} query={query} currentPage={currentPage} />
  </div>
);
}