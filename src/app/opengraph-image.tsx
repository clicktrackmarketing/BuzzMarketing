import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "The Buzz Marketing Co — San Diego's Premier Social Media Marketing Agency";
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
          background: "linear-gradient(135deg, #0a0a14 0%, #14142a 50%, #1a1030 100%)",
          position: "relative",
        }}
      >
        {/* Coral accent blob */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-60px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,107,74,0.25) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-40px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(130,80,220,0.2) 0%, transparent 70%)",
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "24px",
              padding: "8px 20px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.05)",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#FF6B4A",
              }}
            />
            <span
              style={{
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase" as const,
                color: "rgba(255,255,255,0.6)",
              }}
            >
              Women Founded &middot; San Diego
            </span>
          </div>

          <h1
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.1,
              marginBottom: "16px",
              letterSpacing: "-0.02em",
            }}
          >
            The Buzz Marketing Co
          </h1>

          <p
            style={{
              fontSize: "24px",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.5,
              maxWidth: "700px",
            }}
          >
            San Diego&apos;s premier social media marketing agency. Strategy,
            content, and ads that turn scrollers into customers.
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "32px",
              marginTop: "40px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span
                style={{ fontSize: "32px", fontWeight: 800, color: "white" }}
              >
                150+
              </span>
              <span
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                Clients Served
              </span>
            </div>
            <div
              style={{
                width: "1px",
                height: "40px",
                background: "rgba(255,255,255,0.1)",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span
                style={{ fontSize: "32px", fontWeight: 800, color: "white" }}
              >
                5.0
              </span>
              <span
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                Google Rating
              </span>
            </div>
            <div
              style={{
                width: "1px",
                height: "40px",
                background: "rgba(255,255,255,0.1)",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span
                style={{ fontSize: "32px", fontWeight: 800, color: "white" }}
              >
                8+
              </span>
              <span
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                Years in SD
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
