"use client";

import React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ActivityIcon,
  GaugeIcon,
  ServerIcon,
  TriangleAlertIcon,
} from "lucide-react";

import {
  Widget,
  WidgetContent,
  WidgetHeader,
  WidgetTitle,
} from "@/registry/default/ui/widget";
import { Label } from "@/registry/default/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/default/ui/chart";

const rangeOptions = ["7d", "30d", "90d"] as const;
type Range = (typeof rangeOptions)[number];

const rangeLabels: Record<Range, string> = {
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  "90d": "Last 90 days",
};

type Point = { label: string; requests: number };

const chartData: Record<Range, Point[]> = {
  "7d": [
    { label: "Mon", requests: 182 },
    { label: "Tue", requests: 241 },
    { label: "Wed", requests: 209 },
    { label: "Thu", requests: 287 },
    { label: "Fri", requests: 326 },
    { label: "Sat", requests: 214 },
    { label: "Sun", requests: 198 },
  ],
  "30d": [
    { label: "W1", requests: 1342 },
    { label: "W2", requests: 1689 },
    { label: "W3", requests: 1521 },
    { label: "W4", requests: 1974 },
  ],
  "90d": [
    { label: "Jan", requests: 4218 },
    { label: "Feb", requests: 5102 },
    { label: "Mar", requests: 4876 },
    { label: "Apr", requests: 6341 },
    { label: "May", requests: 5987 },
    { label: "Jun", requests: 7129 },
  ],
};

const chartConfig = {
  requests: {
    label: "Requests",
    color: "var(--vercel-teal)",
  },
} satisfies ChartConfig;

type Stats = {
  bounce: string;
  requests: string;
  latency: string;
  errors: string;
};

const statsByRange: Record<Range, Stats> = {
  "7d": {
    bounce: "31.4%",
    requests: "1.46M",
    latency: "84 ms",
    errors: "0.12%",
  },
  "30d": {
    bounce: "29.8%",
    requests: "6.52M",
    latency: "91 ms",
    errors: "0.18%",
  },
  "90d": {
    bounce: "33.6%",
    requests: "33.6M",
    latency: "97 ms",
    errors: "0.21%",
  },
};

export default function WidgetDemo() {
  const [range, setRange] = React.useState<Range>("7d");

  const stats = statsByRange[range];

  return (
    <Widget design="mumbai" size="lg" className="gap-3">
      <WidgetHeader className="items-center">
        <div className="flex flex-col">
          <WidgetTitle className="text-xl">Torch Analytics</WidgetTitle>
          <Label className="text-muted-foreground text-xs font-light">
            Torch Cloud · Edge
          </Label>
        </div>
        <Select value={range} onValueChange={(v) => setRange(v as Range)}>
          <SelectTrigger size="sm" className="w-32">
            <SelectValue placeholder="Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {rangeOptions.map((el) => (
                <SelectItem key={el} value={el}>
                  {rangeLabels[el]}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </WidgetHeader>
      <WidgetContent className="flex-col justify-start gap-3">
        <ChartContainer className="size-full max-h-36" config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData[range]}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillRequests" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-requests)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-requests)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="requests"
              type="natural"
              fill="url(#fillRequests)"
              fillOpacity={0.4}
              stroke="var(--color-requests)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
        <div className="flex w-full flex-col">
          <StatsItem
            icon={ActivityIcon}
            label="Bounce rate"
            value={stats.bounce}
          />
          <StatsItem icon={ServerIcon} label="Requests" value={stats.requests} />
          <StatsItem
            icon={GaugeIcon}
            label="Avg latency"
            value={stats.latency}
          />
          <StatsItem
            icon={TriangleAlertIcon}
            label="Errors"
            value={stats.errors}
          />
        </div>
      </WidgetContent>
    </Widget>
  );
}

type StatsItemProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
};

function StatsItem(item: StatsItemProps) {
  return (
    <div className="flex w-full items-center justify-between border-t-2 py-2 first:border-0">
      <div className="flex items-center justify-start gap-x-2">
        <item.icon className="stroke-muted-foreground size-4" />
        <Label className="font-light">{item.label}</Label>
      </div>
      <Label className="tabular-nums">{item.value}</Label>
    </div>
  );
}
