import test from "node:test"
import assert from "node:assert/strict"
import { getAvatarDisplayUrl } from "../src/lib/functions/avatar.ts"

test("returns empty string for falsy src", () => {
  assert.equal(getAvatarDisplayUrl(""), "")
  assert.equal(getAvatarDisplayUrl(null), "")
  assert.equal(getAvatarDisplayUrl(undefined), "")
})
test("returns relative URLs unchanged", () => {
  // URL parse fails on a relative path → fall through to raw src
  assert.equal(getAvatarDisplayUrl("/static/foo.png"), "/static/foo.png")
})
test("returns http URLs unchanged (browser blocks mixed-content separately)", () => {
  assert.equal(getAvatarDisplayUrl("http://example.com/a.png"), "http://example.com/a.png")
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
