"use client";

import { Activity } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Widget,
  WidgetContent,
  WidgetHeader,
  WidgetTitle,
} from "@/registry/default/ui/widget";
import { ChartConfig, ChartContainer } from "@/registry/default/ui/chart";

const uptime = 99.2;

const chartData = [
  { metric: "uptime", value: uptime, fill: "var(--color-uptime)" },
];

const chartConfig = {
  value: {
    label: "Uptime",
  },
  uptime: {
    label: "Uptime",
    color: "var(--productive)",
  },
} satisfies ChartConfig;

const endAngle = 90 - (uptime / 100) * 360;

export default function WidgetDemo() {
  return (
    <Widget design="mumbai" size="sm" className="gap-2">
      <WidgetHeader className="items-center gap-2">
        <div className="flex items-center gap-1.5">
          <Activity className="text-productive size-4" />
          <WidgetTitle className="text-sm">Torch Cloud</WidgetTitle>
        </div>
        <span className="bg-secondary rounded-md px-1.5 py-0.5 text-[10px] font-medium tracking-wide uppercase">
          SLA
        </span>
      </WidgetHeader>
      <WidgetContent className="relative">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square size-full max-h-[150px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={endAngle}
            innerRadius={56}
            outerRadius={78}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[62, 50]}
            />
            <RadialBar dataKey="value" background cornerRadius={12} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
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
                          y={(viewBox.cy || 0) - 8}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {uptime.toFixed(1)}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 14}
                          className="fill-muted-foreground text-xs"
                        >
                          30-day uptime
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </WidgetContent>
    </Widget>
  );
}
