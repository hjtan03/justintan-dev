import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Home-screen icon: the monogram on the accent, since iOS draws its own
// rounded mask and never inverts for dark mode.
export default async function AppleIcon() {
  const sansSemiBold = await readFile(path.join(process.cwd(), "app/fonts/og/InstrumentSans-SemiBold.ttf"));
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1e4798",
          color: "#fbfaf7",
          fontFamily: "Instrument Sans",
          fontSize: 96,
          fontWeight: 600,
          letterSpacing: "-0.05em",
          paddingBottom: 6,
        }}
      >
        JT
      </div>
    ),
    { ...size, fonts: [{ name: "Instrument Sans", data: sansSemiBold, weight: 600, style: "normal" }] },
  );
}
