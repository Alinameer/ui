"use client";

import * as React from "react";
import { DownloadIcon, FlameIcon } from "lucide-react";
import { Label as RechartsLabel, Pie, PieChart } from "recharts";

import {
  Widget,
  WidgetHeader,
  WidgetContent,
  WidgetTitle,
  WidgetFooter,
} from "@/registry/default/ui/widget";
import { Label } from "@/registry/default/ui/label";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/default/ui/chart";
import { Button } from "@/registry/default/ui/button";

const trafficSourceChartData = [
  { source: "organic", requests: 18420, fill: "var(--color-organic)" },
  { source: "api", requests: 12680, fill: "var(--color-api)" },
  { source: "referral", requests: 7340, fill: "var(--color-referral)" },
  { source: "direct", requests: 4910, fill: "var(--color-direct)" },
];

const chartConfig = {
  requests: {
    label: "Requests",
  },
  organic: {
    label: "Organic",
    color: "var(--vercel-purple)",
  },
  api: {
    label: "API",
    color: "var(--vercel-blue)",
  },
  referral: {
    label: "Referral",
    color: "var(--vercel-teal)",
  },
  direct: {
    label: "Direct",
    color: "var(--vercel-pink)",
  },
} satisfies ChartConfig;

const legendItems = [
  { key: "organic", label: "Organic", dot: "bg-vercel-purple" },
  { key: "api", label: "API", dot: "bg-vercel-blue" },
  { key: "referral", label: "Referral", dot: "bg-vercel-teal" },
  { key: "direct", label: "Direct", dot: "bg-vercel-pink" },
];

export default function WidgetDemo() {
  const totalRequests = React.useMemo(
    () => trafficSourceChartData.reduce((acc, cur) => acc + cur.requests, 0),
    [],
  );

  return (
    <Widget design="mumbai" size="lg" className="gap-2">
      <WidgetHeader>
        <div className="flex items-center gap-2">
          <div className="bg-vercel-purple/10 flex size-8 items-center justify-center rounded-lg">
            <FlameIcon className="fill-vercel-purple stroke-vercel-purple size-4" />
          </div>
          <div className="flex flex-col">
            <WidgetTitle className="text-base">Traffic Source</WidgetTitle>
            <Label className="text-muted-foreground text-xs">
              TORCH Cloud · 24h
            </Label>
          </div>
        </div>
        <span className="bg-productive/10 text-productive rounded-full px-2 py-0.5 text-xs font-medium">
          +8.2%
        </span>
      </WidgetHeader>
      <WidgetContent className="flex-col justify-center">
        <ChartContainer
          config={chartConfig}
          className="aspect-square size-full max-h-48"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={trafficSourceChartData}
              dataKey="requests"
              nameKey="source"
              innerRadius={64}
              outerRadius={88}
              strokeWidth={4}
              paddingAngle={2}
            >
              <RechartsLabel
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalRequests.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 22}
                          className="fill-muted-foreground text-xs"
                        >
                          Requests
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </WidgetContent>
      <WidgetFooter className="flex flex-col gap-3">
        <div className="grid w-full grid-cols-2 gap-x-6 gap-y-2">
          {legendItems.map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-1.5">
                <div className={`size-2.5 rounded-full ${item.dot}`} />
                <Label className="text-muted-foreground text-sm">
                  {item.label}
                </Label>
              </div>
              <span className="text-foreground font-mono text-sm tabular-nums">
                {trafficSourceChartData
                  .find((d) => d.source === item.key)
                  ?.requests.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
        <Button className="w-full" variant="outline">
          <DownloadIcon /> Export
        </Button>
      </WidgetFooter>
    </Widget>
  );
}
