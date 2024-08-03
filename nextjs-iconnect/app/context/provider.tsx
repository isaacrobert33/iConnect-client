'use client';

import React from "react";
import { SessionContextProviderProps } from "../lib/definitions";
import { SessionContextProvider } from "./context";

const SessionProvider: React.FC<SessionContextProviderProps> = ({ children }): React.ReactElement => {
    return (
        <SessionContextProvider>
            {children}
        </SessionContextProvider>
    );
};

export default SessionProvider;