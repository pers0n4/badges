type RGBA = {
  r: number;
  g: number;
  b: number;
  alpha?: number;
};

const hexColorRegex = /^#?([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})$/i;

/**
 * @param colorHex
 * @returns RGBA object
 */
export function parseHexColor(colorHex: string): RGBA {
  const match = colorHex.match(hexColorRegex);
  if (!match) {
    throw new Error(`Invalid hex color: ${colorHex}`);
  }

  const color = parseInt(match[1], 16);
  const length = match[1].length;

  switch (length) {
    case 3:
      return {
        r: (((color >> 8) & 0xf) | ((color >> 4) & 0xf0)) / 255,
        g: (((color >> 4) & 0xf) | (color & 0xf0)) / 255,
        b: ((color & 0xf) | ((color << 4) & 0xf0)) / 255,
      };
    case 4:
      return {
        r: (((color >> 12) & 0xf) | ((color >> 8) & 0xf0)) / 255,
        g: (((color >> 8) & 0xf) | ((color >> 4) & 0xf0)) / 255,
        b: (((color >> 4) & 0xf) | (color & 0xf0)) / 255,
        alpha: ((color & 0xf) | ((color << 4) & 0xf0)) / 255,
      };
    case 6:
      return {
        r: ((color >> 16) & 0xff) / 255,
        g: ((color >> 8) & 0xff) / 255,
        b: (color & 0xff) / 255,
      };
    case 8:
      return {
        r: ((color >> 24) & 0xff) / 255,
        g: ((color >> 16) & 0xff) / 255,
        b: ((color >> 8) & 0xff) / 255,
        alpha: (color & 0xff) / 255,
      };
    default:
      throw new Error(`Invalid hex color: ${colorHex}`);
  }
}

/**
 * @see {@link https://www.w3.org/TR/WCAG21/#dfn-relative-luminance}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_Colors_and_Luminance}
 * @param colorHex
 * @returns relative luminance
 */
export function luminance(colorHex: string): number {
  const { r, g, b } = parseHexColor(colorHex);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * @see {@link https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/Seizure_disorders#contrast_ratio}
 * @param a - L1 is the relative luminance of the lighter of the colors
 * @param b - L2 is the relative luminance of the darker of the colors
 * @returns contrast ratio
 */
export function contrast(a: string, b: string): number {
  const L1 = luminance(a);
  const L2 = luminance(b);
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}

/**
 * @see {@link https://github.com/material-components/material-components-web/tree/master/packages/mdc-theme#themetonecolor}
 * @param colorHex
 * @returns `light` or `dark`
 */
export function tone(colorHex: string): "light" | "dark" {
  const minimumContrast = 3.1;

  const lightContrast = contrast(colorHex, "#fff");
  const darkContrast = contrast(colorHex, "#000");

  if (lightContrast < minimumContrast && lightContrast < darkContrast) {
    return "light";
  } else {
    return "dark";
  }
}

/**
 * @see {@link https://github.com/badges/shields/blob/master/badge-maker/lib/color.js}
 * @param colorHex
 * @returns
 */
export function brightness(colorHex: string): number {
  // const [r, g, b] = Object.entries(parseHexColor(colorHex)).map(([, color]) =>
  //   Math.max(Math.min(Math.trunc(color * 255), 255), 0),
  // );
  // return +((r * 299 + g * 587 + b * 114) / 255000);

  const { r, g, b } = parseHexColor(colorHex);
  return (r * 299 + g * 587 + b * 114) / 1000;
}

/**
 * @see {@link https://github.com/badges/shields/blob/master/badge-maker/lib/badge-renderers.js}
 * @param colorHex
 * @returns background color
 */
export function colorForBackground(colorHex: string): string {
  const brightnessThreshold = 0.69;
  if (brightness(colorHex) <= brightnessThreshold) {
    // Material Color: Grey 200 (#eeeeee)
    return "rgba(238, 238, 238, 0.87)";
  } else {
    // Material Color: Grey 900 (#212121)
    return "rgba(33, 33, 33, 0.87)[";
  }
}
