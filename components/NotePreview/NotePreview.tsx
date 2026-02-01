"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import css from "./NotePreview.module.css";
import { fetchNoteById } from "@/lib/api";
import Loader from "@/components/Loader/Loader";

type Props = {
  id: string;
};

export default function NotePreview({ id }: Props) {
  const router = useRouter();

  const {
    data: note,
    isPending,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: Boolean(id),
    staleTime: 30_000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (isPending && !note) {
    return <Loader variant="overlay" />;
  }

  if (isError || !note) {
    return <p>Failed to load note.</p>;
  }

  return (
    <div className={css.container}>
      <div className={css.item}>
        <button className={css.backBtn} onClick={() => router.back()}>
          Back
        </button>

        <div className={css.header}>
          <h2>{note.title}</h2>
          <span className={css.tag}>{note.tag}</span>
        </div>

        <p className={css.content}>{note.content}</p>

        <p className={css.date}>{note.createdAt}</p>

        {isFetching ? <p>Updating…</p> : null}
      </div>
    </div>
  );
}
