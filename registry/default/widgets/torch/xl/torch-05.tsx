"use client";

import { Treemap } from "recharts";
import { LayersIcon, TrendingUpIcon } from "lucide-react";

import {
  Widget,
  WidgetContent,
  WidgetHeader,
  WidgetTitle,
} from "@/registry/default/ui/widget";
import { Label } from "@/registry/default/ui/label";
import { ChartConfig, ChartContainer } from "@/registry/default/ui/chart";

type Service = {
  name: string;
  size: number;
  fill: string;
  region: string;
};

const allocation: Service[] = [
  { name: "Compute", size: 38400, fill: "var(--chart-1)", region: "us-east-1" },
  { name: "Storage", size: 21600, fill: "var(--chart-2)", region: "us-west-2" },
  {
    name: "Networking",
    size: 16200,
    fill: "var(--vercel-purple)",
    region: "eu-west-1",
  },
  {
    name: "Edge CDN",
    size: 12800,
    fill: "var(--chart-3)",
    region: "global",
  },
  {
    name: "Postgres",
    size: 9400,
    fill: "var(--vercel-blue)",
    region: "us-east-1",
  },
  {
    name: "Observability",
    size: 7300,
    fill: "var(--chart-4)",
    region: "us-east-1",
  },
  {
    name: "Queue",
    size: 5100,
    fill: "var(--vercel-teal)",
    region: "ap-south-1",
  },
  {
    name: "AI Inference",
    size: 4200,
    fill: "var(--vercel-pink)",
    region: "us-west-2",
  },
];

const chartConfig = {
  size: {
    label: "Spend",
  },
} satisfies ChartConfig;

const totalSpend = allocation.reduce((acc, s) => acc + s.size, 0);

const formatUsd = (value: number) =>
  value >= 1000 ? `$${(value / 1000).toFixed(1)}k` : `$${value}`;

type TreemapCellProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  name?: string;
  size?: number;
  fill?: string;
};

function TreemapCell({
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  name = "",
  size = 0,
  fill = "var(--chart-1)",
}: TreemapCellProps) {
  const showLabel = width > 56 && height > 30;
  const showValue = width > 70 && height > 46;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={8}
        ry={8}
        fill={fill}
        fillOpacity={0.9}
        stroke="var(--background)"
        strokeWidth={3}
      />
      {showLabel ? (
        <text
          x={x + 10}
          y={y + 20}
          fill="var(--background)"
          className="text-[11px] font-semibold"
        >
          {name}
        </text>
      ) : null}
      {showValue ? (
        <text
          x={x + 10}
          y={y + 36}
          fill="var(--background)"
          fillOpacity={0.85}
          className="text-[10px] tabular-nums"
        >
          {formatUsd(size)}
        </text>
      ) : null}
    </g>
  );
}

export default function WidgetDemo() {
  return (
    <Widget design="mumbai" size="xl" className="gap-4">
      <WidgetHeader className="items-center">
        <div className="flex items-center gap-2">
          <LayersIcon className="text-vercel-blue size-5" />
          <div className="flex flex-col gap-0.5">
            <WidgetTitle className="text-base">Resource Allocation</WidgetTitle>
            <Label className="text-muted-foreground text-xs font-light">
              Torch Cloud · monthly spend by service
            </Label>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <Label className="text-foreground text-xl leading-none font-semibold tabular-nums">
            {formatUsd(totalSpend)}
          </Label>
          <div className="text-productive mt-1 flex items-center gap-1 text-xs font-medium">
            <TrendingUpIcon className="size-3" />
            <span className="tabular-nums">+9.2% MoM</span>
          </div>
        </div>
      </WidgetHeader>
      <WidgetContent className="items-stretch gap-4 overflow-hidden">
        <div className="flex w-56 flex-none flex-col gap-1.5 overflow-hidden">
          <Label className="text-muted-foreground text-[10px] font-medium tracking-wide uppercase">
            Top services
          </Label>
          <div className="flex flex-1 flex-col justify-between gap-1">
            {allocation.slice(0, 6).map((s) => {
              const pct = Math.round((s.size / totalSpend) * 100);
              return (
                <div
                  key={s.name}
                  className="flex items-center gap-2.5 rounded-xl border px-2.5 py-1.5"
                >
                  <span
                    className="size-2.5 flex-none rounded-[3px]"
                    style={{ backgroundColor: s.fill }}
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="text-foreground truncate text-xs font-medium">
                      {s.name}
                    </span>
                    <span className="text-muted-foreground truncate font-mono text-[10px]">
                      {s.region}
                    </span>
                  </div>
                  <div className="flex flex-none flex-col items-end">
                    <span className="text-foreground font-mono text-xs tabular-nums">
                      {formatUsd(s.size)}
                    </span>
                    <span className="text-muted-foreground text-[10px] tabular-nums">
                      {pct}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="relative flex-1 overflow-hidden rounded-2xl">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-full max-h-[280px] w-full"
          >
            <Treemap
              data={allocation}
              dataKey="size"
              nameKey="name"
              aspectRatio={4 / 3}
              isAnimationActive={false}
              content={<TreemapCell />}
            />
          </ChartContainer>
        </div>
      </WidgetContent>
    </Widget>
  );
}
