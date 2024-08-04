import { BookmarkIcon, ArchiveBoxIcon, DocumentTextIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

export default function NoteStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex gap-1 items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': status === 'archived',
          'bg-green-500 text-white': status === 'active',
          'bg-blue-400 text-white': status === 'pinned',
        },
      )}
    >
      {status === 'archived' ? (
        <>
          <ArchiveBoxIcon className="ml-1 w-4 text-gray-500" />
          Archived
        </>
      ) : null}
      {status === 'active' ? (
        <>
          <DocumentTextIcon className="ml-1 w-4 text-white" />
          Active
        </>
      ) : null}
      {status === 'pinned' ? (
        <>
          <BookmarkIcon className="ml-1 w-4 text-white" />
          Pinned
        </>
      ) : null}
    </span>
  );
}
