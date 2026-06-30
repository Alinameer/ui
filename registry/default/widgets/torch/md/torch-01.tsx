"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { TrendingUpIcon } from "lucide-react";

import {
  Widget,
  WidgetContent,
  WidgetHeader,
  WidgetTitle,
} from "@/registry/default/ui/widget";
import { Label } from "@/registry/default/ui/label";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/default/ui/chart";

const chartData = [
  { month: "January", revenue: 184200 },
  { month: "February", revenue: 201800 },
  { month: "March", revenue: 226400 },
  { month: "April", revenue: 213900 },
  { month: "May", revenue: 248700 },
  { month: "June", revenue: 271300 },
  { month: "July", revenue: 264100 },
  { month: "August", revenue: 298600 },
  { month: "September", revenue: 312400 },
  { month: "October", revenue: 305700 },
  { month: "November", revenue: 341200 },
  { month: "December", revenue: 372900 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--productive)",
  },
} satisfies ChartConfig;

export default function WidgetDemo() {
  return (
    <Widget design="mumbai" size="md" className="gap-2">
      <WidgetHeader className="items-start">
        <div className="flex flex-col gap-1">
          <Label className="text-muted-foreground text-xs tracking-wide uppercase">
            Torch Cloud · Revenue
          </Label>
          <WidgetTitle className="text-2xl tracking-tight">
            $372.9K
          </WidgetTitle>
        </div>
        <div className="text-productive flex items-center gap-1 text-sm font-medium">
          <TrendingUpIcon className="size-4" />
          +12.4%
        </div>
      </WidgetHeader>
      <WidgetContent className="items-end justify-start overflow-hidden">
        <ChartContainer config={chartConfig} className="size-full max-h-32 w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 4,
              right: 4,
              top: 4,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value) => `$${Number(value).toLocaleString()}`}
                  indicator="dot"
                />
              }
            />
            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="revenue"
              type="natural"
              fill="url(#fillRevenue)"
              fillOpacity={0.4}
              stroke="var(--color-revenue)"
              strokeWidth={2}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </WidgetContent>
    </Widget>
  );
}
