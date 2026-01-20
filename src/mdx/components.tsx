import type { ComponentPropsWithoutRef } from "react";
import { Link } from "react-router-dom";

import { Callout } from "@/components/mdx/Callout";

export const mdxComponents = {
  a: MdxLink,
  img: MdxImage,
  Callout,
};

function MdxLink(props: ComponentPropsWithoutRef<"a">) {
  const href = props.href;
  if (!href) return <a {...props} />;

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  const normalizedHref = normalizeHref(href);
  if (normalizedHref.startsWith("/")) {
    const { href: _href, ...rest } = props;
    return <Link to={normalizedHref} {...rest} />;
  }

  return <a target="_blank" rel="noreferrer" {...props} />;
}

function normalizeHref(href: string): string {
  if (href.startsWith("/") || href.startsWith("#")) return href;

  const isExternal = /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(href) || href.startsWith("//");
  if (isExternal) return href;

  // Treat bare paths (no scheme, no leading `/`) as site-root-relative.
  // For authoring, prefer absolute internal routes like `/projects`.
  if (!href.startsWith("./") && !href.startsWith("../")) {
    return `/${href.replace(/^\/+/, "")}`;
  }

  return href;
}

function MdxImage(props: ComponentPropsWithoutRef<"img">) {
  const alt = props.alt ?? "";

  return (
    <img
      {...props}
      alt={alt}
      className={["my-6 rounded-xl border border-zinc-200 dark:border-zinc-800", props.className]
        .filter(Boolean)
        .join(" ")}
      loading={props.loading ?? "lazy"}
    />
  );
}
