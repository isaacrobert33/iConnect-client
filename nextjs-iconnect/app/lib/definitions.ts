// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.

import { ReactNode } from "react";

// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  username: string;
  password: string;
  createdAt: string;
};

export type Note = {
  id: string;
  userId: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  status: 'archived' | 'pinned' | 'active';
};

export type NoteForm = {
  title: string;
  body: string;
  status: 'archived' | 'pinned' | 'active';
}

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};


export type SessionPayload = {
  id: number;
  username: string;
};

export type ResponseData = {
  message: string,
}

export type Response = {
  data: ResponseData | null,
  success: boolean
};

export interface SessionContextType {
  state: SessionContextState;
  dispatch: React.Dispatch<any>;
}

export interface SessionContextState {
  session: any;
  apiConfig: { headers : {
    Authorization: string | null;
    Accept: string;
  }};
}

export interface SessionContextProviderProps {
  children: ReactNode;
}

export type NotesMetrics = {
  noteCount: number;
  pinnedNoteCount: number;
  activeNoteCount: number;
  archivedNoteCount: number;
}

export type DirItem = {
  fullPath: string;
  name: string;
  ext: string;
  isDir: boolean;
}


export type BreadCrumbType = {
  label: string;
  href: string;
  active: boolean;
}