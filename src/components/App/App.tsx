import { useState } from "react";
import css from "./App.module.css";
import { useDebouncedCallback } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { fetchNotes } from "../../services/noteService";
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


  const debouncedSearch = useDebouncedCallback((value: string) => {
    setPage(1);
    setSearch(value);
  }, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: notesKeys.list(page, search),
    queryFn: () => fetchNotes({ page, perPage: 12, search }),
    placeholderData: keepPreviousData,
  });



  return (
  <div className={css.app}>
    <header className={css.toolbar}>
      <SearchBox onChange={debouncedSearch} />

      <button onClick={() => setIsModalOpen(true)}>
        Create note +
      </button>
    </header>

    {isLoading && <p>Loading...</p>}
    {isError && <p>Error</p>}

    {data && (
      <>
        <NoteList
          notes={data.notes} />

        {data.totalPages > 1 && (
          <Pagination
              page={page}
              totalPages={data.totalPages}
              onChange={setPage}
          />
        )}
      </>
    )}

    {isModalOpen && (
      <Modal onClose={() => setIsModalOpen(false)}>
        <NoteForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    )}
  </div>
);
}