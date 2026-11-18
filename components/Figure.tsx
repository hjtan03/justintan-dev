import Image from "next/image";

export type FigureData = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
};

type Props = FigureData & {
  /** "full" spans the prose column; "phone" caps a portrait screenshot at 20rem. */
  variant?: "full" | "phone";
  /** Only for an image that can sit in the first screen. */
  priority?: boolean;
};

/**
 * An image with a caption. Screenshots get a hairline rule and the site's
 * small corner radius so they do not float on the background; no drawn
 * browser chrome or phone frames.
 */
export function Figure({ src, alt, width, height, caption, variant = "full", priority }: Props) {
  return (
    <figure className={`figure figure-${variant}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={variant === "phone" ? "(min-width: 40rem) 20rem, 100vw" : "(min-width: 900px) 37rem, 100vw"}
        className="figure-image"
      />
      <figcaption className="mt-2 font-sans text-meta text-text-muted">{caption}</figcaption>
    </figure>
  );
}
