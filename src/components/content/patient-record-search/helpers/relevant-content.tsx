type Span = {
  begin: number;
  end: number;
};

export function getRelevantContentFromDocumentSearchResult(text: string, spans: Span[]) {
  if (spans.length === 0) {
    return <>{text}</>;
  }
  const sortedSpans = getNonOverlappingSpans(spans);
  let idx = 0;
  const parts: string[] = [];
  for (const span of sortedSpans) {
    parts.push(text.slice(idx, span.begin));
    idx = span.begin;
    parts.push(text.slice(idx, span.end));
    idx = span.end;
  }
  parts.push(text.slice(idx));
  parts[0] = parts[0].slice(parts[0].length - 100);
  return (
    <>
      {spans[0].begin > 0 && <span>...</span>}
      {parts.map((part, i) =>
        i % 2 === 0 ? (
          // eslint-disable-next-line react/no-array-index-key
          <span key={i}>{part}</span>
        ) : (
          // eslint-disable-next-line react/no-array-index-key
          <span key={i} className="ctw-font-semibold">
            {part}
          </span>
        )
      )}
    </>
  );
}

function getNonOverlappingSpans(spans: Span[]): Span[] {
  if (spans.length === 0) {
    return [];
  }

  // Sort the spans by their start indexes
  spans.sort((a, b) => a.begin - b.begin);

  const nonOverlappingSpans: Span[] = [spans[0]];

  for (let i = 1; i < spans.length; i += 1) {
    const currentSpan = spans[i];
    const previousSpan = nonOverlappingSpans[nonOverlappingSpans.length - 1];

    // Check for overlap with the previous span
    if (currentSpan.begin <= previousSpan.end) {
      // Update the end index of the previous span if necessary
      if (currentSpan.end > previousSpan.end) {
        previousSpan.end = currentSpan.end;
      }
    } else {
      // No overlap, add the current span to the result array
      nonOverlappingSpans.push(currentSpan);
    }
  }

  return nonOverlappingSpans;
}
