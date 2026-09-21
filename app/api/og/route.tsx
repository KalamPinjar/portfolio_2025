import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? site.name;
  const subtitle = searchParams.get("subtitle") ?? site.thesis;
  const tag = searchParams.get("tag") ?? site.role;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#080b11",
          padding: "72px",
          // Matches the site's decorative grid field.
          backgroundImage:
            "linear-gradient(to right, rgba(170,200,230,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(170,200,230,0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "999px",
              background: "#ffae57",
            }}
          />
          <div
            style={{
              fontSize: "22px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#94a3b8",
            }}
          >
            {tag}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: title.length > 24 ? "76px" : "104px",
              lineHeight: 1,
              fontWeight: 700,
              color: "#e9eef5",
              letterSpacing: "-0.03em",
            }}
          >
            {title}
          </div>
          <div
            style={{
              marginTop: "28px",
              fontSize: "30px",
              lineHeight: 1.35,
              color: "#94a3b8",
              maxWidth: "900px",
            }}
          >
            {subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(170,200,230,0.15)",
            paddingTop: "28px",
          }}
        >
          {/* Satori requires an explicit display on any node with more than
              one child — it has no block layout to fall back on. */}
          <div
            style={{
              display: "flex",
              fontSize: "26px",
              fontWeight: 700,
              color: "#e9eef5",
            }}
          >
            {site.name}
            <span style={{ color: "#58d8f0" }}>.</span>
          </div>
          <div style={{ fontSize: "22px", color: "#7d8aa1" }}>
            {`${site.role} · ${site.company}`}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
