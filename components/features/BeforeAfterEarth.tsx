"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
  beforeImageUrl: string;
  afterImageUrl: string;
  beforeYear: number;
  afterYear: number;
  beforeLabel: string;
  afterLabel: string;
}

type DragEvent = MouseEvent | TouchEvent;

export const BeforeAfterEarth = ({
  beforeImageUrl,
  afterImageUrl,
  beforeYear,
  afterYear,
  beforeLabel,
  afterLabel
}: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const beforeRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [beforeFailed, setBeforeFailed] = useState(false);
  const [afterFailed, setAfterFailed] = useState(false);

  useEffect(() => {
    beforeRef.current?.style.setProperty("--clip-right", `${100 - sliderPos}%`);
    trackRef.current?.style.setProperty("--slider-left", `${sliderPos}%`);
  }, [sliderPos]);

  const updatePosition = useCallback((event: DragEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) {
      return;
    }

    const clientX = "touches" in event ? event.touches[0]?.clientX : event.clientX;
    if (typeof clientX !== "number") {
      return;
    }

    const pos = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(95, Math.max(5, pos)));
  }, []);

  useEffect(() => {
    if (!dragging) {
      return;
    }

    const onMove = (event: DragEvent) => {
      event.preventDefault();
      updatePosition(event);
    };
    const onEnd = () => setDragging(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onEnd);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
    };
  }, [dragging, updatePosition]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] max-h-[500px] overflow-hidden rounded-2xl bg-primary-600 shadow-2xl shadow-black/20 md:aspect-video"
    >
      {afterFailed ? (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-500 to-primary-600 px-6 text-center text-sm font-semibold text-primary-100">
          After image unavailable
        </div>
      ) : (
        <img
          src={afterImageUrl}
          alt={afterLabel}
          className="h-full w-full object-cover"
          draggable={false}
          onError={() => setAfterFailed(true)}
        />
      )}
      <div ref={beforeRef} className="absolute inset-0 overflow-hidden [clip-path:inset(0_var(--clip-right)_0_0)]">
        {beforeFailed ? (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-300 to-primary-600 px-6 text-center text-sm font-semibold text-white">
            Before image unavailable
          </div>
        ) : (
          <img
            src={beforeImageUrl}
            alt={beforeLabel}
            className="h-full w-full object-cover"
            draggable={false}
            onError={() => setBeforeFailed(true)}
          />
        )}
      </div>

      <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold uppercase text-neutral-700 shadow-sm">
        Before {beforeYear}
      </div>
      <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold uppercase text-neutral-700 shadow-sm">
        After {afterYear}
      </div>

      <div ref={trackRef} className="absolute inset-y-0 left-[var(--slider-left)] z-10 w-1 -translate-x-1/2 bg-white shadow-lg">
        <button
          type="button"
          aria-label="Drag to compare before and after images"
          className="absolute left-1/2 top-1/2 flex min-h-11 min-w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-primary-600 text-sm font-bold text-white shadow-xl touch-none"
          onMouseDown={(event) => {
            setDragging(true);
            updatePosition(event.nativeEvent);
          }}
          onTouchStart={(event) => {
            setDragging(true);
            updatePosition(event.nativeEvent);
          }}
        >
          <span aria-hidden>&lt; &gt;</span>
        </button>
      </div>
    </div>
  );
};
