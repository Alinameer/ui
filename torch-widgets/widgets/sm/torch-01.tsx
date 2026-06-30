"use client";

import { Area, AreaChart } from "recharts";
import { ArrowUpRight, Zap } from "lucide-react";

import {
  Widget,
  WidgetContent,
  WidgetFooter,
  WidgetHeader,
  WidgetTitle,
} from "../../components/ui/widget";
import { ChartConfig, ChartContainer } from "../../components/ui/chart";
import { Label } from "../../components/ui/label";
import { cn } from "../../lib/utils";

const chartData = [
  { t: "00:00", throughput: 18.2 },
  { t: "02:00", throughput: 16.9 },
  { t: "04:00", throughput: 21.4 },
  { t: "06:00", throughput: 24.1 },
  { t: "08:00", throughput: 22.7 },
  { t: "10:00", throughput: 28.5 },
  { t: "12:00", throughput: 31.2 },
  { t: "14:00", throughput: 29.8 },
  { t: "16:00", throughput: 34.6 },
  { t: "18:00", throughput: 38.1 },
  { t: "20:00", throughput: 36.4 },
  { t: "22:00", throughput: 41.3 },
];

const chartConfig = {
  throughput: {
    label: "Throughput",
    color: "var(--vercel-blue)",
  },
} satisfies ChartConfig;

const delta = 12.4;
const isPositive = delta >= 0;

export default function WidgetDemo() {
  return (
    <Widget design="mumbai" size="sm" className="gap-1">
      <WidgetHeader className="items-center">
        <div className="flex items-center gap-1.5">
          <Zap className="text-vercel-blue size-4" />
          <WidgetTitle className="text-muted-foreground text-sm font-medium">
            Throughput
          </WidgetTitle>
        </div>
        <Label className="text-muted-foreground text-[10px] tracking-wide uppercase">
          Torch Cloud
        </Label>
      </WidgetHeader>
      <WidgetContent className="flex-col items-start justify-center gap-1">
        <div className="flex items-baseline gap-1">
          <Label className="text-4xl font-semibold tracking-tight tabular-nums">
            41.3
          </Label>
          <Label className="text-muted-foreground text-sm">k req/s</Label>
        </div>
        <div
          className={cn(
            "flex items-center gap-1 text-xs font-medium tabular-nums",
            isPositive ? "text-productive" : "text-destructive",
          )}
        >
          <ArrowUpRight
            className={cn("size-3.5", !isPositive && "rotate-90")}
          />
          <span>
            {isPositive ? "+" : ""}
            {delta}%
          </span>
          <span className="text-muted-foreground font-normal">vs 24h</span>
        </div>
      </WidgetContent>
      <WidgetFooter className="block">
        <ChartContainer config={chartConfig} className="h-12 w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 4, right: 0, bottom: 0, left: 0 }}
          >
            <defs>
              <linearGradient id="fillThroughput" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-throughput)"
                  stopOpacity={0.7}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-throughput)"
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="throughput"
              type="natural"
              fill="url(#fillThroughput)"
              fillOpacity={0.4}
              stroke="var(--color-throughput)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </WidgetFooter>
    </Widget>
  );
}
