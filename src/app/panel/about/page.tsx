import type { Metadata } from "next";
import Link from "next/link";
import { PanelFrame } from "../../../components/panel/PanelFrame";
import { contactLinks, snapshotItems, workPrinciples } from "../../../data/siteContent";
import { educationItems, experienceItems } from "../../../data/resume";

export const metadata: Metadata = {
  title: "About (panel prototype)",
  description: "About Uday Mukhija, a software engineer based in India working across product, backend, data, and AI systems.",
  alternates: { canonical: "/panel/about" },
};

export default function AboutPage() {
  const external = (label: string) => contactLinks.find((link) => link.label === label);
  const email = external("Email");
  const github = external("GitHub");
  const linkedIn = external("LinkedIn");

  return (
    <PanelFrame current="about">
      <div className="pp-band pp-title">
        <h1 className="pp-cell pp-label">About</h1>
        <div className="pp-cell pp-body">
          <p className="pp-lead">I work where product behaviour becomes system responsibility.</p>
          <p>
            I&apos;m a software engineer based in India. I build product surfaces, backend state, realtime protocols, data contracts, and AI workflows with explicit guardrails.
          </p>
        </div>
      </div>

      <section className="pp-band" aria-labelledby="position-title">
        <div className="pp-cell pp-label"><h2 id="position-title">Position<small>Interface clarity above. Explicit contracts underneath.</small></h2></div>
        <div className="pp-cell pp-body">
          <p>
            I&apos;m most interested in the part after a product demo: when retries, permissions, partial failure, and real people enter the picture, but the experience still needs to feel simple.
          </p>
          <p>
            My work spans backend-heavy products, data systems, and applied ML. The common thread is making state, failure, and evaluation legible enough that a system can be trusted and improved.
          </p>
        </div>
      </section>

      <section className="pp-band" aria-labelledby="principles-title">
        <div className="pp-cell pp-label"><h2 id="principles-title">Principles</h2></div>
        {workPrinciples.map((principle, index) => (
          <article key={principle.title} className={`pp-cell ${index === 0 ? "pp-4" : "pp-5"}`}>
            <span className="pp-num">0{index + 1}</span>
            <h3>{principle.title}</h3>
            <p>{principle.body}</p>
          </article>
        ))}
      </section>

      <section className="pp-band" aria-labelledby="record-title">
        <div className="pp-cell pp-label"><h2 id="record-title">Record</h2></div>
        <div className="pp-cell pp-body">
          <dl className="pp-dl">
            {snapshotItems.slice(0, 4).map((item) => (
              <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>
            ))}
            {experienceItems.map((item) => (
              <div key={item.company}><dt>Experience</dt><dd>{item.role}, {item.company}, {item.period.replace(" - ", "–")}</dd></div>
            ))}
            {educationItems.map((item) => (
              <div key={item.school}><dt>Education</dt><dd>{item.detail}, {item.school}, {item.period}</dd></div>
            ))}
          </dl>
          <p className="pp-links">
            <Link href="/experience" prefetch={false}>Experience</Link>
            <Link href="/resume" prefetch={false}>Resume</Link>
            <Link href="/notes" prefetch={false}>Notes</Link>
          </p>
        </div>
      </section>

      <section className="pp-band" aria-labelledby="contact-title">
        <div className="pp-cell pp-label"><h2 id="contact-title">Contact<small>For product systems that need to hold up beyond the happy path</small></h2></div>
        {email ? (
          <a className="pp-cell pp-3 pp-cell-link" href={email.href}>
            <small>Email</small>
            <span>{email.href.replace(/^mailto:/, "")}</span>
          </a>
        ) : null}
        {github ? (
          <a className="pp-cell pp-3 pp-cell-link" href={github.href} target="_blank" rel="noreferrer">
            <small>GitHub</small>
            <span>udaymukhija3 <span aria-hidden="true">↗</span></span>
          </a>
        ) : null}
        {linkedIn ? (
          <a className="pp-cell pp-3 pp-cell-link" href={linkedIn.href} target="_blank" rel="noreferrer">
            <small>LinkedIn</small>
            <span>udaymukhija <span aria-hidden="true">↗</span></span>
          </a>
        ) : null}
      </section>
    </PanelFrame>
  );
}
