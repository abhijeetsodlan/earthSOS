"use client";

import { useEffect, useState } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { TemperaturePoint } from "@/types";
import { climateService } from "@/services/climateService";
import { Card } from "@/components/ui/Card";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { fallbackTemperatureData } from "@/data/temperatureData";

export const TemperatureChart = () => {
  const [data, setData] = useState<TemperaturePoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    climateService.getTemperature()
      .then(setData)
      .catch(() => {
        setData(fallbackTemperatureData);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <SectionWrapper title="Global temperature anomaly has climbed sharply" className="bg-neutral-100">
      <p className="mb-5 max-w-3xl text-sm leading-6 text-neutral-500 md:text-base">
        Temperature anomaly shows how much warmer or cooler a year is compared with a long-term average baseline.
      </p>
      <Card>
        {loading && <div className="h-60 min-h-52 animate-pulse rounded bg-neutral-100" />}
        {!loading && (
          <div className="h-64 min-h-52">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="anomaly" stroke="#E24B4A" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card>
    </SectionWrapper>
  );
};
