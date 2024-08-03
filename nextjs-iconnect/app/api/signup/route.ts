import { NextResponse } from "next/server";
import prisma from '@/app/lib/prisma';
import bcrypt from 'bcrypt';
import { UserSchema } from "@/app/lib/schema";


const SignupSchema = UserSchema.omit({ id: true });

export async function POST(request: Request) {
    const payload = await request.json();
    const validatedFields = SignupSchema.safeParse(payload);

    if (!validatedFields.success) {
        return NextResponse.json({
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields.',
        }, { status: 400 });
    }

    const { name, username, password } = validatedFields.data;
    const createdAt = new Date().toISOString();

    const user = await prisma.user.create({
        data: {
            name,
            username,
            password: bcrypt.hashSync(password, 10),
            createdAt,
        },
    });
    return NextResponse.json({ message: 'Signup successful', data: { name: user.name, username: user.username } }, { status: 201 });
}