import { readFileSync } from "node:fs"
import assert from "node:assert/strict"
import test from "node:test"

test("history list is <ul>", () => {
  const source = readFileSync("src/routes/f/[slug]/+page.svelte", "utf8")
  assert.match(source, /<ul class="history-list"/)
})
test("history rows have aria-labelledby pointing at fronter strong", () => {
  const source = readFileSync("src/routes/f/[slug]/+page.svelte", "utf8")
  assert.match(source, /aria-labelledby=\{/)
  assert.match(source, /id=\{`row-/)
})
test("avatar-stack is aria-hidden", () => {
  const source = readFileSync("src/routes/f/[slug]/+page.svelte", "utf8")
  assert.match(source, /class="avatar-stack" aria-hidden="true"/)
})
