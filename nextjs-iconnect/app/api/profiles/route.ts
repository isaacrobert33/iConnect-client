import { SessionPayload } from "@/app/lib/definitions";
import prisma from "@/app/lib/prisma";
import { decrypt } from "@/app/lib/session";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
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

    const { id, username } = payload as SessionPayload;

    const user = await prisma.user.findUnique({
        where: {
            id,
            username,
        },
        select: {
            id: true,
            username: true,
            name: true,
            createdAt: true,
        }
    });

    return NextResponse.json({ message: '', data: JSON.parse(JSON.stringify(user)) }, { status: 200 });
};