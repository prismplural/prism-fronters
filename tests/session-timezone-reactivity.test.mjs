import { readFileSync } from "node:fs"
import assert from "node:assert/strict"
import test from "node:test"
import { compile } from "svelte/compiler"

test("front history times rerender when local timezone mode is enabled", () => {
  const source = readFileSync("src/routes/f/[slug]/+page.svelte", "utf8")
  const { js } = compile(source, {
    generate: "client",
    dev: true,
    filename: "src/routes/f/[slug]/+page.svelte",
  })

  assert.match(js.code, /let useLocalTimes = \$\.mutable_source\(false\)/)
  assert.match(js.code, /\$\.set\(useLocalTimes, true\)/)
  assert.match(js.code, /formatSwitchTime\(\$\.get\(sessionStart\), \$\.get\(useLocalTimes\)\)/)
  assert.match(js.code, /formatSwitchTime\(\$\.get\(sessionEnd\), \$\.get\(useLocalTimes\)\)/)
})
