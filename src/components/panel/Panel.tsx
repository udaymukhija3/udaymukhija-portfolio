import Image from "next/image";
import Link from "next/link";
import { panelProjects } from "../../data/panel";
import { contactLinks } from "../../data/siteContent";
import gathrCapture from "../../../public/images/projects/gathr-plans.png";
import { grotesk } from "./font";

const emailHref = contactLinks.find((link) => link.label === "Email")?.href ?? "mailto:udaymukhija3@gmail.com";

export function Panel() {
  return (
    <div id="panel" className={grotesk.variable}>
      <div className="panel-object">
        <div className="panel-identity">
          <h1 className="panel-name">
            <span>Uday</span> <span>Mukhija</span>
          </h1>
          <p className="panel-role">
            Software engineer
            <span>Backend systems and the products built on them.</span>
          </p>
          <p className="panel-place">India</p>
        </div>

        <nav className="panel-nav" aria-label="Primary">
          <Link href="/panel/work" prefetch={false}>Work</Link>
          <Link href="/panel/about" prefetch={false}>About</Link>
          <a href={emailHref}>Contact</a>
        </nav>

        {panelProjects.map((project) => (
          <Link
            key={project.id}
            className="panel-cell"
            data-project={project.id}
            href={project.href}
            prefetch={false}
          >
            <span className="panel-cell-label">
              <h2 className="panel-cell-name">{project.title}</h2>
              <span className="panel-cell-descriptor">{project.descriptor}</span>
            </span>
            <span className="panel-cell-description">{project.description}</span>
            {project.id === "gathr" ? (
              <span className="panel-cell-capture" aria-hidden="true">
                <Image src={gathrCapture} alt="" sizes="320px" priority={false} />
              </span>
            ) : null}
          </Link>
        ))}

        <div className="panel-void" aria-hidden="true" />

        <p className="panel-readout">
          <span className="panel-readout-line" data-readout="default">
            <span>Selected work</span>
            <span>2026</span>
          </span>
          {panelProjects.map((project) => (
            <span key={project.id} className="panel-readout-line" data-readout={project.id} aria-hidden="true">
              <span>
                <b>{project.title}</b> {project.stack.join(", ")}
              </span>
              <span>{project.timeline}</span>
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
