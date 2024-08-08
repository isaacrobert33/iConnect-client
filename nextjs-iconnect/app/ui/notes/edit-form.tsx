'use client';

import {  Note, NoteForm, Response } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { useState } from 'react';
import { ArchiveBoxIcon, BookmarkIcon, CheckCircleIcon, DocumentIcon, DocumentTextIcon, ExclamationCircleIcon, TagIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useSession } from '@/app/context/session';
import axios from 'axios';

export default function EditNoteForm({
  note,
}: {
  note: Note;
}) {
  const [formData, setFormData] = useState<NoteForm>({
    title: note.title,
    body: note.body,
    status: note.status,
  });

  const [response, setResponse] = useState<Response>({success: false, data: null});
  const session = useSession();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBodyChange = (e: any) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setResponse({success: false, data: null});
    event.preventDefault();
    await axios.patch(`/api/notes/${note.id}`, formData, session?.state?.apiConfig)
      .then(({ data }) => {
        setResponse({success: true, data });
        router.push('/dashboard/notes');
      }).catch(({ response: { data } }) => {
        setResponse({success: false, data });
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Note Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Enter a title
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                defaultValue={note.title}
                onChange={handleChange}
                placeholder="Enter title"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        {/* Note Body */}
        <div className="mb-4">
          <label htmlFor="body" className="mb-2 block text-sm font-medium">
            Enter the note body
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                  rows={8}
                  id="body"
                  name="body"
                  value={formData.body}
                  defaultValue={note.body}
                  onChange={handleBodyChange}
                  placeholder="Write your note..."
                  className="peer block w-full h-40 rounded-md border resize-none border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              <DocumentIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Note Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the note status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="archived"
                  name="status"
                  type="radio"
                  value="archived"
                  checked={formData.status === 'archived'}
                  defaultChecked={note.status === 'archived'}
                  onChange={handleChange}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="archived"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Archived <ArchiveBoxIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="active"
                  name="status"
                  type="radio"
                  value="active"
                  checked={formData.status === 'active'}
                  defaultChecked={note.status === 'active'}
                  onChange={handleChange}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="active"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Active <DocumentTextIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="pinned"
                  name="status"
                  type="radio"
                  value="pinned"
                  checked={formData.status === 'pinned'}
                  defaultChecked={note.status === 'pinned'}
                  onChange={handleChange}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="pinned"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-blue-400 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Pinned <BookmarkIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
        <div className={'flex flex-row gap-1'}>
          {response.data && (
              response.success ? (
                <>
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  <p className="text-sm text-green-500">{response.data.message}</p>
                </>
              ) : (
                <>
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">{response.data.message}</p>
                </>
              )
            )}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Invoice</Button>
      </div>
    </form>
  );
}
