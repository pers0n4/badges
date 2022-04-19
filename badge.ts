import { colorForBackground } from "./color.ts";
import { Icon } from "./icons.ts";

type BadgeStyle =
  | "plastic"
  | "flat"
  | "flat-square"
  | "for-the-badge"
  | "social";

export interface Schema {
  /**
   * Always the number 1.
   */
  readonly schemaVersion: 1;

  /**
   * The left text, or the empty string to omit the left side of the badge.
   *
   * This can be overridden by the query string.
   */
  label: string;

  /**
   * Can't be empty. The right text.
   */
  message: string;

  /**
   * The right color. Supports the eight named colors above, as well as hex, rgb, rgba, hsl, hsla and css named colors.
   *
   * This can be overridden by the query string.
   *
   * @defaultValue `lightgrey`
   */
  color?: string;

  /**
   * The left color.
   *
   * This can be overridden by the query string.
   *
   * @defaultValue `grey`
   */
  labelColor?: string;

  /**
   * `true` to treat this as an error badge. This prevents the user from overriding the color. In the future it may affect cache behavior.
   *
   * @defaultValue `false`
   */
  isError?: boolean;

  /**
   * One of the named logos supported by Shields or [simple-icons](https://simpleicons.org/).
   *
   * Can be overridden by the query string.
   *
   * @defaultValue `none`
   */
  namedLogo?: string;

  /**
   * An SVG string containing a custom logo.
   *
   * @defaultValue `none`
   */
  logoSvg?: string;

  /**
   * Same meaning as the query string.
   *
   * Can be overridden by the query string. Only works for named logos.
   *
   * @defaultValue `none`
   */
  logoColor?: string;

  /**
   * Same meaning as the query string.
   *
   * Can be overridden by the query string.
   *
   * @defaultValue `none`
   */
  logoWidth?: number;

  /**
   * Same meaning as the query string.
   *
   * Can be overridden by the query string.
   *
   * @defaultValue `none`
   */
  logoPosition?: string;

  /**
   * The default template to use.
   *
   * Can be overridden by the query string.
   *
   * @defaultValue `flat`
   */
  style?: BadgeStyle;

  /**
   * Set the HTTP cache lifetime in seconds, which should be respected by the Shields' CDN and downstream users. Values below 300 will be ignored. This lets you tune performance and traffic vs. responsiveness. The value you specify can be overridden by the user via the query string, but only to a longer value.
   *
   * @defaultValue `300`
   */
  cacheSeconds?: number;
}

type BadgeParameters = Omit<Schema, "schemaVersion">;

export class Badge implements Schema {
  public readonly schemaVersion: 1;
  public label: string;
  public message: string;
  public color?: string;
  public labelColor?: string;
  public isError?: boolean;
  public namedLogo?: string;
  public logoSvg?: string;
  public logoColor?: string;
  public logoWidth?: number;
  public logoPosition?: string;
  public style?: BadgeStyle;
  public cacheSeconds?: number;

  constructor({
    label = "",
    message = "",
    color,
    labelColor,
    isError,
    namedLogo,
    logoSvg,
    logoColor,
    logoWidth,
    logoPosition,
    style = "flat-square",
    cacheSeconds,
  }: BadgeParameters) {
    const icon = new Icon(namedLogo || message || label);

    this.schemaVersion = 1;
    this.label = label;
    this.message = message;
    this.color = color || icon.color;
    this.labelColor = labelColor || colorForBackground(icon.color);
    this.isError = isError;
    this.namedLogo = icon.slug;
    this.logoSvg = logoSvg;
    this.logoColor = logoColor || icon.color;
    this.logoWidth = logoWidth;
    this.logoPosition = logoPosition;
    this.style = style;
    this.cacheSeconds = cacheSeconds;
  }

  public static fromQueryString(params: URLSearchParams): Badge {
    return new Badge(Object.assign(Object.fromEntries(params.entries())));
  }
}
