"use client";

import { useState, useEffect } from "react";

export default function SystemClock() {
  const [timeString, setTimeString] = useState<string>("");
  const [dateString, setDateString] = useState<string>("");
  // Renders empty on the server and on first client paint (no mismatch),
  // then flips true once the clock has a real value to show.
  const mounted = timeString !== "";

  useEffect(() => {
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
      <div className="flex flex-col items-end text-xs font-mono px-2 py-0.5 text-[#6B4B23]/75 select-none">
        <span>--:--:--</span>
        <span className="text-[10px] text-[#6B4B23]/45">Loading...</span>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-end text-xs font-mono px-2 py-0.5 rounded hover:bg-black/5 transition-colors cursor-default text-[#2B1D0E] select-none"
      title={`Kerala Standard Time\nDate: ${dateString}`}
    >
      <span className="font-semibold tracking-wider text-[#6B4B23]">
        {timeString}
      </span>
      <span className="text-[10px] text-[#6B4B23]/75">{dateString}</span>
    </div>
  );
}
