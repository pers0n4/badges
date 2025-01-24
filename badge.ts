import * as icons from "simple-icons";
import { colorForBackground } from "./color.ts";

type BadgeStyle =
  | "flat"
  | "flat-square"
  | "plastic"
  | "for-the-badge"
  | "social";

export interface BadgeSchema {
  /**
   * Always the number 1.
   */
  readonly schemaVersion: 1;

  /**
   * The left text, or the empty string to omit the left side of the badge.
   * This can be overridden by the query string.
   */
  label: string;

  /**
   * Can't be empty. The right text.
   */
  message: string;

  /**
   * The right color.
   * Supports the eight named colors above, as well as hex, rgb, rgba, hsl, hsla and css named colors.
   * This can be overridden by the query string.
   *
   * @defaultValue "lightgrey"
   */
  color?: string;

  /**
   * The left color.
   * This can be overridden by the query string.
   *
   * @defaultValue "grey"
   */
  labelColor?: string;

  /**
   * `true` to treat this as an error badge.
   * This prevents the user from overriding the color.
   * In the future it may affect cache behavior.
   *
   * @defaultValue false
   */
  isError?: boolean;

  /**
   * One of the named logos supported by Shields or [simple-icons](https://simpleicons.org/).
   * Can be overridden by the query string.
   */
  namedLogo?: string;

  /**
   * An SVG string containing a custom logo.
   */
  logoSvg?: string;

  /**
   * Same meaning as the query string.
   * Can be overridden by the query string.
   * Only works for simple-icons logos.
   */
  logoColor?: string;

  /**
   * Make icons adaptively resize by setting `auto`.
   * Useful for some wider logos like `amd` and `amg`.
   * Supported for simple-icons logos only.
   */
  logoSize?: number;

  /**
   * Same meaning as the query string.
   * Can be overridden by the query string.
   */
  logoWidth?: number;

  /**
   * The default template to use.
   * Can be overridden by the query string.
   *
   * @defaultValue "flat"
   */
  style?: BadgeStyle;
}

export class Badge implements BadgeSchema {
  readonly schemaVersion = 1;
  label: string;
  message: string;
  color?: string;
  labelColor?: string;
  isError?: boolean;
  namedLogo?: string;
  logoSvg?: string;
  logoColor?: string;
  logoSize?: number;
  logoWidth?: number;
  style?: BadgeStyle;

  constructor(slug: string) {
    slug = slug.replace(/\s+/g, "").replace(/\./g, "dot").toLocaleLowerCase();
    const logo = slug.replace(
      /^[a-z]/,
      (firstLetter) => firstLetter.toUpperCase(),
    );
    const icon = icons[`si${logo}` as keyof typeof icons] as icons.SimpleIcon;

    this.label = "";
    this.message = icon.title;
    this.color = icon.hex;
    this.labelColor = colorForBackground(icon.hex);
    this.namedLogo = icon.slug;
    this.logoColor = icon.hex;
    this.style = "flat-square";
  }

  public toObject(): BadgeSchema {
    return { ...this };
  }

  public toJson(): string {
    return JSON.stringify(this.toObject());
  }
}
