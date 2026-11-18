import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/data/site";

export const alt = `${site.name}, ${site.domain}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Static instances of the site's faces. Satori reads TTF, not the variable
// woff2 the page uses, so these are latin-only cuts of the upstream files.
const font = (file: string) => readFile(path.join(process.cwd(), "app/fonts/og", file));

// First sentence of the hero line: the card is read at roughly 500px wide.
const positioning = site.heroLine.split(/(?<=\.)\s/)[0];

export default async function OpenGraphImage() {
  const [sansSemiBold, sansMedium, serifItalic] = await Promise.all([
    font("InstrumentSans-SemiBold.ttf"),
    font("InstrumentSans-Medium.ttf"),
    font("Newsreader72pt-Italic.ttf"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px 64px",
          background: "#fbfaf7",
          color: "#110f0b",
          fontFamily: "Instrument Sans",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 132, fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1 }}>{site.name}</div>
          <div style={{ width: 180, height: 8, background: "#1e4798", marginTop: 28 }} />
          <div
            style={{
              marginTop: 40,
              maxWidth: 820,
              fontFamily: "Newsreader",
              fontStyle: "italic",
              fontSize: 50,
              lineHeight: 1.25,
              color: "#302d28",
            }}
          >
            {positioning}
          </div>
        </div>
        <div style={{ fontSize: 32, fontWeight: 500, color: "#66635c", letterSpacing: "0.01em" }}>{site.domain}</div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Instrument Sans", data: sansSemiBold, weight: 600, style: "normal" },
        { name: "Instrument Sans", data: sansMedium, weight: 500, style: "normal" },
        { name: "Newsreader", data: serifItalic, weight: 400, style: "italic" },
      ],
    },
  );
}
