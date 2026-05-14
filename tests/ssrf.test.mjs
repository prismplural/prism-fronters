import { test } from "node:test"
import assert from "node:assert/strict"
import { isPrivateAddress } from "../src/lib/server/ssrf.ts"

test("rejects loopback IPv4", () => {
  assert.equal(isPrivateAddress("127.0.0.1"), true)
  assert.equal(isPrivateAddress("127.255.255.255"), true)
})
test("rejects link-local 169.254.0.0/16 (incl. AWS metadata)", () => {
  assert.equal(isPrivateAddress("169.254.169.254"), true)
})
test("rejects RFC 1918 ranges", () => {
  assert.equal(isPrivateAddress("10.0.0.5"), true)
  assert.equal(isPrivateAddress("172.16.0.1"), true)
  assert.equal(isPrivateAddress("172.31.255.254"), true)
  assert.equal(isPrivateAddress("192.168.1.1"), true)
})
test("accepts public IPv4", () => {
  assert.equal(isPrivateAddress("1.1.1.1"), false)
  assert.equal(isPrivateAddress("8.8.8.8"), false)
})
test("rejects IPv6 loopback / link-local / ULA / unspecified", () => {
  assert.equal(isPrivateAddress("::1"), true)
  assert.equal(isPrivateAddress("::"), true)
  assert.equal(isPrivateAddress("fe80::1"), true)
  assert.equal(isPrivateAddress("fc00::1"), true)
  assert.equal(isPrivateAddress("fd12:3456::"), true)
})
test("rejects IPv4-mapped IPv6 (e.g. ::ffff:127.0.0.1, ::ffff:169.254.169.254)", () => {
  assert.equal(isPrivateAddress("::ffff:127.0.0.1"), true)
  assert.equal(isPrivateAddress("::ffff:169.254.169.254"), true)
  assert.equal(isPrivateAddress("::ffff:10.0.0.1"), true)
})
test("accepts IPv4-mapped IPv6 of public IPs", () => {
  assert.equal(isPrivateAddress("::ffff:1.1.1.1"), false)
})
test("172.15 and 172.32 are public (not RFC 1918)", () => {
  assert.equal(isPrivateAddress("172.15.0.1"), false)
  assert.equal(isPrivateAddress("172.32.0.1"), false)
})
test("malformed addresses treated as private (fail-safe)", () => {
  assert.equal(isPrivateAddress("not-an-ip"), true)
  assert.equal(isPrivateAddress(""), true)
})
