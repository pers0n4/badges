import { assertEquals } from "@std/assert";
import * as icons from "simple-icons";
import { Badge } from "./badge.ts";
import { colorForBackground } from "./color.ts";

Deno.test("Deno Badge", () => {
  const badge = new Badge("Deno");
  const actual = badge.toObject();

  const icon = icons.siDeno;

  assertEquals(actual.message, "Deno");
  assertEquals(actual.namedLogo, "deno");
  assertEquals(actual.color, icon.hex);
  assertEquals(actual.labelColor, colorForBackground(icon.hex));
});

Deno.test("Node.js Badge", () => {
  const badge = new Badge("Node.js");
  const actual = badge.toObject();

  const icon = icons.siNodedotjs;

  assertEquals(actual.message, "Node.js");
  assertEquals(actual.namedLogo, "nodedotjs");
  assertEquals(actual.color, icon.hex);
  assertEquals(actual.labelColor, colorForBackground(icon.hex));
});

Deno.test("AWS Badge", () => {
  const badge = new Badge("Amazon Web Services");
  const actual = badge.toObject();

  const icon = icons.siAmazonwebservices;

  assertEquals(actual.message, "Amazon Web Services");
  assertEquals(actual.namedLogo, "amazonwebservices");
  assertEquals(actual.color, icon.hex);
  assertEquals(actual.labelColor, colorForBackground(icon.hex));
});
