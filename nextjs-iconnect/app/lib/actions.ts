'use server';

import { AuthError } from 'next-auth';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
    id: z.string(),
    name: z.string({
      invalid_type_error: 'Please enter a name.',
    }),
    username: z.string({
        invalid_type_error: 'Please enter a username.',
    }),
    createdAt: z.string(),
});


export type State = {
    errors?: {
      customerId?: string[];
      amount?: string[];
      status?: string[];
    };
    message?: string | null;
};
 

export const signIn = async (prevState: State, formData: FormData) => {

};