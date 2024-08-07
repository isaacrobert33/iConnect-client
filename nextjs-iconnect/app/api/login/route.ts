import { NextResponse } from "next/server";
import prisma from '@/app/lib/prisma';
import { encrypt } from '@/app/lib/session';
import bcrypt from 'bcrypt';
import { UserSchema } from "@/app/lib/schema";


const LoginSchema = UserSchema.omit({ id: true, name: true, createdAt: true })

export async function POST(request: Request) {
    const payload = await request.json();
    const validatedFields = LoginSchema.safeParse(payload);

    if (!validatedFields.success) {
        return NextResponse.json({
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields.',
        }, { status: 400 });
    }

    const { username, password } = validatedFields.data;

    const user = await prisma.user.findUnique({
        where: {
            username,
        },
    });

    if (!user) {
        return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
    }
    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
        return NextResponse.json({ message: 'Password doesn\'t match username.' }, { status: 401 });
    }
    const accessToken = await encrypt({id: user.id, username: user.username});
    return NextResponse.json({ message: 'Login successful', accessToken}, { status: 200 });
}