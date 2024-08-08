'use client';

import { DeleteNote, UpdateNote } from '@/app/ui/notes/buttons';
import NoteStatus from '@/app/ui/notes/status';
import { formatDateToLocal } from '@/app/lib/utils';
import { Note } from '@/app/lib/definitions';
import { NotesTableSkeleton } from '../skeletons';
import { useSession } from '@/app/context/session';
import axios from 'axios';

export default function NotesTable({
  notes,
  loading,
  fetchNotes,
}: {
  notes: Note[];
  loading: boolean;
  fetchNotes: () => void;
}) {

  const session = useSession();
  
  const handleDeleteNote = (id: string) => async () => {
    const confirm = window.confirm('Are you sure you want to delete this note?');
    if (!confirm) return;

    await axios.delete(`/api/notes/${id}`, session?.state?.apiConfig)
      .then(() => {
        fetchNotes();
      }).catch(({ response: { data } }) => {
        console.log(data);
      })
  }

  return (
      loading ? (
        <NotesTableSkeleton />
      ) : (
        <div className="mt-6 flow-root">
          <div className="inline-block min-w-full align-middle">
            <div className="rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white p-2 md:pt-0">
              <div className="md:hidden">
                {notes?.map((note) => (
                  <div
                    key={note.id}
                    className="mb-2 w-full rounded-md dark:bg-gray-700 dark:text-white bg-white p-4">
                    <div className='flex flex-col gap-4 border-b pb-4'>
                      <div className="flex items-center justify-between pb-1">
                        <div>
                          <div className="mb-2 flex items-center font-bold">
                            <p>{note.title}</p>
                          </div>
                        </div>
                        <NoteStatus status={note.status} />
                      </div>
                      <div className='block'>
                        <p className='text-md'>{note.body}</p>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between pt-4">
                      <div className="flex justify-end gap-2">
                        <UpdateNote id={note.id} />
                        <DeleteNote handleDelete={handleDeleteNote(note.id)} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full text-gray-900 dark:text-white md:table">
                <thead className="rounded-lg text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Title
                    </th>
                    <th scope="col" className="px-2.5 py-5 font-medium">
                      Body
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Date
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Last Updated Date
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Status
                    </th>
                    <th scope="col" className="relative py-3 pl-6 pr-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800">
                  {notes?.map((note) => (
                    <tr
                      key={note.id}
                      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex items-center gap-3">
                          <p>{note.title}</p>
                        </div>
                      </td>
                      {/* <td className="whitespace-nowrap px-3 py-3">
                        {note.email}
                      </td> */}
                      <td title={note.body} className="whitespace-nowrap px-3 py-3 overflow-hidden text-ellipsis max-w-36">
                        {note.body}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {formatDateToLocal(note.createdAt)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {formatDateToLocal(note.updatedAt)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        <NoteStatus status={note.status} />
                      </td>
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                          <UpdateNote id={note.id} />
                          <DeleteNote handleDelete={handleDeleteNote(note.id)} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
  );
}
