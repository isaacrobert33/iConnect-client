import { ArrowUpTrayIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React, { ReactNode } from 'react';

export function CreateNote() {
  return (
    <Link
      href="/dashboard/notes/create"
      className="flex h-10 items-center rounded-lg bg-teal-600 px-4 text-sm font-medium text-white transition-colors hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
    >
      <span className="hidden md:block">Create Note</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export const UploadFile = ({ onClick }: {onClick: () => void;}): ReactNode => {
  return (
    <button
      onClick={onClick}
      className="flex h-10 items-center rounded-lg bg-teal-600 px-4 text-sm font-medium text-white transition-colors hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
    >
      <span className="hidden md:block">Upload File</span>{' '}
      <ArrowUpTrayIcon className="h-5 md:ml-4" />
    </button>
  );
}

export function UpdateNote({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/notes/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteNote({handleDelete }: { handleDelete?: () => void }) {
  return (
    <>
      <button onClick={handleDelete} className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </>
  );
}
