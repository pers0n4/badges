import { assertEquals } from "https://deno.land/std@0.135.0/testing/asserts.ts";
import { toSimpleIconsName } from "./shields.ts";

Deno.test("Node.js", () => {
  const given = "Node.js";
  const expected = "nodedotjs";

  const actual = toSimpleIconsName(given);

  assertEquals(actual, expected);
});

Deno.test("Simple Icons", () => {
  const given = "Simple Icons";
  const expected = "simple-icons";

  const actual = toSimpleIconsName(given);

  assertEquals(actual, expected);
});
