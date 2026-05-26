import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section page-intro">
      <div className="container page-intro-shell">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p>That page doesn't exist. The links below cover the rest of the site.</p>
        <div className="cta-row">
          <Link className="button button-solid" href="/">
            Back home
          </Link>
          <Link className="button button-ghost" href="/projects">
            View projects
          </Link>
        </div>
      </div>
    </section>
  );
}
