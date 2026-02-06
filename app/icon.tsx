import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: "#f2f2f2",
            fontSize: 18,
            fontWeight: 900,
            fontFamily: "monospace",
            letterSpacing: "-1px",
          }}
        >
          JS
        </span>
      </div>
    ),
    { ...size }
  );
}
