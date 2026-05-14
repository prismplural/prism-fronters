import test from "node:test"
import assert from "node:assert/strict"
import { getAvatarDisplayUrl } from "../src/lib/functions/avatar.ts"

test("returns empty string for falsy src", () => {
  assert.equal(getAvatarDisplayUrl(""), "")
  assert.equal(getAvatarDisplayUrl(null), "")
  assert.equal(getAvatarDisplayUrl(undefined), "")
})
test("returns empty for relative URLs", () => {
  // URL parse fails on a relative path → empty (not passed through)
  assert.equal(getAvatarDisplayUrl("/static/foo.png"), "")
})
test("returns empty for http URLs", () => {
  assert.equal(getAvatarDisplayUrl("http://example.com/a.png"), "")
})
test("returns empty for javascript: URIs", () => {
  assert.equal(getAvatarDisplayUrl("javascript:alert(1)"), "")
})
test("returns empty for data: URIs", () => {
  assert.equal(getAvatarDisplayUrl("data:text/html,<script>"), "")
})
test("returns empty for vbscript: URIs", () => {
  assert.equal(getAvatarDisplayUrl("vbscript:msgbox()"), "")
})
test("proxies any https:// external URL", () => {
  const result = getAvatarDisplayUrl("https://cdn.discordapp.com/foo.png")
  assert.equal(result, `/avatar?url=${encodeURIComponent("https://cdn.discordapp.com/foo.png")}`)
})
test("proxies hosts that the old whitelist allowed", () => {
  for (const host of ["cdn.bsky.app", "cdn.picrew.me", "scratchupload.xyz", "i.imgur.com"]) {
    const url = `https://${host}/some/path.png`
    assert.equal(
      getAvatarDisplayUrl(url),
      `/avatar?url=${encodeURIComponent(url)}`,
    )
  }
})
