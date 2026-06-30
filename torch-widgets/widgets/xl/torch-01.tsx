"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";
import { TrendingUpIcon, TrendingDownIcon, GaugeIcon } from "lucide-react";

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

const revenueData = [
  { month: "January", revenue: 412, forecast: 430 },
  { month: "February", revenue: 468, forecast: 455 },
  { month: "March", revenue: 521, forecast: 498 },
  { month: "April", revenue: 564, forecast: 540 },
  { month: "May", revenue: 602, forecast: 588 },
  { month: "June", revenue: 658, forecast: 631 },
  { month: "July", revenue: 631, forecast: 674 },
  { month: "August", revenue: 712, forecast: 705 },
  { month: "September", revenue: 768, forecast: 742 },
  { month: "October", revenue: 824, forecast: 796 },
  { month: "November", revenue: 879, forecast: 851 },
  { month: "December", revenue: 942, forecast: 905 },
];

const chartConfig = {
  revenue: {
    label: "Actual Revenue",
    color: "var(--chart-1)",
  },
  forecast: {
    label: "Forecast",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

type Kpi = {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
};

const kpis: Kpi[] = [
  {
    label: "Total Revenue",
    value: "$7.98M",
    delta: "+14.2%",
    trend: "up",
  },
  {
    label: "Forecast",
    value: "$7.81M",
    delta: "+11.6%",
    trend: "up",
  },
  {
    label: "Variance",
    value: "+$172k",
    delta: "+2.2%",
    trend: "up",
  },
];

export default function WidgetDemo() {
  return (
    <Widget design="mumbai" size="xl" className="gap-4">
      <WidgetHeader className="items-center">
        <div className="flex items-center gap-2">
          <GaugeIcon className="text-vercel-blue size-5" />
          <WidgetTitle>Revenue Performance</WidgetTitle>
        </div>
        <Label className="text-muted-foreground text-xs tracking-wide uppercase">
          Torch Cloud · FY2026
        </Label>
      </WidgetHeader>
      <WidgetContent className="items-stretch gap-5 overflow-hidden">
        <div className="flex w-48 flex-none flex-col justify-between gap-3">
          {kpis.map((kpi, index) => {
            const TrendIcon =
              kpi.trend === "up" ? TrendingUpIcon : TrendingDownIcon;
            return (
              <div key={kpi.label} className="flex flex-col gap-1">
                <div className="flex flex-col gap-1.5">
                  <Label className="text-muted-foreground text-xs">
                    {kpi.label}
                  </Label>
                  <p className="text-foreground text-3xl leading-none font-semibold tabular-nums">
                    {kpi.value}
                  </p>
                  <div
                    className={cn(
                      "flex items-center gap-1 text-xs font-medium",
                      kpi.trend === "up"
                        ? "text-productive"
                        : "text-destructive",
                    )}
                  >
                    <TrendIcon className="size-3" />
                    <span className="tabular-nums">{kpi.delta}</span>
                    <span className="text-muted-foreground font-normal">
                      vs plan
                    </span>
                  </div>
                </div>
                {index < kpis.length - 1 && <Separator className="mt-2" />}
              </div>
            );
          })}
          <div className="flex items-center gap-4 pt-1">
            <div className="flex items-center gap-1.5">
              <span className="bg-chart-1 size-2.5 rounded-full" />
              <Label className="text-muted-foreground text-xs">Actual</Label>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="bg-chart-3 size-2.5 rounded-full" />
              <Label className="text-muted-foreground text-xs">Forecast</Label>
            </div>
          </div>
        </div>
        <Separator orientation="vertical" className="h-full" />
        <div className="flex flex-1 flex-col justify-center">
          <ChartContainer
            config={chartConfig}
            className="max-h-[260px] w-full"
          >
            <ComposedChart
              accessibilityLayer
              data={revenueData}
              margin={{ left: 4, right: 12, top: 8, bottom: 0 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                width={40}
                tickFormatter={(value) => `$${value}k`}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    formatter={(value, name) => (
                      <div className="flex w-full items-center justify-between gap-3">
                        <span className="text-muted-foreground">
                          {chartConfig[name as keyof typeof chartConfig]?.label}
                        </span>
                        <span className="text-foreground font-mono font-medium tabular-nums">
                          ${value}k
                        </span>
                      </div>
                    )}
                  />
                }
              />
              <Bar
                dataKey="revenue"
                fill="var(--color-revenue)"
                radius={[6, 6, 0, 0]}
                maxBarSize={28}
              />
              <Line
                dataKey="forecast"
                type="monotone"
                stroke="var(--color-forecast)"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </ComposedChart>
          </ChartContainer>
        </div>
      </WidgetContent>
    </Widget>
  );
}
