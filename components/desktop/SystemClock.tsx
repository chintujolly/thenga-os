"use client";

import { useState, useEffect } from "react";

export default function SystemClock() {
  const [timeString, setTimeString] = useState<string>("");
  const [dateString, setDateString] = useState<string>("");
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);

    const updateClock = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
      setDateString(
        now.toLocaleDateString([], {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      );
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="flex flex-col items-end text-xs font-mono px-2 py-0.5 text-amber-200/60 select-none">
        <span>--:--:--</span>
        <span className="text-[10px] text-amber-300/40">Loading...</span>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-end text-xs font-mono px-2 py-0.5 rounded hover:bg-white/5 transition-colors cursor-default text-amber-100 select-none"
      title={`Kerala Standard Time\nDate: ${dateString}`}
    >
      <span className="font-semibold tracking-wider text-amber-200">
        {timeString}
      </span>
      <span className="text-[10px] text-amber-300/70">{dateString}</span>
    </div>
  );
}
