export const notesKeys = {
  all: ["notes"] as const,
  list: (page: number, search: string) =>
    ["notes", page, search] as const,
};