import DirectoryList from '@/app/ui/files/directory-list';
import { lusitana } from '@/app/ui/fonts';
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
    <DirectoryList path={path} query={query} currentPage={currentPage} />
  </div>
);
}