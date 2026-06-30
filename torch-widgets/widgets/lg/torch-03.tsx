"use client";

import { ShieldCheckIcon } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  Widget,
  WidgetContent,
  WidgetFooter,
  WidgetHeader,
  WidgetTitle,
} from "../../components/ui/widget";
import { Label } from "../../components/ui/label";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart";
import { cn } from "../../lib/utils";

const scorecardData = [
  { metric: "Latency", current: 88, target: 95 },
  { metric: "Uptime", current: 99, target: 99 },
  { metric: "Throughput", current: 82, target: 90 },
  { metric: "Errors", current: 71, target: 85 },
  { metric: "Cost", current: 64, target: 80 },
  { metric: "Coverage", current: 78, target: 92 },
];

const chartConfig = {
  current: {
    label: "Current",
    color: "var(--chart-1)",
  },
  target: {
    label: "Target",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export default function WidgetDemo() {
  return (
    <Widget design="mumbai" size="lg" className="gap-2">
      <WidgetHeader>
        <div className="flex flex-col gap-0.5">
          <WidgetTitle className="text-lg">Service Scorecard</WidgetTitle>
          <Label className="text-muted-foreground text-xs font-normal">
            Torch Cloud · us-east-1
          </Label>
        </div>
        <div className="bg-secondary flex items-center gap-1.5 rounded-full px-2.5 py-1">
          <ShieldCheckIcon className="text-chart-1 size-3.5" />
          <Label className="text-sm font-medium">A-</Label>
        </div>
      </WidgetHeader>
      <WidgetContent className="flex-col justify-center">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square size-full max-h-60"
        >
          <RadarChart
            data={scorecardData}
            margin={{ top: 8, right: 8, bottom: 8, left: 8 }}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarGrid className="stroke-border" />
            <PolarAngleAxis
              dataKey="metric"
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            />
            <Radar
              dataKey="target"
              fill="var(--color-target)"
              fillOpacity={0.1}
              stroke="var(--color-target)"
              strokeWidth={1}
              strokeDasharray="4 4"
            />
            <Radar
              dataKey="current"
              fill="var(--color-current)"
              fillOpacity={0.45}
              stroke="var(--color-current)"
              strokeWidth={2}
            />
          </RadarChart>
        </ChartContainer>
      </WidgetContent>
      <WidgetFooter className="flex-col gap-2">
        <div className="flex w-full items-center justify-center gap-6">
          {(["current", "target"] as const).map((key) => (
            <div key={key} className="flex items-center gap-1.5">
              <div
                className={cn("size-2.5 rounded-full")}
                style={{ backgroundColor: chartConfig[key].color }}
              />
              <Label className="text-muted-foreground text-sm">
                {chartConfig[key].label}
              </Label>
            </div>
          ))}
        </div>
        <Label className="text-muted-foreground text-center text-xs font-normal">
          Composite score across 6 SLO axes · updated 4m ago
        </Label>
      </WidgetFooter>
    </Widget>
  );
}
