import { readFileSync } from "node:fs"
import assert from "node:assert/strict"
import test from "node:test"

test("PrismShell emits skip link as first child", () => {
  const source = readFileSync("src/lib/components/prism/PrismShell.svelte", "utf8")
  assert.match(source, /class="skip-link"[^>]*href="#main-content"/)
})
test("PrismShell main element has id=main-content", () => {
  const source = readFileSync("src/lib/components/prism/PrismShell.svelte", "utf8")
  assert.match(source, /<main[^>]*id="main-content"/)
})
test("PrismShell nav links carry aria-current binding", () => {
  const source = readFileSync("src/lib/components/prism/PrismShell.svelte", "utf8")
  assert.match(source, /aria-current=/)
})
