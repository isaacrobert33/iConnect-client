import { SessionPayload } from "@/app/lib/definitions";
import prisma from "@/app/lib/prisma";
import { NoteUpdateSchema } from "@/app/lib/schema";
import { decrypt } from "@/app/lib/session";
import { NextResponse } from "next/server";

type Params = {
    params: {
        id: string;
    }
}

export const GET = async (request: Request, { params }: Params) => {
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

    const note = await prisma.note.findFirst({
        where: {
            id: Number(params.id),
            userId: id,
        },
        select: {
            id: true,
            title: true,
            body: true,
            status: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    return NextResponse.json({message: 'Fetched successfully.', data: JSON.parse(JSON.stringify(note))}, { status: 200 });
}

export const PATCH = async (request: Request, { params }: Params) => {
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
    const validatedFields = NoteUpdateSchema.safeParse(data);

    if (!validatedFields.success) {
        return NextResponse.json({
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields.',
        }, { status: 400 });
    }

    const note = await prisma.note.update({
        where: {
            id: Number(params.id),
            userId: id,
        },
        data: {
            ...validatedFields.data,
            updatedAt: new Date().toISOString(),
        }
    });

    return NextResponse.json({message: 'Updated successfully.', data: JSON.parse(JSON.stringify(note))}, { status: 202 });
}

export const DELETE = async (request: Request, { params }: Params) => {
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

    await prisma.note.delete({
        where: {
            id: Number(params.id),
            userId: id,
        }
    });

    return NextResponse.json({message: 'Note deleted successfully.'}, { status: 204 });
}