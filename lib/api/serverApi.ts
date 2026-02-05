import "server-only";

import { headers } from "next/headers";
import { api } from "./api";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";


async function getCookieHeader() {
  const h = await headers();
  return h.get("cookie") ?? "";
}

// ===== Notes (SERVER) =====
export type FetchNotesResponse = {
  notes: Note[];
  totalPages: number;
  page: number;
  perPage: number;
};

export type FetchNotesParams = {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
};

export async function fetchNotesServer(params: FetchNotesParams): Promise<FetchNotesResponse> {
  const cookie = await getCookieHeader();
  const { data } = await api.get<FetchNotesResponse>("/notes", {
    params,
    headers: { cookie },
  });
  return data;
}

export async function fetchNoteByIdServer(id: string): Promise<Note> {
  const cookie = await getCookieHeader();
  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: { cookie },
  });
  return data;
}

// ===== Auth/User (SERVER) =====
export async function checkSessionServer(): Promise<User | null> {
  const cookie = await getCookieHeader();
  const { data } = await api.get<User | null>("/auth/session", {
    headers: { cookie },
  });
  return data ?? null;
}

export async function getMeServer(): Promise<User> {
  const cookie = await getCookieHeader();
  const { data } = await api.get<User>("/users/me", {
    headers: { cookie },
  });
  return data;
}
