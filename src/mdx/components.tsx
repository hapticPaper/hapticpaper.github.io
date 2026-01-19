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

  if (href.startsWith("/")) {
    const { href: _href, ...rest } = props;
    return <Link to={href} {...rest} />;
  }

  return <a target="_blank" rel="noreferrer" {...props} />;
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
