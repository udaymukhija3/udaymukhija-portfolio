import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section page-intro">
      <div className="container page-intro-shell">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p>The page does not exist.</p>
        <div className="cta-row">
          <Link className="button button-solid" href="/">
            Back Home
          </Link>
          <Link className="button button-ghost" href="/projects">
            View Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
