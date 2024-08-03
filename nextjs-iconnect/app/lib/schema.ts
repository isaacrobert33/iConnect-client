import { z } from 'zod';

export const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    username: z.string(),
    password: z.string().min(6, {message: 'Password must be at least 6 characters long'}),
    // createdAt: z.string(),
});
