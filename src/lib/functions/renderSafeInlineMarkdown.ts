interface InlineToken {
  start: number
  end: number
  html: string
}

export const MAX_INLINE_MARKDOWN_LENGTH = 2000

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

export function renderSafeInlineMarkdown(value: string | null | undefined) {
  const raw = value ?? ""
  return raw.length > MAX_INLINE_MARKDOWN_LENGTH ? escapeText(raw) : renderInline(raw, 0)
}

function renderInline(value: string, depth: number): string {
  if (!value) return ""
  if (depth > 8) return escapeText(value)

  let html = ""
  let index = 0

  while (index < value.length) {
    const token = findNextToken(value, index, depth)

    if (!token) {
      html += escapeText(value.slice(index))
      break
    }

    html += escapeText(value.slice(index, token.start))
    html += token.html
    index = token.end
  }

  return html
}

function findNextToken(value: string, start: number, depth: number) {
  const tokens = [
    findCodeSpan(value, start),
    findMarkdownLink(value, start, depth),
    findDelimited(value, start, "**", "strong", depth),
    findDelimited(value, start, "~~", "s", depth),
    findDelimited(value, start, "||", "span", depth, ' class="d-spoiler"'),
    findDelimited(value, start, "*", "em", depth),
  ].filter((token): token is InlineToken => token !== null)

  tokens.sort((a, b) => a.start - b.start || a.end - b.end)
  return tokens[0] ?? null
}

function findCodeSpan(value: string, start: number): InlineToken | null {
  let open = value.indexOf("`", start)

  while (open !== -1) {
    const close = value.indexOf("`", open + 1)
    if (close === -1) return null

    const inner = value.slice(open + 1, close)
    if (inner.length > 0) {
      return {
        start: open,
        end: close + 1,
        html: `<code>${escapeHtml(inner)}</code>`,
      }
    }

    open = value.indexOf("`", close + 1)
  }

  return null
}

function findMarkdownLink(value: string, start: number, depth: number): InlineToken | null {
  let open = value.indexOf("[", start)

  while (open !== -1) {
    if (value[open - 1] === "!") {
      open = value.indexOf("[", open + 1)
      continue
    }

    const closeLabel = value.indexOf("]", open + 1)
    if (closeLabel === -1) return null
    if (value[closeLabel + 1] !== "(") {
      open = value.indexOf("[", open + 1)
      continue
    }

    const closeTarget = findClosingParen(value, closeLabel + 2)
    if (closeTarget === -1) {
      open = value.indexOf("[", open + 1)
      continue
    }

    const label = value.slice(open + 1, closeLabel)
    const href = normalizeLinkTarget(value.slice(closeLabel + 2, closeTarget))

    if (label.length > 0) {
      const labelHtml = renderInline(label, depth + 1)

      return {
        start: open,
        end: closeTarget + 1,
        html: href
          ? `<a href="${escapeHtml(href)}" target="_blank" rel="noreferrer noopener">${labelHtml}</a>`
          : labelHtml,
      }
    }

    open = value.indexOf("[", open + 1)
  }

  return null
}

function findDelimited(
  value: string,
  start: number,
  delimiter: string,
  tag: string,
  depth: number,
  attributes = ""
): InlineToken | null {
  let open = value.indexOf(delimiter, start)

  while (open !== -1) {
    if (isAmbiguousSingleDelimiter(value, open, delimiter)) {
      open = value.indexOf(delimiter, open + delimiter.length)
      continue
    }

    let close = value.indexOf(delimiter, open + delimiter.length)

    while (close !== -1 && isAmbiguousSingleDelimiter(value, close, delimiter)) {
      close = value.indexOf(delimiter, close + delimiter.length)
    }

    if (close === -1) return null

    const inner = value.slice(open + delimiter.length, close)
    if (inner.length > 0) {
      return {
        start: open,
        end: close + delimiter.length,
        html: `<${tag}${attributes}>${renderInline(inner, depth + 1)}</${tag}>`,
      }
    }

    open = value.indexOf(delimiter, close + delimiter.length)
  }

  return null
}

function findClosingParen(value: string, start: number) {
  let nested = 0

  for (let index = start; index < value.length; index += 1) {
    const char = value[index]

    if (char === "\\") {
      index += 1
      continue
    }

    if (char === "(") {
      nested += 1
    } else if (char === ")") {
      if (nested === 0) return index
      nested -= 1
    }
  }

  return -1
}

function normalizeLinkTarget(value: string) {
  let target = value.trim()

  if (target.startsWith("<") && target.endsWith(">")) {
    target = target.slice(1, -1).trim()
  }

  if (!target || /\s/.test(target)) return null

  try {
    const url = new URL(target)
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : null
  } catch {
    return null
  }
}

function isAmbiguousSingleDelimiter(value: string, index: number, delimiter: string) {
  return (
    delimiter.length === 1 &&
    (value[index - 1] === delimiter || value[index + delimiter.length] === delimiter)
  )
}

function escapeText(value: string) {
  return escapeHtml(value).replace(/\r\n|\r|\n/g, "<br>")
}
