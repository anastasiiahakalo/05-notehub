import axios from "axios";
import type { Note } from "../types/note";

export type NotesResponse = {
  notes: Note[];
  totalPages: number;
};

export type FetchNotesParams = {
  page: number;
  perPage: number;
  search: string;
};

export type CreateNotePayload = {
  title: string;
  content: string;
  tag: string;
};

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});

api.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_NOTEHUB_TOKEN;

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<NotesResponse> => {
  const { data } = await api.get<NotesResponse>("/notes", { params });
  return data;
};

export const createNote = async (
  payload: CreateNotePayload
): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", payload);
  return data;
};


export const deleteNote = async (id: string): Promise<{ id: string }> => {
  const { data } = await api.delete<{ id: string }>(`/notes/${id}`);
  return data;
};