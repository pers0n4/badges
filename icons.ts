import * as simpleIcons from "https://unpkg.com/simple-icons/icons.mjs";

interface SimpleIcon {
  title: string;
  slug: string;
  svg: string;
  path: string;
  source: string;
  hex: string;
  guidelines?: string | undefined;
  license?:
    | {
        type: string;
        url: string;
      }
    | undefined;
}

type SimpleIcons = Record<string, SimpleIcon>;

export class Icon {
  private icon: SimpleIcon;

  constructor(name: string) {
    const slug = name
      .trim()
      .toLowerCase()
      .replace(/[\/\s-]/g, "")
      .replace(/\./g, "dot");

    this.icon = Icon.getSimpleIcon(slug);
  }

  public get title(): string {
    return this.icon?.title;
  }

  public get slug(): string {
    return this.icon?.slug;
  }

  public get color(): string {
    return this.icon?.hex;
  }

  public static getSimpleIcon(name: string): SimpleIcon {
    return (
      (simpleIcons as SimpleIcons)[
        `si${name.charAt(0).toUpperCase() + name.slice(1)}`
      ] ?? undefined
    );
  }
}
