"use client";

import { Area, AreaChart } from "recharts";
import { ActivityIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";

import {
  Widget,
  WidgetContent,
  WidgetHeader,
  WidgetTitle,
} from "@/registry/default/ui/widget";
import { ChartConfig, ChartContainer } from "@/registry/default/ui/chart";
import { Label } from "@/registry/default/ui/label";
import { cn } from "@/registry/default/lib/utils";

type Kpi = {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
};

const kpis: Kpi[] = [
  {
    label: "Active Nodes",
    value: "248",
    delta: "+12",
    trend: "up",
  },
  {
    label: "API Latency",
    value: "38ms",
    delta: "-6.4%",
    trend: "up",
  },
];

type MiniMetric = {
  key: string;
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  color: string;
  data: { t: number; v: number }[];
};

const miniMetrics: MiniMetric[] = [
  {
    key: "throughput",
    label: "Throughput",
    value: "94k/s",
    delta: "+8.1%",
    trend: "up",
    color: "var(--vercel-blue)",
    data: [
      { t: 1, v: 62 },
      { t: 2, v: 71 },
      { t: 3, v: 65 },
      { t: 4, v: 78 },
      { t: 5, v: 84 },
      { t: 6, v: 80 },
      { t: 7, v: 94 },
    ],
  },
  {
    key: "cpu",
    label: "CPU Load",
    value: "61%",
    delta: "+3.2%",
    trend: "down",
    color: "var(--vercel-purple)",
    data: [
      { t: 1, v: 48 },
      { t: 2, v: 52 },
      { t: 3, v: 50 },
      { t: 4, v: 58 },
      { t: 5, v: 55 },
      { t: 6, v: 64 },
      { t: 7, v: 61 },
    ],
  },
  {
    key: "uptime",
    label: "Uptime",
    value: "99.98%",
    delta: "+0.04%",
    trend: "up",
    color: "var(--productive)",
    data: [
      { t: 1, v: 99 },
      { t: 2, v: 96 },
      { t: 3, v: 99 },
      { t: 4, v: 98 },
      { t: 5, v: 100 },
      { t: 6, v: 99 },
      { t: 7, v: 100 },
    ],
  },
  {
    key: "errors",
    label: "Error Rate",
    value: "0.12%",
    delta: "+0.05%",
    trend: "down",
    color: "var(--destructive)",
    data: [
      { t: 1, v: 8 },
      { t: 2, v: 6 },
      { t: 3, v: 11 },
      { t: 4, v: 9 },
      { t: 5, v: 14 },
      { t: 6, v: 12 },
      { t: 7, v: 18 },
    ],
  },
];

const chartConfig = {
  v: {
    label: "Value",
  },
  throughput: {
    label: "Throughput",
    color: "var(--vercel-blue)",
  },
  cpu: {
    label: "CPU Load",
    color: "var(--vercel-purple)",
  },
  uptime: {
    label: "Uptime",
    color: "var(--productive)",
  },
  errors: {
    label: "Error Rate",
    color: "var(--destructive)",
  },
} satisfies ChartConfig;

export default function WidgetDemo() {
  return (
    <Widget design="mumbai" size="md" className="gap-3">
      <WidgetHeader className="items-center">
        <div className="flex items-center gap-1.5">
          <ActivityIcon className="text-productive size-4" />
          <WidgetTitle>Cluster Health</WidgetTitle>
        </div>
        <Label className="text-muted-foreground text-xs tracking-wide uppercase">
          Torch Cloud
        </Label>
      </WidgetHeader>
      <WidgetContent className="min-h-0 items-stretch gap-3 overflow-hidden">
        <div className="flex w-32 flex-none flex-col justify-between gap-2">
          {kpis.map((kpi) => {
            const TrendIcon =
              kpi.trend === "up" ? TrendingUpIcon : TrendingDownIcon;
            return (
              <div
                key={kpi.label}
                className="bg-secondary flex flex-1 flex-col justify-center gap-0.5 overflow-hidden rounded-2xl px-3 py-1.5"
              >
                <Label className="text-muted-foreground text-[11px]">
                  {kpi.label}
                </Label>
                <p className="text-foreground text-xl leading-none font-semibold tabular-nums">
                  {kpi.value}
                </p>
                <div
                  className={cn(
                    "flex items-center gap-1 text-[11px] font-medium",
                    kpi.trend === "up"
                      ? "text-productive"
                      : "text-destructive",
                  )}
                >
                  <TrendIcon className="size-3" />
                  <span className="tabular-nums">{kpi.delta}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-2">
          {miniMetrics.map((metric) => {
            const TrendIcon =
              metric.trend === "up" ? TrendingUpIcon : TrendingDownIcon;
            return (
              <div
                key={metric.key}
                className="flex min-h-0 flex-col justify-between overflow-hidden rounded-2xl border p-2"
              >
                <div className="flex items-start justify-between gap-1">
                  <Label className="text-muted-foreground truncate text-[10px]">
                    {metric.label}
                  </Label>
                  <TrendIcon
                    className={cn(
                      "size-3 flex-none",
                      metric.trend === "up"
                        ? "text-productive"
                        : "text-destructive",
                    )}
                  />
                </div>
                <div className="flex items-end justify-between gap-1">
                  <p className="text-foreground text-sm leading-none font-semibold tabular-nums">
                    {metric.value}
                  </p>
                  <span className="text-muted-foreground text-[10px] tabular-nums">
                    {metric.delta}
                  </span>
                </div>
                <ChartContainer
                  config={chartConfig}
                  className="mt-1 min-h-0 w-full flex-1"
                >
                  <AreaChart
                    accessibilityLayer
                    data={metric.data}
                    margin={{ top: 2, right: 0, bottom: 0, left: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id={`fill-${metric.key}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={metric.color}
                          stopOpacity={0.7}
                        />
                        <stop
                          offset="95%"
                          stopColor={metric.color}
                          stopOpacity={0.05}
                        />
                      </linearGradient>
                    </defs>
                    <Area
                      dataKey="v"
                      type="natural"
                      fill={`url(#fill-${metric.key})`}
                      fillOpacity={0.4}
                      stroke={metric.color}
                      strokeWidth={1.5}
                      dot={false}
                    />
                  </AreaChart>
                </ChartContainer>
              </div>
            );
          })}
        </div>
      </WidgetContent>
    </Widget>
  );
}
