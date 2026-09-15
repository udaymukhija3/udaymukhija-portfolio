import type { Metadata } from "next";
import Link from "next/link";
import { QuietIntro, QuietPage, QuietSection } from "../../components/quiet/QuietPage";
import { contactLinks, snapshotItems, workPrinciples } from "../../data/siteContent";
import { educationItems, experienceItems } from "../../data/resume";

export const metadata: Metadata = {
  title: "About",
  description: "About Uday Mukhija, a software engineer based in India working across product, backend, data, and AI systems.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const external = contactLinks.filter((link) => link.href.startsWith("http"));
  const email = contactLinks.find((link) => link.label === "Email");

  return (
    <QuietPage>
      <QuietIntro title="A bit more about me.">
        <p>
          I&apos;m a software engineer based in India. I build product surfaces, backend state, realtime protocols, data contracts, and AI workflows with explicit guardrails.
        </p>
        <p>
          I&apos;m most interested in the part after a product demo: when retries, permissions, partial failure, and real people enter the picture, but the experience still needs to feel simple.
        </p>
        <p>
          My work spans backend-heavy products, data systems, and applied ML. The common thread is making state, failure, and evaluation legible enough that a system can be trusted and improved.
        </p>
      </QuietIntro>

      <QuietSection id="principles" title="How I work">
        <ol>
          {workPrinciples.map((principle, index) => (
            <li key={principle.title} className="qp-row">
              <span>0{index + 1}</span>
              <div>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </QuietSection>

      <QuietSection id="record" title="On record">
        <dl>
          {snapshotItems.slice(0, 4).map((item) => (
            <div key={item.label} className="qp-row"><dt>{item.label}</dt><dd>{item.value}</dd></div>
          ))}
          {experienceItems.map((item) => (
            <div key={item.company} className="qp-row"><dt>Experience</dt><dd>{item.role}, {item.company}, {item.period.replace(" - ", "–")}</dd></div>
          ))}
          {educationItems.map((item) => (
            <div key={item.school} className="qp-row"><dt>Education</dt><dd>{item.detail}, {item.school}, {item.period}</dd></div>
          ))}
        </dl>
        <p className="qp-links">
          <Link href="/experience" prefetch={false}>Experience <span aria-hidden="true">→</span></Link>
          <Link href="/resume" prefetch={false}>Resume <span aria-hidden="true">→</span></Link>
          <Link href="/notes" prefetch={false}>Notes <span aria-hidden="true">→</span></Link>
        </p>
      </QuietSection>

      <QuietSection id="contact" title="Say hello">
        <p className="qp-prose">For product systems that need to hold up beyond the happy path, or just to talk shop.</p>
        <p className="qp-links">
          {email ? <a href={email.href}>{email.href.replace(/^mailto:/, "")} <span aria-hidden="true">↗</span></a> : null}
          {external.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
              {link.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </p>
      </QuietSection>
    </QuietPage>
  );
}
