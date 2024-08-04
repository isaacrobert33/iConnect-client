import { SessionPayload } from "@/app/lib/definitions";
import prisma from "@/app/lib/prisma";
import { NoteSchema } from "@/app/lib/schema";
import { decrypt } from "@/app/lib/session";
import { NextResponse } from "next/server";

const Schema = NoteSchema.omit({id: true, userId: true, createdAt: true});

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

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const page = searchParams.get('page') || 1;
    const limit = searchParams.get('limit') || 10;

    const { id } = payload as SessionPayload;
    const searchQuery = query ? {
        OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { body: { contains: query, mode: 'insensitive' } },
        ],
    }: {};

    const [notes, count] = await prisma.$transaction([
        prisma.note.findMany({
            skip: (Number(page) - 1) * Number(limit),
            take: Number(limit),
            where: {
                userId: id,
                ...searchQuery,
            },
            select: {
                id: true,
                title: true,
                body: true,
                status: true,
                createdAt: true,
                updatedAt: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        }),
        prisma.note.count({
            where: {
                userId: id,
                ...searchQuery,
            },
        }),
    ]);

    return NextResponse.json({message: 'Fetched successfully.', results: {data: JSON.parse(JSON.stringify(notes)), count}}, { status: 200 });
}

export const POST = async (request: Request) => {
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
    const data = await request.json();
    const validatedFields = Schema.safeParse(data);

    if (!validatedFields.success) {
        return NextResponse.json({
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields.',
        }, { status: 400 });
    }

    const { title, body, status } = validatedFields.data;

    const note = await prisma.note.create({
        data: {
            title,
            body,
            status,
            userId: id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
    });
    return NextResponse.json({message: 'Note created successfully.', data: JSON.parse(JSON.stringify(note))}, { status: 201 });
}
