import { ImageResponse } from "next/og";

export const alt =
  "Shoot Like a Pro · Dental Photography Intensive with Milos Miladinov · Oct 16-17, Roseville CA — The Buzz Marketing Co";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background:
            "linear-gradient(135deg, #0a0a14 0%, #1a1030 50%, #2a0f1f 100%)",
        }}
      >
        {/* Coral accent blob — top right */}
        <div
          style={{
            position: "absolute",
            top: "-140px",
            right: "-100px",
            width: "560px",
            height: "560px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,107,74,0.30) 0%, transparent 70%)",
          }}
        />
        {/* Violet accent blob — bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: "-160px",
            left: "-120px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(130,80,220,0.25) 0%, transparent 70%)",
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
            justifyContent: "space-between",
            padding: "72px 80px",
            width: "100%",
            height: "100%",
          }}
        >
          {/* Top: eyebrow + date chip */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 20px",
                borderRadius: "999px",
                background: "#FF6B4A",
                alignSelf: "flex-start",
                marginBottom: "36px",
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
                Dental Photography Intensive
              </span>
            </div>

            {/* Headline */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
              }}
            >
              <span
                style={{
                  fontSize: "96px",
                  fontWeight: 800,
                  color: "white",
                  display: "flex",
                }}
              >
                Shoot Like a
              </span>
              <span
                style={{
                  fontSize: "96px",
                  fontWeight: 800,
                  color: "#FF8A6A",
                  display: "flex",
                }}
              >
                Pro.
              </span>
            </div>

            {/* Instructor line */}
            <p
              style={{
                marginTop: "20px",
                fontSize: "22px",
                fontWeight: 600,
                color: "rgba(255,255,255,0.75)",
              }}
            >
              with Milos Miladinov · Oct 16 & 17 · Roseville, CA
            </p>
          </div>

          {/* Footer row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "24px",
              borderTop: "1px solid rgba(255,255,255,0.14)",
            }}
          >
            <span
              style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "rgba(255,255,255,0.85)",
              }}
            >
              Arora Periodontics × The Buzz Marketing Co
            </span>
            <span
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#FF8A6A",
              }}
            >
              $1,795 · Limited seats
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
