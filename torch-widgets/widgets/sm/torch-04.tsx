"use client";

import { Bar, BarChart, XAxis } from "recharts";

import {
  Widget,
  WidgetHeader,
  WidgetContent,
  WidgetTitle,
} from "../../components/ui/widget";
import { Label } from "../../components/ui/label";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart";

const deploysChartData = [
  { day: "Mon", initial: "M", deploys: 8 },
  { day: "Tue", initial: "T", deploys: 14 },
  { day: "Wed", initial: "W", deploys: 11 },
  { day: "Thu", initial: "T", deploys: 19 },
  { day: "Fri", initial: "F", deploys: 23 },
  { day: "Sat", initial: "S", deploys: 6 },
  { day: "Sun", initial: "S", deploys: 4 },
];

const weeklyTotal = deploysChartData.reduce((sum, el) => sum + el.deploys, 0);

const chartConfig = {
  deploys: {
    label: "Deploys",
    color: "var(--vercel-blue)",
  },
} satisfies ChartConfig;

export default function WidgetDemo() {
  return (
    <Widget design="mumbai" size="sm" className="gap-2">
      <WidgetHeader className="flex-col items-start gap-0.5">
        <Label className="text-muted-foreground text-xs">
          Torch Cloud Deploys
        </Label>
        <div className="flex items-baseline gap-1.5">
          <WidgetTitle className="text-2xl">{weeklyTotal}</WidgetTitle>
          <Label className="text-muted-foreground text-xs">this week</Label>
        </div>
      </WidgetHeader>
      <WidgetContent className="items-end justify-center">
        <ChartContainer config={chartConfig} className="size-full max-h-28">
          <BarChart
            accessibilityLayer
            data={deploysChartData}
            margin={{ top: 4, left: 0, right: 0, bottom: 0 }}
          >
            <XAxis
              dataKey="initial"
              tickLine={false}
              axisLine={false}
              tickMargin={6}
              fontSize={11}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideIndicator
                  labelFormatter={(_, payload) => payload?.[0]?.payload.day}
                />
              }
            />
            <Bar dataKey="deploys" fill="var(--color-deploys)" radius={4} />
          </BarChart>
        </ChartContainer>
      </WidgetContent>
    </Widget>
  );
}
