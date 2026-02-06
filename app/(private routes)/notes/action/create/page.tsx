import type { Metadata } from "next";
import css from "./CreateNote.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Create note — NoteHub",
  description: "Create a new note in NoteHub.",
  alternates: {
    canonical: `${baseUrl}/notes/action/create`,
  },
  openGraph: {
    title: "Create note — NoteHub",
    description: "Create a new note in NoteHub.",
    url: `${baseUrl}/notes/action/create`,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
    type: "website",
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
