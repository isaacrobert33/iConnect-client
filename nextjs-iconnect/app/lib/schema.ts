import { z } from 'zod';

export const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    username: z.string(),
    password: z.string().min(6, {message: 'Password must be at least 6 characters long'}),
    createdAt: z.string(),
});

export const NoteSchema = z.object({
    id:  z.number(),
    title: z.string(),
    body: z.string(),
    status: z.string(),
    userId: z.number(),
    createdAt: z.string(),
});

export const NoteUpdateSchema = z.object({
    title: z.string().optional(),
    body: z.string().optional(),
    status: z.string().optional(),
});
