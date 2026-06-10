import axios from "axios";
import type { Note } from "../types/note";

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});

api.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_NOTEHUB_TOKEN;

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchNotes = async ({ page, perPage, search }:
    {
      page: number;
      perPage: number;
      search: string;
    }) => {
       const { data } = await api.get("/notes", {
        params: { page, perPage, search },
    });
    return data;
};

export const createNote = async (
  payload: Omit<Note, "id" | "createdAt" | "updatedAt">
): Promise<Note> => {
  const { data } = await api.post("/notes", payload);
  return data;
};


export const deleteNote = async (id: string) => {
  const { data } = await api.delete(`/notes/${id}`);
  return data;
};