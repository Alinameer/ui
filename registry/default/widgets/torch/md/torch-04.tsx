"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { ActivityIcon } from "lucide-react";

import {
  Widget,
  WidgetHeader,
  WidgetContent,
  WidgetTitle,
} from "@/registry/default/ui/widget";
import { Label } from "@/registry/default/ui/label";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/default/ui/chart";

const requestsChartData = [
  { month: "January", desktop: 4210, mobile: 2840 },
  { month: "February", desktop: 5180, mobile: 3520 },
  { month: "March", desktop: 4870, mobile: 3910 },
  { month: "April", desktop: 6240, mobile: 4680 },
  { month: "May", desktop: 5930, mobile: 5210 },
  { month: "June", desktop: 7120, mobile: 6040 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--vercel-blue)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--vercel-purple)",
  },
} satisfies ChartConfig;

export default function WidgetDemo() {
  return (
    <Widget design="mumbai" size="md" className="gap-2">
      <WidgetHeader>
        <div className="flex flex-col gap-0.5">
          <WidgetTitle className="text-base">Torch Cloud Requests</WidgetTitle>
          <Label className="text-muted-foreground text-xs font-light">
            Desktop vs Mobile · last 6 months
          </Label>
        </div>
        <div className="flex items-center gap-1">
          <ActivityIcon className="stroke-productive size-4" />
          <Label className="text-productive text-sm font-medium">+18.4%</Label>
        </div>
      </WidgetHeader>
      <WidgetContent className="flex-col justify-start gap-2 overflow-hidden">
        <ChartContainer config={chartConfig} className="w-full flex-1 min-h-0">
          <AreaChart
            accessibilityLayer
            data={requestsChartData}
            margin={{ left: 0, right: 8, top: 4 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillTorchDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillTorchMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillTorchMobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillTorchDesktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
        <div className="flex w-full flex-none items-center justify-center gap-6">
          <div className="flex items-center space-x-1.5">
            <div className="bg-vercel-blue size-2.5 rounded-full" />
            <Label className="text-muted-foreground text-xs">Desktop</Label>
          </div>
          <div className="flex items-center space-x-1.5">
            <div className="bg-vercel-purple size-2.5 rounded-full" />
            <Label className="text-muted-foreground text-xs">Mobile</Label>
          </div>
        </div>
      </WidgetContent>
    </Widget>
  );
}
