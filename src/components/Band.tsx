import Image from "next/image";
import Link from "next/link";
import { contactLinks } from "../data/siteContent";
import { experiments } from "../data/experiments";
import { projects } from "../data/projects";
import { BandStage } from "./BandStage";
import { anchors } from "./bandExposures";
import styles from "./Band.module.css";

const wave = [14, 26, 18, 44, 28, 66, 38, 82, 54, 96, 62, 78, 46, 92, 70, 100, 66, 88, 52, 78, 44, 60, 30, 48, 22];
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
        <figure className={styles.plate}>
          <div className={styles.voice}>
            <div className={styles.voiceTop}><span>Murmur</span><span>00:12</span></div>
            <div className={styles.wave} aria-hidden="true">
              {wave.map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}
            </div>
            <blockquote>“Made chai.<br />Miss you.”</blockquote>
          </div>
          <figcaption className={styles.caption}>Interface study · illustrative voice note</figcaption>
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
        <figure className={styles.plate}>
          <Image
            src="/images/projects/vibegrid-social-card.png"
            width={1200}
            height={630}
            sizes="(max-width: 1000px) 86vw, 44vw"
            alt="VibeGrid product artwork: four fragments for the daily crew ritual"
          />
          <figcaption className={styles.caption}>Real product artwork · VibeGrid</figcaption>
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
        <figure className={`${styles.plate} ${styles.phonePlate}`}>
          <Image
            src="/images/projects/gathr-plans.png"
            width={1206}
            height={2622}
            sizes="(max-width: 1000px) 40vw, 15rem"
            alt="Gathr Plans screen showing upcoming plans and planning tools"
          />
          <figcaption className={styles.caption}>Real product capture · Gathr Plans</figcaption>
        </figure>
      </section>

      <section id={anchors[4]} className={`${styles.exposure} ${styles.split}`} data-exposure="4" aria-labelledby="curiosity-title">
        <div className={styles.copy}>
          <p className={styles.eyebrow}><b>05</b> The open notebook / Experiments</p>
          <h2 className={styles.title} id="curiosity-title">Four small studies.<br />Each one has a <em>job.</em></h2>
          <p className={styles.lede}>Routing, tempo, measure, constraint. Interfaces that explain themselves, each with a complete non-animated state.</p>
          <Link className={styles.link} href="/projects">Browse all {projects.length} projects <i aria-hidden="true">+</i></Link>
        </div>
        <div className={styles.notebook}>
          <div className={styles.labMark} aria-hidden="true">
            {swatches.map(colour => <i key={colour} style={{ background: colour }} />)}
          </div>
          <nav className={styles.index} aria-label="Experiments">
            {experiments.map((experiment, i) => (
              <Link key={experiment.slug} href={experiment.route}>
                <b>{String(i + 1).padStart(2, "0")}</b>
                {experiment.title}
                <Arrow />
              </Link>
            ))}
          </nav>
        </div>
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
