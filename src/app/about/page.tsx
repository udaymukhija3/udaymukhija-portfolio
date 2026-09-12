import type { Metadata } from "next";
import Link from "next/link";
import { contactLinks, snapshotItems, workPrinciples } from "../../data/siteContent";
import { educationItems, experienceItems } from "../../data/resume";

export const metadata: Metadata = {
  title: "About",
  description: "About Uday Mukhija, a software engineer based in India working across product, backend, data, and AI systems.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const email = contactLinks.find((link) => link.label === "Email");

  return (
    <>
      <section className="about-page-hero" aria-labelledby="about-page-title">
        <div className="container about-page-hero-grid">
          <p className="eyebrow">About / Uday Mukhija</p>
          <h1 id="about-page-title">I work where product behavior becomes system responsibility.</h1>
          <p className="about-page-lead">
            I&apos;m a software engineer based in India. I build product surfaces, backend state, realtime protocols, data contracts, and AI workflows with explicit guardrails.
          </p>
        </div>
      </section>

      <section className="section about-page-body">
        <div className="container about-page-grid">
          <aside>
            <p className="eyebrow">Working position</p>
            <p>Interface clarity above. Explicit contracts underneath.</p>
          </aside>
          <div className="about-page-copy">
            <p>
              I&apos;m most interested in the part after a product demo: when retries, permissions, partial failure, and real people enter the picture, but the experience still needs to feel simple.
            </p>
            <p>
              My work spans backend-heavy products, data systems, and applied ML. The common thread is making state, failure, and evaluation legible enough that a system can be trusted and improved.
            </p>
          </div>
        </div>
      </section>

      <section className="section about-principles" aria-labelledby="principles-title">
        <div className="container">
          <header className="about-section-heading">
            <p className="eyebrow">Principles</p>
            <h2 id="principles-title">How I approach the work.</h2>
          </header>
          <div className="about-principle-grid">
            {workPrinciples.map((principle, index) => (
              <article key={principle.title}>
                <span>0{index + 1}</span>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-record" aria-labelledby="record-title">
        <div className="container about-record-grid">
          <header>
            <p className="eyebrow">Record</p>
            <h2 id="record-title">A compact factual view.</h2>
          </header>
          <dl>
            {snapshotItems.slice(0, 4).map((item) => (
              <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>
            ))}
            {experienceItems.map((item) => (
              <div key={item.company}><dt>Experience</dt><dd>{item.role} · {item.company} · {item.period}</dd></div>
            ))}
            {educationItems.map((item) => (
              <div key={item.school}><dt>Education</dt><dd>{item.detail} · {item.school} · {item.period}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      <section className="about-page-contact">
        <div className="container about-page-contact-grid">
          <p className="eyebrow">Contact</p>
          <h2>For product systems that need to hold up beyond the happy path.</h2>
          {email ? <a className="contact-email" href={email.href}>Start a conversation <span aria-hidden="true">↗</span></a> : null}
          <Link className="quiet-link" href="/projects">View the work <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </>
  );
}
