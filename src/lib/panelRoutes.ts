/* The /panel tree is a design prototype that carries its own navigation and closing band,
   so the site header, site measure, and footer stay out of it. */
export function isPanelRoute(pathname: string) {
  return pathname === "/panel" || pathname.startsWith("/panel/");
}
