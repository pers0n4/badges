import { assertEquals } from "https://deno.land/std@0.135.0/testing/asserts.ts";
import { Icon } from "./icons.ts";

Deno.test("Deno", () => {
  const given = "Deno";
  const expected = "deno";

  const actual = new Icon(given);

  assertEquals(actual.slug, expected);
  assertEquals(actual.title, given);
});

Deno.test("Node.js", () => {
  const given = "Node.js";
  const expected = "nodedotjs";

  const actual = new Icon(given);

  assertEquals(actual.slug, expected);
  assertEquals(actual.title, given);
});

Deno.test("TypeScript", () => {
  const given = "TypeScript";
  const expected = "typescript";

  const actual = new Icon(given);

  assertEquals(actual.slug, expected);
  assertEquals(actual.title, given);
});

Deno.test("Shields.io", () => {
  const given = "Shields.io";
  const expected = "shieldsdotio";

  const actual = new Icon(given);

  assertEquals(actual.slug, expected);
  assertEquals(actual.title, given);
});

Deno.test("Simple Icons", () => {
  const given = "Simple Icons";
  const expected = "simpleicons";

  const actual = new Icon(given);

  assertEquals(actual.slug, expected);
  assertEquals(actual.title, given);
});
