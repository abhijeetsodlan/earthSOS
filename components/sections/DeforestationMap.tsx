"use client";

import { useEffect, useRef, useState } from "react";
import type { DeforestationCountry } from "@/types";
import { climateService } from "@/services/climateService";
import { Card } from "@/components/ui/Card";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { fallbackDeforestationData } from "@/data/temperatureData";

const hectaresFormatter = new Intl.NumberFormat("en-US");

interface MapTooltip {
  name: string;
  detail: string;
  x: number;
  y: number;
}

export const DeforestationMap = () => {
  const [data, setData] = useState<DeforestationCountry[]>([]);
  const [tooltip, setTooltip] = useState<MapTooltip | null>(null);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);

  const updateTooltipPosition = (event: React.PointerEvent<HTMLDivElement>, item?: DeforestationCountry) => {
    const bounds = mapRef.current?.getBoundingClientRect();
    if (!bounds) {
      return;
    }

    const tooltipWidth = 224;
    const isTouch = event.pointerType === "touch";
    const pointerX = isTouch ? bounds.width / 2 : event.clientX - bounds.left;
    const pointerY = isTouch ? bounds.height - 18 : event.clientY - bounds.top;
    const x = Math.min(Math.max(pointerX, tooltipWidth / 2 + 12), bounds.width - tooltipWidth / 2 - 12);
    const y = Math.min(Math.max(pointerY, 78), bounds.height - 16);

    setTooltip({
      name: item?.name ?? "India",
      detail: item
        ? `${hectaresFormatter.format(item.annualLossHectares)} hectares tree cover loss/year`
        : "No highlighted tree cover loss data",
      x,
      y
    });
  };

  useEffect(() => {
    climateService.getDeforestation()
      .then(setData)
      .catch(() => {
        setData(fallbackDeforestationData);
      })
      .finally(() => setLoading(false));
  }, []);

  const indiaData = data[0];

  return (
    <SectionWrapper title="Deforestation pressure in India" className="bg-neutral-100">
      <Card>
        {loading && <div className="h-72 animate-pulse rounded bg-neutral-100" />}
        {!loading && (
          <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_19rem]">
            <div
              ref={mapRef}
              className="relative mx-auto aspect-[4/3] w-full max-w-[620px] overflow-hidden rounded-lg border border-warning/20 bg-[#fff4df] shadow-inner"
              role="img"
              aria-label="India deforestation pressure map"
              tabIndex={0}
              onPointerEnter={(event) => updateTooltipPosition(event, indiaData)}
              onPointerMove={(event) => updateTooltipPosition(event, indiaData)}
              onPointerDown={(event) => updateTooltipPosition(event, indiaData)}
              onPointerLeave={(event) => {
                if (event.pointerType !== "touch") {
                  setTooltip(null);
                }
              }}
              onFocus={() => {
                setTooltip({
                  name: indiaData?.name ?? "India",
                  detail: indiaData
                    ? `${hectaresFormatter.format(indiaData.annualLossHectares)} hectares tree cover loss/year`
                    : "No highlighted tree cover loss data",
                  x: 310,
                  y: 250
                });
              }}
              onBlur={() => setTooltip(null)}
            >
              <img
                src="/images/india-warm-map.png"
                alt=""
                className="h-full w-full object-cover"
                draggable={false}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#7c2d12]/10 via-transparent to-white/10" />
              {tooltip && (
                <div
                  className="pointer-events-none absolute z-10 w-56 rounded bg-neutral-700 px-3 py-2 text-xs text-white shadow-lg"
                  style={{
                    left: tooltip.x,
                    top: tooltip.y,
                    transform: "translate(-50%, calc(-100% - 10px))"
                  }}
                >
                  <p className="font-bold">{tooltip.name}</p>
                  <p className="mt-1 text-neutral-100">{tooltip.detail}</p>
                </div>
              )}
            </div>
            <div className="rounded-lg border border-warning/20 bg-[#fff4df] p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-warning-dark">India tree cover loss</p>
              <p className="mt-2 text-3xl font-bold text-neutral-700 md:text-4xl">
                {hectaresFormatter.format(indiaData?.annualLossHectares ?? 0)}
              </p>
              <p className="mt-1 text-sm text-neutral-500">hectares per year</p>
            </div>
          </div>
        )}
      </Card>
    </SectionWrapper>
  );
};
