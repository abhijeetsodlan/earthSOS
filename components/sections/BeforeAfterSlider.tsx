"use client";

import { useRef, useState } from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

const percentClasses: Record<number, string> = {
  0: "w-[0%]",
  5: "w-[5%]",
  10: "w-[10%]",
  15: "w-[15%]",
  20: "w-[20%]",
  25: "w-[25%]",
  30: "w-[30%]",
  35: "w-[35%]",
  40: "w-[40%]",
  45: "w-[45%]",
  50: "w-[50%]",
  55: "w-[55%]",
  60: "w-[60%]",
  65: "w-[65%]",
  70: "w-[70%]",
  75: "w-[75%]",
  80: "w-[80%]",
  85: "w-[85%]",
  90: "w-[90%]",
  95: "w-[95%]",
  100: "w-[100%]"
};

const leftClasses: Record<number, string> = {
  0: "left-[0%]",
  5: "left-[5%]",
  10: "left-[10%]",
  15: "left-[15%]",
  20: "left-[20%]",
  25: "left-[25%]",
  30: "left-[30%]",
  35: "left-[35%]",
  40: "left-[40%]",
  45: "left-[45%]",
  50: "left-[50%]",
  55: "left-[55%]",
  60: "left-[60%]",
  65: "left-[65%]",
  70: "left-[70%]",
  75: "left-[75%]",
  80: "left-[80%]",
  85: "left-[85%]",
  90: "left-[90%]",
  95: "left-[95%]",
  100: "left-[100%]"
};

export const BeforeAfterSlider = () => {
  const [position, setPosition] = useState(58);
  const ref = useRef<HTMLDivElement | null>(null);
  const snapped = Math.round(position / 5) * 5;
  const cleared = Math.round(100 - position);
  const habitatRisk = cleared < 25 ? "Low" : cleared < 55 ? "Rising" : "Severe";
  const soilRisk = cleared < 25 ? "Stable" : cleared < 55 ? "Exposed" : "Fragile";

  const update = (clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) {
      return;
    }
    setPosition(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  };

  return (
    <SectionWrapper title="Forest cover loss simulator" className="bg-neutral-100">
      <p className="mb-6 max-w-3xl text-sm leading-6 text-neutral-500 md:text-base">
        Drag the divider to compare a forested landscape with cleared land. The numbers below show how quickly habitat and soil protection decline as tree cover is removed.
      </p>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div
          ref={ref}
          className="relative h-[380px] overflow-hidden rounded-lg border border-neutral-200 bg-[#c9b08a] shadow-sm"
          onMouseMove={(event) => event.buttons === 1 && update(event.clientX)}
          onTouchMove={(event) => update(event.touches[0].clientX)}
        >
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#e9d7b7_0%,#bf935a_52%,#8a5a1f_100%)]" aria-hidden />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(16deg,rgba(133,79,11,0.22)_0_2px,transparent_2px_24px)]" aria-hidden />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent,rgba(80,45,14,0.38))]" aria-hidden />
          <div
            className={`absolute inset-y-0 left-0 overflow-hidden bg-[linear-gradient(180deg,#245006,#3b6d11_48%,#173404_100%)] ${percentClasses[snapped]}`}
            aria-label="Forest cover remaining"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_24%,rgba(192,221,151,0.9),transparent_10%),radial-gradient(circle_at_34%_34%,rgba(99,153,34,0.95),transparent_13%),radial-gradient(circle_at_58%_22%,rgba(151,196,89,0.75),transparent_12%),radial-gradient(circle_at_82%_38%,rgba(192,221,151,0.68),transparent_11%),radial-gradient(circle_at_42%_68%,rgba(99,153,34,0.82),transparent_14%)]" />
            <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0_30px,rgba(23,52,4,0.2)_30px_33px)]" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent,#173404)]" />
          </div>

          <div className={`absolute inset-y-0 z-10 w-1 bg-white shadow ${leftClasses[snapped]}`} />
          <input
            className="slider-thumb absolute bottom-5 left-5 right-5 z-20 h-3 appearance-none rounded-full bg-white/75"
            type="range"
            min="0"
            max="100"
            value={position}
            onChange={(event) => setPosition(Number(event.target.value))}
            aria-label="Adjust forest cover remaining"
          />

          <div className="absolute left-4 top-4 z-20 rounded bg-primary-600 px-3 py-2 text-sm font-bold text-white">
            Forested area
          </div>
          <div className="absolute right-4 top-4 z-20 rounded bg-warning px-3 py-2 text-sm font-bold text-neutral-700">
            Cleared area
          </div>
          <div className="absolute bottom-12 left-5 right-5 z-20 grid gap-2 rounded bg-white/90 px-4 py-3 text-sm font-semibold text-neutral-700 shadow-sm backdrop-blur sm:grid-cols-2">
            <span>Forest cover: {Math.round(position)}%</span>
            <span>Land cleared: {cleared}%</span>
          </div>
        </div>

        <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-primary-400">Current slider impact</p>
          <div className="mt-4 grid gap-4">
            <div>
              <div className="flex items-center justify-between text-sm font-semibold text-neutral-700">
                <span>Tree cover remaining</span>
                <span>{Math.round(position)}%</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-neutral-100">
                <div className={`h-full rounded-full bg-primary-300 ${percentClasses[snapped]}`} />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-700">Habitat pressure</p>
              <p className="mt-1 text-2xl font-bold text-warning-dark">{habitatRisk}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-700">Soil condition</p>
              <p className="mt-1 text-2xl font-bold text-neutral-700">{soilRisk}</p>
            </div>
            <p className="rounded bg-primary-50 p-3 text-sm leading-6 text-neutral-700">
              When forest cover falls, land heats faster, stores less carbon, and becomes easier to erode during heavy rain.
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
