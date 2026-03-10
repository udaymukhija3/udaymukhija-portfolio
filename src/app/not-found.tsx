import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section page-intro">
      <div className="container page-intro-shell">
        <p className="eyebrow">404</p>
        <h1>That page does not exist</h1>
        <p>The link is broken or the project has not been published yet.</p>
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
