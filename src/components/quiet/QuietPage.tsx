import type { ReactNode } from "react";

/* The homepage's measure and voice, for every interior page. */
export function QuietPage({ children }: { children: ReactNode }) {
  return <div id="quiet-page">{children}</div>;
}

export function QuietIntro({ title, children }: { title: ReactNode; children?: ReactNode }) {
  return (
    <header className="qp-intro">
      <h1>{title}</h1>
      {children}
    </header>
  );
}

export function QuietSection({ id, title, note, children }: { id: string; title: ReactNode; note?: string; children: ReactNode }) {
  return (
    <section id={id} className="qp-section" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`}>
        {title}
        {note ? <small>{note}</small> : null}
      </h2>
      {children}
    </section>
  );
}
