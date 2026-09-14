import { permanentRedirect } from "next/navigation";

export default function QuietPage() {
  permanentRedirect("/");
}
