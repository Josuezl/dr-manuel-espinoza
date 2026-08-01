import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Dr. Manuel Espinoza Rueda, cardiólogo intervencionista en San Pedro Sula";

export default function OpengraphImage() {
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
          background: "linear-gradient(108deg,#4b62d9 0%,#4d66d6 62%,#263181 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 30, letterSpacing: 4, opacity: 0.85 }}>
          SAN PEDRO SULA · HONDURAS
        </div>
        <div
          style={{
            fontSize: 78,
            fontWeight: 600,
            lineHeight: 1.08,
            marginTop: 28,
            display: "flex",
          }}
        >
          Dr. Manuel Espinoza Rueda
        </div>
        <div style={{ fontSize: 40, marginTop: 26, opacity: 0.92, display: "flex" }}>
          Cardiología intervencionista y hemodinamia
        </div>
      </div>
    ),
    size,
  );
}
