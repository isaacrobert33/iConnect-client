'use client';

import { useContext } from 'react';
import { SessionContext } from './context';
import { SessionContextType } from '../lib/definitions';

export const useSession = (): SessionContextType | undefined => {
    return useContext(SessionContext);
}
