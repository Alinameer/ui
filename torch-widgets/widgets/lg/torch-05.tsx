"use client";

import { NetworkIcon } from "lucide-react";
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

import {
  Widget,
  WidgetContent,
  WidgetFooter,
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

const topEndpoints = [
  { endpoint: "/api/v2/users", requests: 48210, fill: "var(--chart-1)" },
  { endpoint: "/api/v2/deploys", requests: 39140, fill: "var(--chart-1)" },
  { endpoint: "/api/v2/nodes", requests: 31480, fill: "var(--chart-1)" },
  { endpoint: "/api/v2/logs", requests: 26730, fill: "var(--chart-1)" },
  { endpoint: "/api/v2/metrics", requests: 20510, fill: "var(--chart-1)" },
  { endpoint: "/api/v2/billing", requests: 11820, fill: "var(--chart-1)" },
];

const totalRequests = topEndpoints.reduce((acc, el) => acc + el.requests, 0);

const chartConfig = {
  requests: {
    label: "Requests",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function WidgetDemo() {
  return (
    <Widget design="mumbai" size="lg" className="gap-3">
      <WidgetHeader>
        <WidgetTitle className="flex items-center gap-2">
          <NetworkIcon className="text-chart-1 size-5" />
          Top Endpoints by Requests
        </WidgetTitle>
        <div className="flex flex-col items-end">
          <Label className="text-base font-semibold tabular-nums">
            {(totalRequests / 1000).toFixed(1)}k
          </Label>
          <Label className="text-muted-foreground text-xs font-normal">
            total / 24h
          </Label>
        </div>
      </WidgetHeader>
      <WidgetContent className="flex-col items-stretch justify-center gap-2 overflow-hidden">
        <ChartContainer config={chartConfig} className="max-h-[260px] w-full">
          <BarChart
            accessibilityLayer
            data={topEndpoints}
            layout="vertical"
            margin={{ left: 4, right: 48, top: 0, bottom: 0 }}
          >
            <XAxis type="number" dataKey="requests" hide />
            <YAxis
              dataKey="endpoint"
              type="category"
              tickLine={false}
              axisLine={false}
              width={108}
              tickMargin={4}
              tick={{ fontSize: 11 }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="requests" radius={[0, 6, 6, 0]}>
              <LabelList
                dataKey="requests"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={11}
                formatter={(value: number) => `${(value / 1000).toFixed(1)}k`}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </WidgetContent>
      <WidgetFooter className="text-muted-foreground text-xs font-normal">
        <span>us-east-1 · /api/v2</span>
        <span className="text-productive font-medium">+9.2% vs last week</span>
      </WidgetFooter>
    </Widget>
  );
}
