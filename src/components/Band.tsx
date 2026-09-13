import Link from "next/link";
import { contactLinks } from "../data/siteContent";
import { experiments } from "../data/experiments";
import { projects } from "../data/projects";
import { BandStage } from "./BandStage";
import { anchors } from "./bandExposures";
import { JoinPath } from "./JoinPath";
import styles from "./Band.module.css";

/* Six exposures on the grid. Each is copy in the reading column and one
   figure — a measured, drawn thing, never a picture — in the cells beside
   it. Figures are numbered and captioned; the readout names the one in
   focus. Everything here is real: the cap, the fragments, the join path,
   the studies. */

/* Murmur: the cap is real — 90 s, validated on the server. The note is a
   12 s sample, drawn as one. */
const MURMUR_CAP = 90;
const MURMUR_SAMPLE = 12;
const murmurWave = [18, 42, 30, 66, 48, 82, 60, 38, 74, 52, 88, 44, 70, 34, 58, 26, 62, 40, 30, 16];

/* VibeGrid: a four-column palette, twelve fragments, four chosen. The four
   named ones are the sample card's; the rest stay unnamed. */
const fragments: Array<string | null> = [
  null, "meal prep", null, null,
  "monday dread", null, "five tabs", null,
  null, null, null, "11pm panic",
];

const swatches = ["#e2452c", "#ef9a2e", "#8e3a3e", "#b5553a"];

function Arrow() {
  return <i aria-hidden="true">↗</i>;
}

