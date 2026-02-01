import css from "./page.module.css";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page not found",
  description: "This page doesn't exist",
  openGraph: {
    title: "404 - Page not found",
    description: "This page doesn't exist",
    url: "https://08-zustand-git-main-alisa-pagans-projects.vercel.app/404",
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

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
