import Image from "next/image";
import type { ReactNode } from "react";
import { Fragment } from "react";

type DraftEntity = {
  type: string;
  mutability?: string;
  data?: {
    src?: string;
    alt?: string;
    url?: string;
    href?: string;
  };
};

type DraftBlock = {
  key: string;
  text: string;
  type: string;
  depth: number;
  inlineStyleRanges: Array<{ offset: number; length: number; style: string }>;
  entityRanges: Array<{ offset: number; length: number; key: number }>;
  data?: Record<string, unknown>;
};

export type DraftContent = {
  blocks: DraftBlock[];
  entityMap: Record<string, DraftEntity>;
};

const pClass =
  "text-buzz-slate text-base md:text-lg leading-relaxed mb-6 whitespace-pre-line";

function normalizeImageSrc(src: string): string {
  if (src.startsWith("//")) return `https:${src}`;
  return src;
}

function youtubeVideoId(raw: string): string | null {
  const s = raw.trim();
  try {
    const u = new URL(s.startsWith("http") ? s : `https://${s}`);
    if (u.hostname.replace("www.", "") === "youtu.be") {
      const id = u.pathname.replace(/^\//, "").split("/")[0];
      return id || null;
    }
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return v;
      const m = u.pathname.match(/\/embed\/([^/?]+)/);
      if (m) return m[1];
    }
  } catch {
    return null;
  }
  return null;
}

function getBreakpoints(
  text: string,
  inlineStyleRanges: DraftBlock["inlineStyleRanges"],
  entityRanges: DraftBlock["entityRanges"],
): number[] {
  const b = new Set<number>([0, text.length]);
  for (const r of inlineStyleRanges) {
    b.add(r.offset);
    b.add(r.offset + r.length);
  }
  for (const r of entityRanges) {
    b.add(r.offset);
    b.add(r.offset + r.length);
  }
  return [...b].sort((a, c) => a - c);
}

function stylesActiveAt(
  start: number,
  end: number,
  inlineStyleRanges: DraftBlock["inlineStyleRanges"],
): string[] {
  const set = new Set<string>();
  for (const r of inlineStyleRanges) {
    if (r.offset < end && r.offset + r.length > start) {
      set.add(r.style);
    }
  }
  return [...set];
}

function entityActiveAt(
  start: number,
  end: number,
  entityRanges: DraftBlock["entityRanges"],
): DraftBlock["entityRanges"][0] | undefined {
  return entityRanges.find(
    (r) => r.offset < end && r.offset + r.length > start,
  );
}

function renderRichText(
  text: string,
  inlineStyleRanges: DraftBlock["inlineStyleRanges"],
  entityRanges: DraftBlock["entityRanges"],
  entityMap: DraftContent["entityMap"],
): ReactNode {
  if (!text) return null;
  const breaks = getBreakpoints(text, inlineStyleRanges, entityRanges);
  const nodes: ReactNode[] = [];
  for (let i = 0; i < breaks.length - 1; i++) {
    const start = breaks[i];
    const end = breaks[i + 1];
    const slice = text.slice(start, end);
    if (slice === "") continue;

    const styles = stylesActiveAt(start, end, inlineStyleRanges);
    const ent = entityActiveAt(start, end, entityRanges);
    let node: ReactNode = slice;

    const e = ent ? entityMap[String(ent.key)] : undefined;
    if (e?.type === "LINK") {
      const href = e.data?.url || e.data?.href;
      if (href) {
        node = (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-buzz-coral underline decoration-buzz-coral/40 underline-offset-2 hover:decoration-buzz-coral"
          >
            {slice}
          </a>
        );
      }
    }

    for (const st of styles) {
      if (st === "BOLD") {
        node = (
          <strong className="font-semibold text-foreground">{node}</strong>
        );
      }
      if (st === "ITALIC") {
        node = <em>{node}</em>;
      }
    }

    nodes.push(<Fragment key={`${start}-${end}-${i}`}>{node}</Fragment>);
  }
  return <>{nodes}</>;
}