export function Band() {
  return (
    <BandStage>
      <section id={anchors[0]} className={`${styles.exposure} ${styles.wide}`} data-exposure="0" aria-labelledby="edge-title">
        <div className={styles.copy}>
          <p className={styles.eyebrow}><b>01</b> Uday Mukhija / Software engineer</p>
          <h1 className={styles.title} id="edge-title">Small social products.<br />Backends that <em>hold up.</em></h1>
          <p className={styles.lede}>Three small social apps — and the Go and Java systems underneath that keep them dependable when real people show up.</p>
          <a className={styles.link} href={`#${anchors[1]}`}>Take a closer look <i aria-hidden="true">→</i></a>
        </div>
        <p className={styles.marginNote}>First light.<br />Six exposures.</p>
      </section>

      <section id={anchors[1]} className={`${styles.exposure} ${styles.split}`} data-exposure="1" aria-labelledby="voice-title">
        <div className={styles.copy}>
          <p className={styles.eyebrow}><b>02</b> Murmur / Private voice</p>
          <h2 className={styles.title} id="voice-title">Voice notes for six people,<br />not six <em>million.</em></h2>
          <p className={styles.lede}>Invite-only rooms and short voice notes. Private by construction, not by policy: media is scoped to the room that made it.</p>
          <span className={styles.proof}>Go-backed web MVP · Room-scoped private media</span>
          <Link className={styles.link} href="/projects/murmur">Explore Murmur <Arrow /></Link>
        </div>
        <figure className={styles.figure} aria-labelledby="fig-02">
          <div className={styles.strip} role="img" aria-label={`A ${MURMUR_SAMPLE}-second sample murmur against a ${MURMUR_CAP}-second cap.`}>
            <div className={styles.stripWave} style={{ width: `${(MURMUR_SAMPLE / MURMUR_CAP) * 100}%` }}>
              {murmurWave.map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}
            </div>
            <div className={styles.stripTicks} aria-hidden="true">
              {Array.from({ length: MURMUR_CAP / 10 + 1 }, (_, i) => (
                <span key={i} data-major={i % 3 === 0 ? "true" : undefined}>{i % 3 === 0 ? `${i * 10}` : ""}</span>
              ))}
            </div>
            <span className={styles.stripCap}>cap {MURMUR_CAP} s</span>
          </div>
          <figcaption className={styles.caption} id="fig-02">
            <b>Fig. 02</b> A {MURMUR_SAMPLE} s sample against the {MURMUR_CAP} s cap. Duration is validated on the server, not trusted from the client.
          </figcaption>
        </figure>
      </section>

      <section id={anchors[2]} className={`${styles.exposure} ${styles.mediaFirst}`} data-exposure="2" aria-labelledby="possibility-title">
        <div className={styles.copy}>
          <p className={styles.eyebrow}><b>03</b> VibeGrid / A daily social ritual</p>
          <h2 className={styles.title} id="possibility-title">Twelve fragments. Pick four.<br />Then <em>vote blind.</em></h2>
          <p className={styles.lede}>One title, one crew, wildly different answers. Make today, judge tomorrow, come back for the reveal — authors stay hidden until the votes are in.</p>
          <span className={styles.proof}>Go / PostgreSQL · Hidden authors, fair votes, safe retries</span>
          <Link className={styles.link} href="/projects/vibegrid">Explore VibeGrid <Arrow /></Link>
        </div>
        <figure className={styles.figure} aria-labelledby="fig-03">
          <div className={styles.palette} role="img" aria-label="A twelve-cell palette with four fragments chosen.">
            {fragments.map((fragment, i) => (
              <span key={i} className={styles.cell} data-chosen={fragment ? "true" : undefined}>
                <small>{String(i + 1).padStart(2, "0")}</small>
                {fragment ? <b>{fragment}</b> : null}
              </span>
            ))}
          </div>
          <ol className={styles.stages} aria-label="Stages">
            <li><span>D+0</span> Make</li>
            <li><span>D+1</span> Judge, authors hidden</li>
            <li><span>D+2</span> Reveal; ties stay ties</li>
          </ol>
          <figcaption className={styles.caption} id="fig-03">
            <b>Fig. 03</b> Exactly four of twelve, one title, one card per member per board; one ballot, never for yourself.
          </figcaption>
        </figure>
      </section>

      <section id={anchors[3]} className={`${styles.exposure} ${styles.split}`} data-exposure="3" aria-labelledby="connection-title">
        <div className={styles.copy}>
          <p className={styles.eyebrow}><b>04</b> Gathr / Local social planning</p>
          <h2 className={styles.title} id="connection-title">Less “we should hang out.”<br />More <em>showing up.</em></h2>
          <p className={styles.lede}>Small local plans, a real group chat, and a path from finding something to being there — with the backend owning access, safety, and privacy.</p>
          <span className={styles.proof}>Private alpha · Java / Spring Boot / Expo</span>
          <Link className={styles.link} href="/projects/gathrly">Meet Gathr <Arrow /></Link>
        </div>
        <figure className={styles.figure} aria-labelledby="fig-04">
          <JoinPath />
          <figcaption className={styles.caption} id="fig-04">
            <b>Fig. 04</b> One tap to join: an idempotency key, a locked row, seven guards in order, one write, a commit, then the group. Traced from the repository.
          </figcaption>
        </figure>
      </section>

      <section id={anchors[4]} className={`${styles.exposure} ${styles.split}`} data-exposure="4" aria-labelledby="curiosity-title">
        <div className={styles.copy}>
          <p className={styles.eyebrow}><b>05</b> The open notebook / Experiments</p>
          <h2 className={styles.title} id="curiosity-title">Four small studies.<br />Each one has a <em>job.</em></h2>
          <p className={styles.lede}>Routing, tempo, measure, constraint. Interfaces that explain themselves, each with a complete non-animated state.</p>
          <Link className={styles.link} href="/projects">Browse all {projects.length} projects <i aria-hidden="true">+</i></Link>
        </div>
        <figure className={`${styles.figure} ${styles.notebook}`} aria-labelledby="fig-05">
          <div className={styles.labMark} aria-hidden="true">
            {swatches.map(colour => <i key={colour} style={{ background: colour }} />)}
          </div>
          <nav className={styles.index} aria-label="Experiments">
            {experiments.map((experiment, i) => (
              <Link key={experiment.slug} href={experiment.route}>
                <b>{String(i + 1).padStart(2, "0")}</b>
                {experiment.title}
                <small>{experiment.category}</small>
                <Arrow />
              </Link>
            ))}
          </nav>
          <figcaption className={styles.caption} id="fig-05">
            <b>Fig. 05</b> The Lab&apos;s index: state, timing, reading, spatial input.
          </figcaption>
        </figure>
      </section>

      <section id={anchors[5]} className={`${styles.exposure} ${styles.wide}`} data-exposure="5" aria-labelledby="openness-title">
        <div className={styles.copy}>
          <p className={styles.eyebrow}><b>06</b> Uday Mukhija / Based in India</p>
          <h2 className={styles.title} id="openness-title">It’s early.<br />Let’s <em>build</em> something.</h2>
          <p className={styles.lede}>Backend product systems, social platforms, applied AI. Email is fastest.</p>
          <a className={styles.email} href="mailto:udaymukhija3@gmail.com">udaymukhija3@gmail.com <Arrow /></a>
          <div className={styles.contactLinks}>
            {contactLinks.filter(link => link.label !== "Email").map(link => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label} <Arrow /></a>
            ))}
            <Link href="/about">About <Arrow /></Link>
          </div>
        </div>
        <p className={styles.marginNote}>The day<br />is yours.</p>
      </section>
    </BandStage>
  );
}
