'use client';

import Form from '@/app/ui/notes/edit-form';
import Breadcrumbs from '@/app/ui/notes/breadcrumbs';
import { useEffect, useState } from 'react';
import { Note } from '@/app/lib/definitions';
import axios from 'axios';
import { useSession } from '@/app/context/session';
import { NoteEditSkeleton } from '@/app/ui/skeletons';
 
export default function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [note, setNote] = useState<Note | null>(null);
    const [loading, setLoading] = useState(true);
    const session = useSession();

    const fetchNote = async () => {
        setLoading(true);
        await axios.get(`/api/notes/${id}`, session?.state?.apiConfig)
            .then(({ data: { data } }) => {
                setNote(data);
                setLoading(false);
            }).catch(() => {
                setLoading(false);
            })
    }

    useEffect(() => {
        if (!session?.state?.apiConfig?.headers?.Authorization) return;
        fetchNote();
    }, [id, session?.state?.apiConfig])

  return (
    <main>
        <Breadcrumbs
            breadcrumbs={[
            { label: 'Note', href: '/dashboard/notes' },
            {
                label: 'Edit Note',
                href: `/dashboard/notes/${id}/edit`,
                active: true,
            },
            ]}
        />
        {
            note ? (
                <Form note={note} />
            ) : (
                loading ? (
                    <NoteEditSkeleton />
                ) : <></>
            )
        }
    </main>
  );
}