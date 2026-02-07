"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import Modal from "@/components/Modal/Modal";
import Loader from "@/components/Loader/Loader";
import NotePreview from "@/components/NotePreview/NotePreview";

import { fetchNoteById } from "@/lib/api/clientApi";

type Props = {
  id: string;
};

export default function NotePreviewClient({ id }: Props) {
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

  return (
    <Modal onClose={() => router.back()}>
      {isPending && !note ? <Loader variant="overlay" /> : null}
      {isError || !note ? <p>Failed to load note.</p> : null}
      {!isPending && !isError && note ? (
        <NotePreview note={note} isUpdating={isFetching} />
      ) : null}
    </Modal>
  );
}
