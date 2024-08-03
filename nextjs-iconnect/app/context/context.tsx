'use client';

import React, { createContext, useReducer } from 'react';
import { SessionContextProviderProps, SessionContextState, SessionContextType } from '../lib/definitions';

// Create context with an undefined default
export const SessionContext = createContext<SessionContextType | undefined>(undefined);

// Define initial state
const initialState: SessionContextState = {
    session: null,
    apiConfig: {
        headers: {
            Authorization: null,
            Accept: 'application/json, text/plain, */*',
        },
    },
};

// Reducer function with type safety for action types
const reducer = (state: SessionContextState, action: { type: 'UPDATE_CONFIG' | 'UPDATE_SESSION'; payload: any }): SessionContextState => {
    switch (action.type) {
        case 'UPDATE_CONFIG':
            return { ...state, apiConfig: action.payload };
        case 'UPDATE_SESSION':
            return { ...state, session: action.payload };
        default:
            return state;
    }
};

// SessionContextProvider component
export const SessionContextProvider: React.FC<SessionContextProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <SessionContext.Provider value={{ state, dispatch }}>
            {children}
        </SessionContext.Provider>
    );
};