function AtomicBlock({
  block,
  entityMap,
}: {
  block: DraftBlock;
  entityMap: DraftContent["entityMap"];
}) {
  const er = block.entityRanges[0];
  if (!er) return null;
  const ent = entityMap[String(er.key)];
  if (ent?.type === "IMAGE" && ent.data?.src) {
    const src = normalizeImageSrc(ent.data.src);
    return (
      <div className="relative mb-8 aspect-[16/10] w-full overflow-hidden rounded-2xl bg-buzz-dark/5 shadow-elevated">
        <Image
          src={src}
          alt={ent.data.alt || ""}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>
    );
  }
  return null;
}

function HeaderBlock({
  block,
  entityMap,
}: {
  block: DraftBlock;
  entityMap: DraftContent["entityMap"];
}) {
  const inner = renderRichText(
    block.text,
    block.inlineStyleRanges,
    block.entityRanges,
    entityMap,
  );
  const t = block.type;
  if (t === "header-one") {
    return (
      <h2 className="font-[family-name:var(--font-syne-var)] text-2xl font-bold text-foreground md:text-3xl mt-12 mb-4">
        {inner}
      </h2>
    );
  }
  if (t === "header-two") {
    return (
      <h3 className="font-[family-name:var(--font-syne-var)] text-xl font-bold text-foreground md:text-2xl mt-12 mb-4">
        {inner}
      </h3>
    );
  }
  if (t === "header-three" || t === "header-four") {
    return (
      <h4 className="font-[family-name:var(--font-outfit-var)] text-lg font-bold text-foreground md:text-xl mt-10 mb-3">
        {inner}
      </h4>
    );
  }
  return (
    <h3 className="font-[family-name:var(--font-syne-var)] text-xl font-bold text-foreground md:text-2xl mt-10 mb-4">
      {inner}
    </h3>
  );
}

function UnstyledOrParagraph({
  block,
  entityMap,
}: {
  block: DraftBlock;
  entityMap: DraftContent["entityMap"];
}) {
  const text = block.text;
  const yid = youtubeVideoId(text);
  if (yid && text.trim().length < 120) {
    return (
      <div className="my-10 aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-elevated">
        <iframe
          title="YouTube video"
          src={`https://www.youtube.com/embed/${yid}`}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  const inner = renderRichText(
    text,
    block.inlineStyleRanges,
    block.entityRanges,
    entityMap,
  );
  return <p className={pClass}>{inner}</p>;
}

export function DraftBlogContent({ draft }: { draft: DraftContent }) {
  const entityMap = draft.entityMap || {};

  return (
    <div className="draft-blog-content max-w-none">
      {draft.blocks.map((block) => {
        const k = block.key;
        switch (block.type) {
          case "atomic":
            return <AtomicBlock key={k} block={block} entityMap={entityMap} />;
          case "header-one":
          case "header-two":
          case "header-three":
          case "header-four":
            return <HeaderBlock key={k} block={block} entityMap={entityMap} />;
          case "blockquote":
            return (
              <blockquote
                key={k}
                className="my-8 border-l-4 border-buzz-coral/50 pl-5 text-buzz-slate italic"
              >
                <p className="whitespace-pre-line text-base md:text-lg leading-relaxed">
                  {renderRichText(
                    block.text,
                    block.inlineStyleRanges,
                    block.entityRanges,
                    entityMap,
                  )}
                </p>
              </blockquote>
            );
          case "unstyled":
          case "paragraph":
            return (
              <UnstyledOrParagraph
                key={k}
                block={block}
                entityMap={entityMap}
              />
            );
          default:
            if (block.text?.trim()) {
              return (
                <UnstyledOrParagraph
                  key={k}
                  block={block}
                  entityMap={entityMap}
                />
              );
            }
            return null;
        }
      })}
    </div>
  );
}
