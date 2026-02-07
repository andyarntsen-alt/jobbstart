import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "CVpilot – KI-drevet søknad og CV-generator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#f2f2f2",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            fontSize: 18,
            letterSpacing: "0.2em",
            color: "#000000",
            opacity: 0.4,
            marginBottom: 24,
          }}
        >
          / CVPILOT
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: "#000000",
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            marginBottom: 32,
          }}
        >
          SØKNAD & CV
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: "#000000",
            opacity: 0.15,
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            marginBottom: 48,
          }}
        >
          MED KI.
        </div>
        <div
          style={{
            fontSize: 16,
            letterSpacing: "0.15em",
            color: "#000000",
            opacity: 0.5,
          }}
        >
          KI-DREVET SØKNAD & CV-GENERATOR FOR NORSK ARBEIDSLIV
        </div>
      </div>
    ),
    { ...size }
  );
}
