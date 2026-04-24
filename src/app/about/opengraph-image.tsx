import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "About The Buzz Marketing Co - women-founded San Diego social media marketing agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const imagePath = join(process.cwd(), "public", "buzz-team-skyline.jpg");
  const imageData = await readFile(imagePath);
  const imageSrc = `data:image/jpeg;base64,${imageData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#0a0a14",
        }}
      >
        {/* Team photo as background */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt=""
          width={1200}
          height={630}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 20%",
          }}
        />

        {/* Full dark overlay for readability */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(10,10,20,0.5)",
          }}
        />
        {/* Bottom solid panel for strong text contrast */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "340px",
            background:
              "linear-gradient(180deg, rgba(10,10,20,0) 0%, rgba(10,10,20,0.85) 35%, rgba(10,10,20,0.98) 100%)",
          }}
        />

        {/* Coral top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(90deg, #FF6B4A, #FF8A6A, #FF6B4A)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "60px 72px",
            width: "100%",
            height: "100%",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "22px",
              padding: "10px 20px",
              borderRadius: "999px",
              background: "#FF6B4A",
              alignSelf: "flex-start",
            }}
          >
            <span
              style={{
                fontSize: "15px",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase" as const,
                color: "white",
              }}
            >
              About The Buzz Marketing Co
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: "76px",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              margin: 0,
              marginBottom: "20px",
              maxWidth: "1000px",
            }}
          >
            <span>Meet the team&nbsp;</span>
            <span style={{ color: "#FF8A6A" }}>behind The Buzz.</span>
          </h1>

          {/* Footer row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "8px",
              paddingTop: "20px",
              borderTop: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <span
              style={{
                fontSize: "22px",
                fontWeight: 600,
                color: "rgba(255,255,255,0.85)",
              }}
            >
              Women-founded · San Diego
            </span>
            <span
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#FF8A6A",
              }}
            >
              150+ clients · 8+ years · 5.0 rating
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
