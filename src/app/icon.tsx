import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: "6px",
          fontFamily: "sans-serif",
        }}
      >
        <span
          style={{
            fontSize: 20,
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
