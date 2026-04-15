import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #FF6B4A 0%, #FF8A6A 100%)",
          borderRadius: "36px",
          fontFamily: "sans-serif",
        }}
      >
        <span
          style={{
            fontSize: 110,
            fontWeight: 800,
            color: "white",
            lineHeight: 1,
          }}
        >
          B
        </span>
      </div>
    ),
    { ...size },
  );
}
