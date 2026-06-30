"use client";

import { ActivityIcon, TrendingUpIcon } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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

const chartData = [
  { day: "Mon", thisWeek: 4200, lastWeek: 3600 },
  { day: "Tue", thisWeek: 5100, lastWeek: 4800 },
  { day: "Wed", thisWeek: 4800, lastWeek: 5200 },
  { day: "Thu", thisWeek: 6300, lastWeek: 5400 },
  { day: "Fri", thisWeek: 7100, lastWeek: 6100 },
  { day: "Sat", thisWeek: 5600, lastWeek: 5900 },
  { day: "Sun", thisWeek: 4900, lastWeek: 4300 },
];

const chartConfig = {
  thisWeek: {
    label: "This week",
    color: "var(--chart-1)",
  },
  lastWeek: {
    label: "Last week",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export default function WidgetDemo() {
  return (
    <Widget design="mumbai" size="md" className="gap-2">
      <WidgetHeader className="items-center">
        <WidgetTitle className="flex items-center gap-2">
          <ActivityIcon className="size-4" />
          <Label className="text-base font-semibold">Torch Throughput</Label>
        </WidgetTitle>
        <div className="text-productive flex items-center gap-1 text-sm font-medium">
          <TrendingUpIcon className="size-4" />
          <span className="tabular-nums">+12.4%</span>
        </div>
      </WidgetHeader>
      <WidgetContent className="flex-col items-stretch justify-between gap-2 overflow-hidden">
        <div className="flex flex-none items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="bg-chart-1 size-2.5 rounded-full" />
            <Label className="text-muted-foreground text-xs">This week</Label>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="bg-chart-3 size-2.5 rounded-full" />
            <Label className="text-muted-foreground text-xs">Last week</Label>
          </div>
          <Label className="text-muted-foreground ml-auto text-xs">
            req/s by day
          </Label>
        </div>
        <ChartContainer config={chartConfig} className="min-h-0 w-full flex-1">
          <BarChart accessibilityLayer data={chartData} barGap={3}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar
              dataKey="thisWeek"
              fill="var(--color-thisWeek)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="lastWeek"
              fill="var(--color-lastWeek)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </WidgetContent>
    </Widget>
  );
}
