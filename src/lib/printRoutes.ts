/* The /print tree is a design study that carries its own chrome, so the site header and footer stay out of it. */
export function isPrintRoute(pathname: string) {
  return pathname === "/print" || pathname.startsWith("/print/");
}
