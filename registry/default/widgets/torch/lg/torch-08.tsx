"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { GaugeIcon } from "lucide-react";

import {
  Widget,
  WidgetContent,
  WidgetFooter,
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

const latencyData = [
  { time: "00:00", p50: 38, p95: 96, p99: 184 },
  { time: "04:00", p50: 41, p95: 108, p99: 212 },
  { time: "08:00", p50: 52, p95: 134, p99: 268 },
  { time: "12:00", p50: 64, p95: 162, p99: 341 },
  { time: "16:00", p50: 58, p95: 148, p99: 296 },
  { time: "20:00", p50: 47, p95: 121, p99: 233 },
  { time: "23:59", p50: 43, p95: 112, p99: 208 },
];

const chartConfig = {
  p50: {
    label: "p50",
    color: "var(--chart-1)",
  },
  p95: {
    label: "p95",
    color: "var(--chart-3)",
  },
  p99: {
    label: "p99",
    color: "var(--destructive)",
  },
} satisfies ChartConfig;

const percentiles = [
  { key: "p50", label: "p50", value: "43ms", color: "var(--chart-1)" },
  { key: "p95", label: "p95", value: "112ms", color: "var(--chart-3)" },
  { key: "p99", label: "p99", value: "208ms", color: "var(--destructive)" },
];

export default function WidgetDemo() {
  return (
    <Widget design="mumbai" size="lg" className="gap-3">
      <WidgetHeader className="items-center">
        <WidgetTitle className="flex items-center gap-2">
          <GaugeIcon className="text-vercel-blue size-5" />
          API Latency Percentiles
        </WidgetTitle>
        <Label className="text-muted-foreground text-xs tracking-wide uppercase">
          us-east-1
        </Label>
      </WidgetHeader>
      <WidgetContent className="flex-col items-stretch justify-start gap-3 overflow-hidden">
        <div className="grid grid-cols-3 gap-2">
          {percentiles.map((p) => (
            <div
              key={p.key}
              className="bg-secondary flex flex-col gap-1 rounded-2xl px-3 py-2"
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="size-2 rounded-full"
                  style={{ backgroundColor: p.color }}
                />
                <Label className="text-muted-foreground text-xs">
                  {p.label}
                </Label>
              </div>
              <p className="text-foreground text-xl leading-none font-semibold tabular-nums">
                {p.value}
              </p>
            </div>
          ))}
        </div>
        <ChartContainer
          config={chartConfig}
          className="max-h-[240px] w-full flex-1"
        >
          <LineChart
            accessibilityLayer
            data={latencyData}
            margin={{ left: 0, right: 8, top: 4, bottom: 0 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval="preserveStartEnd"
            />
            <YAxis
              width={36}
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              tickFormatter={(value) => `${value}ms`}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="p50"
              type="monotone"
              stroke="var(--color-p50)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="p95"
              type="monotone"
              stroke="var(--color-p95)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="p99"
              type="monotone"
              stroke="var(--color-p99)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
        <div className="flex items-center justify-center gap-5">
          {percentiles.map((p) => (
            <div key={p.key} className="flex items-center gap-1.5">
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: p.color }}
              />
              <Label className="text-muted-foreground text-sm">{p.label}</Label>
            </div>
          ))}
        </div>
      </WidgetContent>
      <WidgetFooter>
        <Label className="text-muted-foreground text-xs font-normal">
          /api/v2/users · last 24h
        </Label>
        <Label className="text-muted-foreground text-xs font-normal tabular-nums">
          SLO 250ms
        </Label>
      </WidgetFooter>
    </Widget>
  );
}
