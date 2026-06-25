import test from "node:test"
import assert from "node:assert/strict"
import {
  MAX_INLINE_MARKDOWN_LENGTH,
  renderSafeInlineMarkdown,
} from "../src/lib/functions/renderSafeInlineMarkdown.ts"

test("renders markdown links in pronouns", () => {
  assert.equal(
    renderSafeInlineMarkdown("[pronouns](https://pronouns.cc/@leo)"),
    '<a href="https://pronouns.cc/@leo" target="_blank" rel="noreferrer noopener">pronouns</a>'
  )
})

test("supports common inline markdown without allowing raw HTML", () => {
  assert.equal(
    renderSafeInlineMarkdown("<img src=x> **they** *them* ~~old~~ `code` ||quiet||"),
    '&lt;img src=x&gt; <strong>they</strong> <em>them</em> <s>old</s> <code>code</code> <span class="d-spoiler">quiet</span>'
  )
})

test("drops unsafe markdown link targets", () => {
  const rendered = renderSafeInlineMarkdown("[bad](javascript:alert(1))")

  assert.equal(rendered, "bad")
  assert.doesNotMatch(rendered, /href=/)
  assert.doesNotMatch(rendered, /javascript:/)
})

test("drops data URI markdown link targets", () => {
  const rendered = renderSafeInlineMarkdown("[bad](data:text/html,<script>alert(1)</script>)")

  assert.equal(rendered, "bad")
  assert.doesNotMatch(rendered, /href=/)
  assert.doesNotMatch(rendered, /data:/)
  assert.doesNotMatch(rendered, /<script/)
})

test("keeps link labels escaped and formatted", () => {
  assert.equal(
    renderSafeInlineMarkdown("[**safe** <label>](https://example.com/pronouns)"),
    '<a href="https://example.com/pronouns" target="_blank" rel="noreferrer noopener"><strong>safe</strong> &lt;label&gt;</a>'
  )
})

test("keeps scanning after an unclosed markdown link", () => {
  assert.equal(
    renderSafeInlineMarkdown("[a](unclosed [b](https://example.com/y)"),
    '[a](unclosed <a href="https://example.com/y" target="_blank" rel="noreferrer noopener">b</a>'
  )
})

test("escapes raw script tags", () => {
  const rendered = renderSafeInlineMarkdown("<script>alert(1)</script>")

  assert.equal(rendered, "&lt;script&gt;alert(1)&lt;/script&gt;")
  assert.doesNotMatch(rendered, /<script/)
})

test("escapes formatted raw HTML", () => {
  assert.equal(
    renderSafeInlineMarkdown("**<img src=x onerror=alert(1)>**"),
    "<strong>&lt;img src=x onerror=alert(1)&gt;</strong>"
  )
})

test("escapes quotes in normalized hrefs", () => {
  const rendered = renderSafeInlineMarkdown('[x](https://example.com/"onmouseover=alert(1))')

  assert.doesNotMatch(rendered, /href="https:\/\/example.com\/"onmouseover=/)
  assert.match(rendered, /%22onmouseover/)
})

test("falls back to escaped text for long input", () => {
  const rendered = renderSafeInlineMarkdown("*a* ".repeat(MAX_INLINE_MARKDOWN_LENGTH / 2 + 1))

  assert.doesNotMatch(rendered, /<em>/)
  assert.match(rendered, /^\*a\* /)
})
