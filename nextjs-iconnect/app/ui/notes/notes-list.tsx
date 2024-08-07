'use client';

import Table from '@/app/ui/notes/table';
import Pagination from '@/app/ui/notes/pagination';
import { useSession } from '@/app/context/session';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Note } from '@/app/lib/definitions';


const NotesList = ({ currentPage, query }: { currentPage: number, query: string }) => {
    const [totalNotes, setTotalNotes] = useState<number>(0);
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const session = useSession();

    const fetchNotes = async () => {
        setLoading(true);
        await axios.get(`/api/notes?q=${query}&page=${currentPage}&limit=10`, session?.state?.apiConfig)
            .then(({ data: { results } }) => {
                setNotes(results.data);
                setTotalNotes(Math.ceil(results.count/10));
                setLoading(false);
            }).catch(({ response: { data } }) => {
                console.log(data);
                setLoading(false);
            })
    }
  
    useEffect(() => {
        if (session?.state?.apiConfig?.headers?.Authorization) {
            fetchNotes();
        }
    }, [session?.state?.apiConfig, currentPage, query])

    return (
        <>
            <Table notes={notes} loading={loading} fetchNotes={fetchNotes} />
            <div className="mt-5 flex w-full justify-center">
                <Pagination total={totalNotes} />
            </div>
        </>
    );
};

export default NotesList;