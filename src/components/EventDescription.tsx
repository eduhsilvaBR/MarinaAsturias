const HASHTAG_RE = /#[\p{L}\p{N}_]+/gu;

function parseDescription(raw: string) {
  const hashtags = Array.from(raw.matchAll(HASHTAG_RE)).map((m) => m[0]);
  const withoutHashtags = raw.replace(HASHTAG_RE, "");

  const cleaned = withoutHashtags
    .replace(/^\s*(\.{3}|…)\s*/, "") // leading "..." truncation artifact from copy-pasted captions
    .replace(/\s*\d+\s*(sem|semana|semanas|dia|dias|h|hora|horas)\s*$/i, ""); // trailing Instagram timestamp artifact

  const paragraphs = cleaned
    .split(/\n+/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  return { paragraphs, hashtags };
}

export default function EventDescription({ text, className }: { text: string; className?: string }) {
  const { paragraphs, hashtags } = parseDescription(text);
  if (paragraphs.length === 0 && hashtags.length === 0) return null;

  return (
    <div className={className}>
      <div className="flex flex-col gap-4">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-[15px] leading-relaxed text-cream/75">
            {p}
          </p>
        ))}
      </div>
      {hashtags.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {hashtags.map((tag) => (
            <span key={tag} className="text-xs tracking-wide text-gold/80">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
