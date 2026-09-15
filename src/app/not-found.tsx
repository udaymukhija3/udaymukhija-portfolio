import Link from "next/link";
import { QuietIntro, QuietPage } from "../components/quiet/QuietPage";

export default function NotFound() {
  return (
    <QuietPage>
      <QuietIntro title="That page doesn’t exist.">
        <p>The links below cover the rest of the site.</p>
        <p className="qp-links">
          <Link href="/">Home <span aria-hidden="true">→</span></Link>
          <Link href="/projects" prefetch={false}>Work <span aria-hidden="true">→</span></Link>
        </p>
      </QuietIntro>
    </QuietPage>
  );
}
