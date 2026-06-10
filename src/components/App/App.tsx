import { useState } from "react";
import css from "./App.module.css";
import { useDebouncedCallback } from "use-debounce";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { fetchNotes, createNote, deleteNote } from "../../services/noteService";
import { notesKeys } from "../../hooks/notesKeys";

import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";

export default function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setPage(1);
    setSearch(value);
  }, 500);

  const { data } = useQuery({
    queryKey: notesKeys.list(page, search),
    queryFn: () => fetchNotes({ page, perPage: 12, search }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notesKeys.all });
    },
  });

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notesKeys.all });
      setIsModalOpen(false);
    },
  });  

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={debouncedSearch} />

        <button onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {data?.notes?.length > 0 && (
        <NoteList
          notes={data.notes}
          onDelete={(id) => deleteMutation.mutate(id)}
        />
      )}

      {data?.totalPages > 1 && (
        <Pagination
          pageCount={data.totalPages}
          onPageChange={(p) => setPage(p)}
        />
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onSubmit={createMutation.mutate} />
        </Modal>
      )}
    </div>
  );
}