import Search from '@/app/ui/search';
import { CreateNote } from '@/app/ui/notes/buttons';
import { lusitana } from '@/app/ui/fonts';
import { Metadata } from 'next';
import NotesList from '@/app/ui/notes/notes-list';
 
export const metadata: Metadata = {
  title: 'Notes | iConnect',
};


export default function Page({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
      page?: string;
    };
  }) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl dark:text-white`}>Notes</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search notes..." />
        <CreateNote />
      </div>
      <NotesList query={query} currentPage={currentPage} />
    </div>
  );
}