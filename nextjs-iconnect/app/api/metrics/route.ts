import { SessionPayload } from "@/app/lib/definitions";
import prisma from "@/app/lib/prisma";
import { decrypt } from "@/app/lib/session";
import { NextResponse } from "next/server"

export const GET = async (request: Request) => {
    const authToken = request.headers.get('authorization');

    if (!authToken) {
        return NextResponse.json({ message: 'No authorization token found' }, { status: 401 });
    }
    const token = authToken.split(' ')[1];

    if (!token) {
        return NextResponse.json({ message: 'No token found' }, { status: 401 });
    }
    
    const payload = await decrypt(token);

    if (!payload) {
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const { id } = payload as SessionPayload;

    const [noteCount, pinnedNoteCount, activeNoteCount, archivedNoteCount] = await prisma.$transaction([
        prisma.note.count({
            where: {
                userId: id,
            },
        }),
        prisma.note.count({
            where: {
                userId: id,
                status: 'pinned'
            },
        }),
        prisma.note.count({
            where: {
                userId: id,
                status: 'active'
            },
        }),
        prisma.note.count({
            where: {
                userId: id,
                status: 'archived'
            },
        }),
    ]);

    return NextResponse.json({
        message: 'Fetched successfully.', 
        data: { noteCount, pinnedNoteCount, activeNoteCount, archivedNoteCount }}, 
        { status: 200 });
}
