import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { contactLinks } from "../../data/siteContent";
import { Atmosphere } from "./Atmosphere";
import styles from "./surface.module.css";

export const metadata: Metadata = {
  title: "First Light — Uday Mukhija",
  description: "Thoughtful software, from the experience to the systems beneath it. Selected work by Uday Mukhija.",
  alternates: { canonical: "/alternate" },
  robots: { index: false, follow: true },
};

const work = [
  { slug: "gathrly", title: "Gathr", year: "2026", description: "Small plans. Real connections. A reason to show up.", discipline: "Product · Backend · Realtime", image: "gathr" },
  { slug: "vibegrid", title: "VibeGrid", year: "2026", description: "A daily creative ritual for a close-knit crew.", discipline: "Product · Go · Interaction", image: "vibegrid" },
  { slug: "murmur", title: "Murmur", year: "2026", description: "A little voice, a little closer. Private by design.", discipline: "Product · Audio · Privacy", image: "murmur" },
];

export default function AlternatePortfolio() {
  return (
    <Atmosphere>
      <header className={styles.header}>
        <a className={styles.monogram} href="#first-light" aria-label="Uday Mukhija — back to top">U M</a>
        <nav aria-label="First Light navigation"><a href="#selected-work">Work</a><a href="#about">About</a><Link href="/lab">Lab</Link><a href="#contact">Contact</a></nav>
      </header>
      <section id="first-light" className={styles.hero} aria-labelledby="first-light-title">
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>DESIGN · BUILD · THINK</p>
          <h1 id="first-light-title">Thoughtful software.<br />From the inside out.</h1>
          <p className={styles.introduction}>I’m Uday, a software engineer building considered digital experiences — and the systems that make them work.</p>
          <a className={styles.ruleLink} href="#selected-work">Explore my work</a>
        </div>
        <aside className={styles.marginNote}>Good systems leave<br />room for people.<span /></aside>
      </section>
      <section id="selected-work" className={styles.work} aria-labelledby="work-heading">
        <div className={styles.sectionContent}>
          <p className={styles.sectionNumber}>01 <span /></p>
          <div className={styles.sectionHeading}><h2 id="work-heading">Selected Work</h2><Link className={styles.arrowLink} href="/projects">View all projects <span aria-hidden="true">→</span></Link></div>
          <div className={styles.projectGrid}>
            {work.map(project => (
              <article key={project.slug} className={styles.project}>
                <Link className={styles.projectLink} href={`/projects/${project.slug}`}>
                  <div className={`${styles.projectArt} ${styles[project.image]}`}>
                    {project.image === "gathr" ? (
                      <Image src="/images/projects/gathr-plans.png" width={1206} height={2622} sizes="(max-width: 700px) 40vw, 180px" alt="Gathr’s working plans screen" className={styles.phone} />
                    ) : project.image === "vibegrid" ? (
                      <Image src="/images/projects/vibegrid-social-card.png" width={1200} height={630} sizes="(max-width: 700px) 86vw, 32vw" alt="VibeGrid’s four-fragment creative card" className={styles.vibeArtwork} />
                    ) : (
                      <div className={styles.voiceStudy} aria-label="Murmur voice-note interface study">
                        <div className={styles.voiceHeader}><span>A familiar voice</span><span>00:12</span></div>
                        <div className={styles.wave} aria-hidden="true">{[10, 17, 29, 20, 36, 48, 30, 18, 34, 42, 24, 52, 37, 21, 15, 30, 42, 26, 16, 9].map((height, index) => <i key={index} style={{ height }} />)}</div>
                        <p>“Made chai. Miss you.”</p><span className={styles.voiceCaption}>PRIVATE ROOM · INTERFACE STUDY</span>
                      </div>
                    )}
                  </div>
                  <div className={styles.projectTitle}><h3>{project.title}</h3><span>{project.year}</span></div>
                  <p className={styles.projectDescription}>{project.description}</p><p className={styles.discipline}>{project.discipline}</p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="about" className={styles.about} aria-labelledby="about-heading">
        <div className={styles.aboutContent}>
          <p className={styles.sectionNumber}>02 <span /></p><h2 id="about-heading">About</h2>
          <p className={styles.aboutCopy}>I’m a software engineer based in India, interested in the care behind a good product. Clear boundaries, thoughtful interactions, and systems that hold up when things get complicated.</p>
          <Link className={styles.ruleLink} href="/about">More about me</Link>
        </div>
        <p className={styles.closingNote}>Same curiosity.<br /><em>A brighter day.</em><span /></p>
      </section>
      <footer id="contact" className={styles.footer}>
        <div><p className={styles.eyebrow}>LET’S MAKE SOMETHING CONSIDERED.</p><a className={styles.contactTitle} href={contactLinks[0].href}>Say hello.</a></div>
        <nav aria-label="Contact links">{contactLinks.slice(1).map(link => <a key={link.label} href={link.href}>{link.label}</a>)}</nav>
        <div className={styles.footerEnd}><span>Uday Mukhija · First Light</span><Link href="/">Explore Daybreak ↗</Link></div>
      </footer>
    </Atmosphere>
  );
}
