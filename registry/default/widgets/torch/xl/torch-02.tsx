"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { ActivityIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";

import {
  Widget,
  WidgetContent,
  WidgetHeader,
  WidgetTitle,
} from "@/registry/default/ui/widget";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/default/ui/chart";
import { Label } from "@/registry/default/ui/label";
import { Separator } from "@/registry/default/ui/separator";
import { cn } from "@/registry/default/lib/utils";

const latencyData = [
  { month: "Jan", usEast: 42, euWest: 58, apSouth: 96 },
  { month: "Feb", usEast: 45, euWest: 61, apSouth: 102 },
  { month: "Mar", usEast: 39, euWest: 55, apSouth: 91 },
  { month: "Apr", usEast: 48, euWest: 63, apSouth: 110 },
  { month: "May", usEast: 51, euWest: 60, apSouth: 104 },
  { month: "Jun", usEast: 44, euWest: 57, apSouth: 98 },
  { month: "Jul", usEast: 40, euWest: 54, apSouth: 89 },
  { month: "Aug", usEast: 46, euWest: 59, apSouth: 95 },
  { month: "Sep", usEast: 43, euWest: 56, apSouth: 92 },
  { month: "Oct", usEast: 47, euWest: 62, apSouth: 107 },
  { month: "Nov", usEast: 41, euWest: 53, apSouth: 88 },
  { month: "Dec", usEast: 38, euWest: 51, apSouth: 84 },
];

const chartConfig = {
  usEast: {
    label: "us-east-1",
    color: "var(--chart-1)",
  },
  euWest: {
    label: "eu-west-1",
    color: "var(--chart-2)",
  },
  apSouth: {
    label: "ap-south-1",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

type RegionStat = {
  key: keyof typeof chartConfig;
  region: string;
  p95: string;
  delta: string;
  trend: "up" | "down";
};

const regionStats: RegionStat[] = [
  {
    key: "usEast",
    region: "us-east-1",
    p95: "38ms",
    delta: "-9.5%",
    trend: "up",
  },
  {
    key: "euWest",
    region: "eu-west-1",
    p95: "51ms",
    delta: "-12.1%",
    trend: "up",
  },
  {
    key: "apSouth",
    region: "ap-south-1",
    p95: "84ms",
    delta: "+4.8%",
    trend: "down",
  },
];

export default function WidgetDemo() {
  return (
    <Widget design="mumbai" size="xl" className="gap-3">
      <WidgetHeader className="items-center">
        <div className="flex items-center gap-2">
          <ActivityIcon className="text-vercel-blue size-5" />
          <div className="flex flex-col gap-0.5">
            <WidgetTitle className="text-base">Latency by Region</WidgetTitle>
            <Label className="text-muted-foreground text-xs font-light">
              Torch Cloud · p95 response time · last 12 months
            </Label>
          </div>
        </div>
        <Label className="text-muted-foreground text-xs tracking-wide uppercase">
          milliseconds
        </Label>
      </WidgetHeader>
      <WidgetContent className="items-stretch justify-start gap-4 overflow-hidden">
        <div className="flex flex-1 flex-col justify-center gap-2 overflow-hidden">
          <ChartContainer
            config={chartConfig}
            className="max-h-[260px] w-full"
          >
            <LineChart
              accessibilityLayer
              data={latencyData}
              margin={{ left: 0, right: 12, top: 8, bottom: 0 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                width={36}
                tickFormatter={(value) => `${value}`}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line
                dataKey="usEast"
                type="monotone"
                stroke="var(--color-usEast)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="euWest"
                type="monotone"
                stroke="var(--color-euWest)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="apSouth"
                type="monotone"
                stroke="var(--color-apSouth)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
          <div className="flex items-center justify-center gap-6">
            {regionStats.map((stat) => (
              <div key={stat.key} className="flex items-center gap-1.5">
                <span
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: `var(--color-${stat.key})` }}
                />
                <Label className="text-muted-foreground text-xs">
                  {stat.region}
                </Label>
              </div>
            ))}
          </div>
        </div>
        <Separator orientation="vertical" className="h-auto" />
        <div className="flex w-48 flex-none flex-col gap-2">
          <Label className="text-muted-foreground text-xs tracking-wide uppercase">
            Current p95
          </Label>
          <div className="flex flex-1 flex-col gap-2">
            {regionStats.map((stat) => {
              const TrendIcon =
                stat.trend === "up" ? TrendingDownIcon : TrendingUpIcon;
              return (
                <div
                  key={stat.key}
                  className="bg-secondary flex flex-1 flex-col justify-center gap-1.5 rounded-2xl px-3 py-2"
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className="size-2.5 rounded-full"
                      style={{ backgroundColor: `var(--color-${stat.key})` }}
                    />
                    <Label className="text-muted-foreground font-mono text-xs">
                      {stat.region}
                    </Label>
                  </div>
                  <div className="flex items-end justify-between gap-1">
                    <p className="text-foreground text-2xl leading-none font-semibold tabular-nums">
                      {stat.p95}
                    </p>
                    <div
                      className={cn(
                        "flex items-center gap-1 text-xs font-medium",
                        stat.trend === "up"
                          ? "text-productive"
                          : "text-destructive",
                      )}
                    >
                      <TrendIcon className="size-3" />
                      <span className="tabular-nums">{stat.delta}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </WidgetContent>
    </Widget>
  );
}
