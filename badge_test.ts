import { assertEquals } from "https://deno.land/std@0.147.0/testing/asserts.ts";
import * as simpleIcons from "https://unpkg.com/simple-icons/icons.mjs";
import { Badge, BadgeParameters, Schema } from "./badge.ts";
import { colorForBackground } from "./color.ts";

type BadgeKeys = keyof BadgeParameters;

Deno.test("Deno Badge", async (t) => {
  const { hex, slug } = simpleIcons.siDeno;

  const given: BadgeParameters = {
    label: "",
    message: "Deno",
  };
  const expected: Schema = {
    schemaVersion: 1,
    label: "",
    message: "Deno",
    color: hex,
    labelColor: colorForBackground(hex),
    namedLogo: slug,
    logoColor: hex,
    style: "flat-square",
  };

  const actual = new Badge(given);

  for (const key of Object.keys(expected) as BadgeKeys[]) {
    await t.step(key, () => {
      assertEquals(actual[key], expected[key]);
    });
  }
});

Deno.test("AWS Badge", async (t) => {
  const { hex, slug } = simpleIcons.siAmazonaws;

  const given: BadgeParameters = {
    label: "",
    message: "Amazon Web Services",
    namedLogo: "amazon-aws",
  };
  const expected: Schema = {
    schemaVersion: 1,
    label: "",
    message: "Amazon Web Services",
    color: hex,
    labelColor: colorForBackground(hex),
    namedLogo: slug,
    logoColor: hex,
    style: "flat-square",
  };

  const actual = new Badge(given);

  for (const key of Object.keys(expected) as BadgeKeys[]) {
    await t.step(key, () => {
      assertEquals(actual[key], expected[key]);
    });
  }
});

Deno.test("Volta Badge", async (t) => {
  const given: BadgeParameters = {
    label: "",
    message: "Volta",
  };
  const expected: Schema = {
    schemaVersion: 1,
    label: "",
    message: "Volta",
    color: undefined,
    labelColor: undefined,
    namedLogo: undefined,
    logoColor: undefined,
    style: "flat-square",
  };

  const actual = new Badge(given);

  for (const key of Object.keys(expected) as BadgeKeys[]) {
    await t.step(key, () => {
      assertEquals(actual[key], expected[key]);
    });
  }
});
