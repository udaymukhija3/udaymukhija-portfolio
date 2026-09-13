import Link from "next/link";
import { contactLinks } from "../data/siteContent";
import { experiments } from "../data/experiments";
import { projects } from "../data/projects";
import { BandStage } from "./BandStage";
import { anchors } from "./bandExposures";
import styles from "./Band.module.css";

function Arrow() { return <i aria-hidden="true">↗</i>; }

export function Band() {
  return <BandStage>
    <section id={anchors[0]} className={`${styles.exposure} ${styles.intro}`} data-exposure="0" aria-labelledby="edge-title">
      <div className={styles.copy}>
        <p className={styles.eyebrow}><b>01 / 06</b> Uday Mukhija · Software engineer</p>
        <h1 className={styles.title} id="edge-title">Small social products.<br />Thoughtfully engineered.</h1>
        <p className={styles.lede}>Three small social apps — and the Go and Java systems underneath that keep them dependable when real people show up.</p>
        <a className={styles.link} href={`#${anchors[1]}`}>Selected work <i aria-hidden="true">↓</i></a>
      </div>
      <div className={styles.edition}><span>Independent work / 2026</span><span>A study in first light</span></div>
    </section>

    <section id={anchors[1]} className={`${styles.exposure} ${styles.split}`} data-exposure="1" aria-labelledby="voice-title">
      <div className={styles.copy}>
        <p className={styles.eyebrow}><b>02 / 06</b> Murmur · Private voice</p>
        <h2 className={styles.title} id="voice-title">A smaller circle.<br />A little more presence.</h2>
        <p className={styles.lede}>Invite-only rooms and short voice notes. Private by construction: media belongs to the room that made it.</p>
        <span className={styles.proof}>Go · Room-scoped private media</span>
        <Link className={styles.link} href="/projects/murmur">Explore Murmur <Arrow /></Link>
      </div>
      <aside className={styles.detail} aria-label="Murmur product details">
        <span className={styles.detailLabel}>Built around a boundary</span>
        <p>Up to 90 seconds.<br />Only your people.</p>
        <small>Duration validated on the server.<br />Access scoped to the room.</small>
      </aside>
    </section>

    <section id={anchors[2]} className={`${styles.exposure} ${styles.offset}`} data-exposure="2" aria-labelledby="possibility-title">
      <div className={styles.copy}>
        <p className={styles.eyebrow}><b>03 / 06</b> VibeGrid · A daily ritual</p>
        <h2 className={styles.title} id="possibility-title">Make something today.<br />See it differently tomorrow.</h2>
        <p className={styles.lede}>One title, twelve fragments, four choices. Create with your crew, vote without knowing the author, then come back for the reveal.</p>
        <span className={styles.proof}>Go / PostgreSQL · Hidden authors, safe retries</span>
        <Link className={styles.link} href="/projects/vibegrid">Explore VibeGrid <Arrow /></Link>
      </div>
      <aside className={styles.detail} aria-label="VibeGrid daily sequence">
        <span className={styles.detailLabel}>A reason to come back</span>
        <ol className={styles.sequence}><li><span>01</span> Make</li><li><span>02</span> Judge blind</li><li><span>03</span> Reveal together</li></ol>
      </aside>
    </section>

    <section id={anchors[3]} className={`${styles.exposure} ${styles.split}`} data-exposure="3" aria-labelledby="connection-title">
      <div className={styles.copy}>
        <p className={styles.eyebrow}><b>04 / 06</b> Gathr · Local social planning</p>
        <h2 className={styles.title} id="connection-title">Less “we should hang out.”<br />More showing up.</h2>
        <p className={styles.lede}>Small local plans, a real group chat, and a path from finding something to being there. The backend takes care of access, safety, and privacy.</p>
        <span className={styles.proof}>Private alpha · Java / Spring Boot / Expo</span>
        <Link className={styles.link} href="/projects/gathrly">Meet Gathr <Arrow /></Link>
      </div>
      <aside className={styles.detail} aria-label="Gathr engineering detail">
        <span className={styles.detailLabel}>Simple on the surface</span>
        <p>One tap to join.<br />One dependable outcome.</p>
        <small>Ordered guards, a locked transaction,<br />and safe retries underneath.</small>
      </aside>
    </section>

    <section id={anchors[4]} className={`${styles.exposure} ${styles.offset}`} data-exposure="4" aria-labelledby="curiosity-title">
      <div className={styles.copy}>
        <p className={styles.eyebrow}><b>05 / 06</b> The open notebook</p>
        <h2 className={styles.title} id="curiosity-title">Room to try things.</h2>
        <p className={styles.lede}>Small studies in how an interface moves, responds, and explains itself.</p>
        <Link className={styles.link} href="/projects">All {projects.length} projects <Arrow /></Link>
      </div>
      <nav className={`${styles.detail} ${styles.notebook}`} aria-label="Experiments">
        <span className={styles.detailLabel}>Four ongoing questions</span>
        {experiments.map((experiment, i) => <Link key={experiment.slug} href={experiment.route}><span>{String(i + 1).padStart(2, "0")}</span>{experiment.title}<Arrow /></Link>)}
      </nav>
    </section>

    <section id={anchors[5]} className={`${styles.exposure} ${styles.outro}`} data-exposure="5" aria-labelledby="openness-title">
      <div className={styles.copy}>
        <p className={styles.eyebrow}><b>06 / 06</b> Based in India · Open to conversation</p>
        <h2 className={styles.title} id="openness-title">It’s early.<br />Let’s build something.</h2>
        <p className={styles.lede}>Backend product systems, social platforms, applied AI. Email is fastest.</p>
        <a className={styles.email} href="mailto:udaymukhija3@gmail.com">udaymukhija3@gmail.com <Arrow /></a>
        <div className={styles.contactLinks}>
          {contactLinks.filter(link => link.label !== "Email").map(link => <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label} <Arrow /></a>)}
          <Link href="/about">About <Arrow /></Link>
        </div>
      </div>
      <div className={styles.edition}><span>Thanks for spending a little time here.</span><span>The day is yours.</span></div>
    </section>
  </BandStage>;
}
