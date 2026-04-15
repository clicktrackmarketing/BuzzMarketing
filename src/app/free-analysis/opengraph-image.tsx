import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Free Digital Analysis — See How Your Business Shows Up Online | The Buzz Marketing Co";
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
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #0a0a14 0%, #14142a 50%, #1a1030 100%)",
          position: "relative",
        }}
      >
        {/* Coral accent blob */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "-80px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,107,74,0.3) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-120px",
            right: "-60px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(130,80,220,0.25) 0%, transparent 70%)",
          }}
        />

        {/* Top bar accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #FF6B4A, #FF8A6A, #FF6B4A)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 80px",
            textAlign: "center",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "28px",
              padding: "10px 24px",
              borderRadius: "999px",
              background: "linear-gradient(135deg, #FF6B4A, #FF8A6A)",
            }}
          >
            <span
              style={{
                fontSize: "16px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase" as const,
                color: "white",
              }}
            >
              Free — Usually $500
            </span>
          </div>

          <h1
            style={{
              fontSize: "56px",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.1,
              marginBottom: "16px",
              letterSpacing: "-0.02em",
            }}
          >
            See How Your Business
          </h1>
          <h1
            style={{
              fontSize: "56px",
              fontWeight: 800,
              background: "linear-gradient(90deg, #FF6B4A, #FF8A6A)",
              backgroundClip: "text",
              color: "transparent",
              lineHeight: 1.1,
              marginBottom: "20px",
              letterSpacing: "-0.02em",
            }}
          >
            Shows Up Online
          </h1>

          <p
            style={{
              fontSize: "22px",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.5,
              maxWidth: "700px",
              marginBottom: "36px",
            }}
          >
            Website review, Google presence, social audit, competitor comparison,
            visibility score & action plan.
          </p>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "32px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#FF6B4A",
                }}
              />
              <span
                style={{ fontSize: "15px", color: "rgba(255,255,255,0.45)" }}
              >
                150+ Clients Served
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#FF6B4A",
                }}
              />
              <span
                style={{ fontSize: "15px", color: "rgba(255,255,255,0.45)" }}
              >
                5.0 Google Rating
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#FF6B4A",
                }}
              />
              <span
                style={{ fontSize: "15px", color: "rgba(255,255,255,0.45)" }}
              >
                The Buzz Marketing Co
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
