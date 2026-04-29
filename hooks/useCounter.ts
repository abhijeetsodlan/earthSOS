"use client";

import { useEffect, useState } from "react";

export const useCounter = (target: number, duration = 1200, enabled = true) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) {
      return;
    }
    let frame = 0;
    const totalFrames = Math.max(1, Math.round(duration / 16));
    const tick = () => {
      frame += 1;
      const progress = Math.min(frame / totalFrames, 1);
      setValue(target * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };
    tick();
  }, [duration, enabled, target]);

  return value;
};
