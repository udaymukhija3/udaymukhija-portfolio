"use client";

import { useEffect } from "react";

/** Enhances an already-readable archive; all projects exist in server HTML. */
export function ArchiveFilter() {
  useEffect(() => {
    const root = document.getElementById("project-archive");
    if (!root) return;
    const links = Array.from(root.querySelectorAll<HTMLAnchorElement>("[data-category-link]"));
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-project-category]"));
    const sync = () => {
      const query = new URLSearchParams(window.location.search).get("category") ?? "all";
      const category = links.some(link => link.dataset.categoryLink === query) ? query : "all";
      links.forEach(link => {
        const active = link.dataset.categoryLink === category;
        link.classList.toggle("is-active", active);
        if (active) link.setAttribute("aria-current", "page"); else link.removeAttribute("aria-current");
      });
      items.forEach(item => { item.hidden = category !== "all" && item.dataset.projectCategory !== category; });
      const count = root.querySelector<HTMLElement>("[data-filter-count]");
      if (count) count.textContent = `${items.filter(item => !item.hidden).length} projects`;
    };
    const click = (event: MouseEvent) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
      const target = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("[data-category-link]") : null;
      if (!target) return;
      event.preventDefault();
      window.history.pushState(null, "", target.href);
      sync();
    };
    root.addEventListener("click", click);
    window.addEventListener("popstate", sync);
    sync();
    return () => { root.removeEventListener("click", click); window.removeEventListener("popstate", sync); };
  }, []);
  return null;
}
