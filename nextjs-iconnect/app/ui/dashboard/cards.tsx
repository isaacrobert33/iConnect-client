'use client';

import { lusitana } from '@/app/ui/fonts';
import { useEffect, useState } from 'react';
import { NotesMetrics } from '@/app/lib/definitions';
import { ArchiveBoxIcon, BookmarkIcon, DocumentIcon, DocumentTextIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import { useSession } from '@/app/context/session';
import { CardsSkeleton } from '../skeletons';

const iconMap = {
  note_count: DocumentIcon,
  pinned_note_count: BookmarkIcon,
  active_note_count: DocumentTextIcon,
  archived_note_count: ArchiveBoxIcon,
};

export default function CardWrapper() {
  const [metrics, setMetrics] = useState<NotesMetrics | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const session = useSession();

  const fetchMetrics = async () => {
    setLoading(true);
    await axios.get(`/api/metrics`, session?.state?.apiConfig)
      .then(({ data: { data } }) => {
        console.log(data);
        setMetrics(data);
        setLoading(false);
      }).catch(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    if (!session?.state?.apiConfig?.headers?.Authorization) return;
    fetchMetrics();
  }, [session?.state?.apiConfig]);

  return (
    loading ? (
      <CardsSkeleton />
    ) : (
      <>
        {
          metrics && (
            <>
              <Card title="Notes Count" value={metrics?.noteCount} type="note_count" />
              <Card title="Pinned Notes" value={metrics?.pinnedNoteCount} type="pinned_note_count" />
              <Card title="Active Notes" value={metrics?.activeNoteCount} type="active_note_count" />
              <Card title="Archived Notes" value={metrics?.archivedNoteCount} type="archived_note_count" />
            </>
          )
        }
      </>
    )
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'note_count' | 'pinned_note_count' | 'active_note_count' | 'archived_note_count';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-100 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
