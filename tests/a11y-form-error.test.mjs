import { readFileSync } from "node:fs"
import assert from "node:assert/strict"
import test from "node:test"

const pages = [
  "src/routes/+page.svelte",
  "src/routes/f/+page.svelte",
]

for (const path of pages) {
  test(`${path} declares form prop`, () => {
    const source = readFileSync(path, "utf8")
    assert.match(source, /export let form/)
  })
  test(`${path} emits aria-live polite region`, () => {
    const source = readFileSync(path, "utf8")
    assert.match(source, /aria-live="polite"/)
  })
}
