"use client";

import { useState } from "react";
import DesktopShell from "@/components/desktop/DesktopShell";
import BootScreen from "@/components/desktop/BootScreen";

export default function Home() {
  const [isBooted, setIsBooted] = useState(false);

  if (!isBooted) {
    return <BootScreen onComplete={() => setIsBooted(true)} />;
  }

  return <DesktopShell />;
}
