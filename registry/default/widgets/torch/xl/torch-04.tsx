"use client";

import {
  CartesianGrid,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { GaugeIcon, ZapIcon } from "lucide-react";

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
import { Separator } from "@/registry/default/ui/separator";

type Service = {
  service: string;
  region: string;
  cost: number;
  rps: number;
  team: number;
  fill: string;
};

const services: Service[] = [
  {
    service: "api-gateway",
    region: "us-east-1",
    cost: 1840,
    rps: 9200,
    team: 6,
    fill: "var(--chart-1)",
  },
  {
    service: "auth-service",
    region: "us-east-1",
    cost: 720,
    rps: 6400,
    team: 4,
    fill: "var(--chart-2)",
  },
  {
    service: "edge-cache",
    region: "eu-west-1",
    cost: 480,
    rps: 11800,
    team: 3,
    fill: "var(--chart-3)",
  },
  {
    service: "billing-worker",
    region: "us-west-2",
    cost: 2640,
    rps: 2100,
    team: 8,
    fill: "var(--chart-4)",
  },
  {
    service: "search-index",
    region: "eu-central-1",
    cost: 1960,
    rps: 5300,
    team: 5,
    fill: "var(--chart-5)",
  },
  {
    service: "media-encoder",
    region: "us-west-2",
    cost: 3120,
    rps: 1480,
    team: 7,
    fill: "var(--vercel-purple)",
  },
  {
    service: "notify-queue",
    region: "ap-south-1",
    cost: 540,
    rps: 4200,
    team: 2,
    fill: "var(--vercel-teal)",
  },
  {
    service: "metrics-agg",
    region: "us-east-1",
    cost: 1280,
    rps: 7600,
    team: 4,
    fill: "var(--vercel-pink)",
  },
  {
    service: "deploy-runner",
    region: "us-west-2",
    cost: 980,
    rps: 3400,
    team: 5,
    fill: "var(--vercel-yellow)",
  },
];

const chartConfig = {
  rps: {
    label: "Requests / s",
    color: "var(--chart-1)",
  },
  cost: {
    label: "Cost / mo",
    color: "var(--chart-2)",
  },
  team: {
    label: "Team size",
  },
} satisfies ChartConfig;

const topEfficiency = [...services]
  .map((s) => ({ ...s, efficiency: s.rps / s.cost }))
  .sort((a, b) => b.efficiency - a.efficiency)
  .slice(0, 3);

export default function WidgetDemo() {
  return (
    <Widget design="mumbai" size="xl" className="gap-3">
      <WidgetHeader className="items-center">
        <div className="flex items-center gap-2">
          <GaugeIcon className="text-vercel-blue size-5" />
          <div className="flex flex-col gap-0.5">
            <WidgetTitle>Cost vs Performance</WidgetTitle>
            <Label className="text-muted-foreground text-xs font-light">
              Torch Cloud · per-service spend vs throughput
            </Label>
          </div>
        </div>
        <Label className="text-muted-foreground text-xs tracking-wide uppercase">
          9 services
        </Label>
      </WidgetHeader>
      <WidgetContent className="items-stretch gap-4 overflow-hidden">
        <div className="min-w-0 flex-1">
          <ChartContainer
            config={chartConfig}
            className="size-full max-h-[280px]"
          >
            <ScatterChart
              accessibilityLayer
              margin={{ left: 4, right: 12, top: 8, bottom: 4 }}
            >
              <CartesianGrid />
              <XAxis
                type="number"
                dataKey="cost"
                name="Cost"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
              />
              <YAxis
                type="number"
                dataKey="rps"
                name="Requests"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                width={40}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <ZAxis type="number" dataKey="team" range={[120, 720]} />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    nameKey="service"
                    labelKey="service"
                    formatter={(value, name, item) => (
                      <div className="flex w-full min-w-36 flex-col gap-1">
                        <span className="text-foreground font-medium">
                          {item.payload.service}
                        </span>
                        <div className="text-muted-foreground flex items-center justify-between gap-4">
                          <span>{item.payload.region}</span>
                          <span className="text-foreground font-mono tabular-nums">
                            {item.payload.team} eng
                          </span>
                        </div>
                        <div className="text-muted-foreground flex items-center justify-between gap-4">
                          <span>Cost / mo</span>
                          <span className="text-foreground font-mono tabular-nums">
                            ${item.payload.cost.toLocaleString()}
                          </span>
                        </div>
                        <div className="text-muted-foreground flex items-center justify-between gap-4">
                          <span>Requests / s</span>
                          <span className="text-foreground font-mono tabular-nums">
                            {item.payload.rps.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )}
                  />
                }
              />
              <Scatter data={services} fillOpacity={0.7} />
            </ScatterChart>
          </ChartContainer>
        </div>
        <Separator orientation="vertical" className="h-auto" />
        <div className="flex w-52 flex-none flex-col gap-3">
          <div className="flex items-center gap-1.5">
            <ZapIcon className="text-productive size-4" />
            <Label className="text-sm font-medium">Top efficiency</Label>
          </div>
          <div className="flex flex-col gap-2">
            {topEfficiency.map((s) => (
              <div
                key={s.service}
                className="bg-secondary flex items-center gap-2.5 rounded-2xl px-3 py-2"
              >
                <span
                  className="size-2.5 flex-none rounded-full"
                  style={{ backgroundColor: s.fill }}
                />
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="text-foreground truncate font-mono text-xs">
                    {s.service}
                  </span>
                  <span className="text-muted-foreground text-[10px]">
                    {s.region}
                  </span>
                </div>
                <div className="flex flex-none flex-col items-end">
                  <span className="text-foreground font-mono text-xs tabular-nums">
                    {s.efficiency.toFixed(1)}
                  </span>
                  <span className="text-muted-foreground text-[10px]">
                    rps/$
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Separator />
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground text-[10px] tracking-wide uppercase">
              Legend
            </Label>
            <div className="text-muted-foreground flex items-center justify-between text-xs">
              <span>X · cost / mo</span>
              <span className="text-foreground font-mono tabular-nums">
                $0–3.2k
              </span>
            </div>
            <div className="text-muted-foreground flex items-center justify-between text-xs">
              <span>Y · requests / s</span>
              <span className="text-foreground font-mono tabular-nums">
                0–12k
              </span>
            </div>
            <div className="text-muted-foreground flex items-center gap-2 text-xs">
              <span className="bg-muted-foreground/40 size-2 rounded-full" />
              <span className="bg-muted-foreground/40 size-3.5 rounded-full" />
              <span>bubble · team size</span>
            </div>
          </div>
        </div>
      </WidgetContent>
    </Widget>
  );
}
