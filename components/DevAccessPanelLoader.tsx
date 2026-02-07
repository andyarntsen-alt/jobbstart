"use client";

import dynamic from "next/dynamic";

const DevAccessPanel = dynamic(() => import("./DevAccessPanel"), {
  ssr: false,
});

export default function DevAccessPanelLoader() {
  return <DevAccessPanel />;
}
