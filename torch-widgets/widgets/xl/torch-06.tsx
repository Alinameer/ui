"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  ActivityIcon,
  ServerIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react";

import {
  Widget,
  WidgetContent,
  WidgetHeader,
  WidgetTitle,
} from "../../components/ui/widget";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart";
import { Label } from "../../components/ui/label";
import { Separator } from "../../components/ui/separator";
import { cn } from "../../lib/utils";

const topEndpoints = [
  { endpoint: "/api/v2/users", requests: 4820, fill: "var(--color-requests)" },
  { endpoint: "/api/v2/deploy", requests: 3910, fill: "var(--color-requests)" },
  { endpoint: "/api/v2/nodes", requests: 3140, fill: "var(--color-requests)" },
  { endpoint: "/api/v2/logs", requests: 2680, fill: "var(--color-requests)" },
  { endpoint: "/api/v2/auth", requests: 2050, fill: "var(--color-requests)" },
  { endpoint: "/api/v2/billing", requests: 1180, fill: "var(--color-requests)" },
];

const requestsOverTime = [
  { hour: "00:00", requests: 18200 },
  { hour: "04:00", requests: 14100 },
  { hour: "08:00", requests: 31600 },
  { hour: "12:00", requests: 42800 },
  { hour: "16:00", requests: 48300 },
  { hour: "20:00", requests: 39400 },
  { hour: "24:00", requests: 27500 },
];

const chartConfig = {
  requests: {
    label: "Requests",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const areaChartConfig = {
  requests: {
    label: "Requests",
    color: "var(--vercel-blue)",
  },
} satisfies ChartConfig;

type Kpi = {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  positive: boolean;
};

const kpis: Kpi[] = [
  {
    label: "Uptime",
    value: "99.98%",
    delta: "+0.03%",
    trend: "up",
    positive: true,
  },
  {
    label: "Error Rate",
    value: "0.12%",
    delta: "+0.04%",
    trend: "up",
    positive: false,
  },
  {
    label: "p95 Latency",
    value: "182ms",
    delta: "-8.4%",
    trend: "down",
    positive: true,
  },
  {
    label: "Deploys",
    value: "37",
    delta: "+11",
    trend: "up",
    positive: true,
  },
];

export default function WidgetDemo() {
  return (
    <Widget design="mumbai" size="xl" className="gap-3">
      <WidgetHeader className="items-center">
        <div className="flex items-center gap-2">
          <ServerIcon className="text-vercel-blue size-5" />
          <div className="flex flex-col gap-0.5">
            <WidgetTitle className="text-base">Torch Cloud Overview</WidgetTitle>
            <Label className="text-muted-foreground text-xs font-light">
              us-east-1 · production · live
            </Label>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <ActivityIcon className="stroke-productive size-4" />
          <Label className="text-productive text-sm font-medium">
            All systems operational
          </Label>
        </div>
      </WidgetHeader>
      <WidgetContent className="items-stretch gap-4 overflow-hidden">
        {/* Left panel: top endpoints bar chart */}
        <div className="flex w-64 flex-none flex-col gap-2">
          <Label className="text-muted-foreground text-xs font-normal">
            Top endpoints · req/min
          </Label>
          <ChartContainer
            config={chartConfig}
            className="max-h-[220px] w-full flex-1"
          >
            <BarChart
              accessibilityLayer
              data={topEndpoints}
              layout="vertical"
              margin={{ left: 4, right: 12, top: 0, bottom: 0 }}
            >
              <CartesianGrid horizontal={false} />
              <XAxis type="number" dataKey="requests" hide />
              <YAxis
                type="category"
                dataKey="endpoint"
                tickLine={false}
                axisLine={false}
                tickMargin={6}
                width={104}
                className="font-mono"
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="requests" radius={[0, 5, 5, 0]} barSize={16} />
            </BarChart>
          </ChartContainer>
        </div>

        <Separator orientation="vertical" />

        {/* Center panel: requests over time area chart */}
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <Label className="text-muted-foreground text-xs font-normal">
              Requests over time · 24h
            </Label>
            <div className="flex items-center gap-1">
              <TrendingUpIcon className="text-productive size-3.5" />
              <Label className="text-foreground text-sm font-semibold tabular-nums">
                3.42M
              </Label>
            </div>
          </div>
          <ChartContainer
            config={areaChartConfig}
            className="max-h-[220px] w-full flex-1"
          >
            <AreaChart
              accessibilityLayer
              data={requestsOverTime}
              margin={{ left: 0, right: 8, top: 8, bottom: 0 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="hour"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                interval={1}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <defs>
                <linearGradient id="fillTorchRequests" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-requests)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-requests)"
                    stopOpacity={0.08}
                  />
                </linearGradient>
              </defs>
              <Area
                dataKey="requests"
                type="natural"
                fill="url(#fillTorchRequests)"
                fillOpacity={0.4}
                stroke="var(--color-requests)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </div>

        <Separator orientation="vertical" />

        {/* Right panel: KPI tiles */}
        <div className="grid w-52 flex-none grid-cols-2 grid-rows-2 gap-2">
          {kpis.map((kpi) => {
            const TrendIcon =
              kpi.trend === "up" ? TrendingUpIcon : TrendingDownIcon;
            return (
              <div
                key={kpi.label}
                className="bg-secondary flex flex-col justify-between gap-2 rounded-2xl px-3 py-2.5"
              >
                <Label className="text-muted-foreground text-xs">
                  {kpi.label}
                </Label>
                <p className="text-foreground text-2xl leading-none font-semibold tabular-nums">
                  {kpi.value}
                </p>
                <div
                  className={cn(
                    "flex items-center gap-1 text-xs font-medium",
                    kpi.positive ? "text-productive" : "text-destructive",
                  )}
                >
                  <TrendIcon className="size-3" />
                  <span className="tabular-nums">{kpi.delta}</span>
                </div>
              </div>
            );
          })}
        </div>
      </WidgetContent>
    </Widget>
  );
}
