import { assertEquals } from "https://deno.land/std@0.147.0/testing/asserts.ts";
import { parseHexColor } from "./color.ts";

Deno.test("3 digit hex", () => {
  const given = "#000";
  const expected = {
    r: 0,
    g: 0,
    b: 0,
  };

  const actual = parseHexColor(given);

  assertEquals(actual, expected);
});

Deno.test("6 digit hex", () => {
  const given = "#ffffff";
  const expected = {
    r: 1,
    g: 1,
    b: 1,
  };

  const actual = parseHexColor(given);

  assertEquals(actual, expected);
});

Deno.test("4 digit hex", () => {
  const given = "#0000";
  const expected = {
    r: 0,
    g: 0,
    b: 0,
    alpha: 0,
  };

  const actual = parseHexColor(given);

  assertEquals(actual, expected);
});

Deno.test("8 digit hex", () => {
  const given = "#ffffffff";
  const expected = {
    r: 1,
    g: 1,
    b: 1,
    alpha: 1,
  };

  const actual = parseHexColor(given);

  assertEquals(actual, expected);
});
