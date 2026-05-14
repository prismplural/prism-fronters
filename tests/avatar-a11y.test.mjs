import { readFileSync } from "node:fs"
import assert from "node:assert/strict"
import test from "node:test"

const source = readFileSync("src/lib/components/prism/MemberAvatar.svelte", "utf8")

test("MemberAvatar default alt is empty string", () => {
  assert.match(source, /export let alt(\s*:\s*string)?\s*=\s*['"]['"]/)
})
test("MemberAvatar wrapper does NOT have backwards aria-hidden flip", () => {
  assert.doesNotMatch(source, /aria-hidden=\{avatarSrc \? undefined/)
})
test("Initial-letter fallback span is aria-hidden=true", () => {
  // The span carries aria-hidden so it doesn't pollute the AT;
  // SR users get the avatar's identity from nearby labels.
  assert.match(source, /<span aria-hidden="true">\{initial\}/)
})
