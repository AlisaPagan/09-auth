"use client";

import { useRouter } from "next/navigation";
import css from "./NotePreview.module.css";
import type { Note } from "@/types/note";

type Props = {
  note: Note;
  isUpdating?: boolean;
};

export default function NotePreview({ note, isUpdating = false }: Props) {
  const router = useRouter();

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

        {isUpdating ? <p>Updating…</p> : null}
      </div>
    </div>
  );
}
