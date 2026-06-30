"use client";

import * as React from "react";
import { ArrowUpRight, ArrowDownRight, TargetIcon } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Widget,
  WidgetContent,
  WidgetHeader,
  WidgetTitle,
} from "@/registry/default/ui/widget";
import { Label } from "@/registry/default/ui/label";
import { cn } from "@/registry/default/lib/utils";
import { ChartConfig, ChartContainer } from "@/registry/default/ui/chart";

const chartData = [
  { month: "Jan", signups: 4820, goal: 5000 },
  { month: "Feb", signups: 5310, goal: 5000 },
  { month: "Mar", signups: 4970, goal: 5200 },
  { month: "Apr", signups: 6240, goal: 5200 },
  { month: "May", signups: 5930, goal: 5500 },
  { month: "Jun", signups: 7120, goal: 5500 },
  { month: "Jul", signups: 6840, goal: 6000 },
  { month: "Aug", signups: 7680, goal: 6000 },
  { month: "Sep", signups: 7240, goal: 6500 },
  { month: "Oct", signups: 8410, goal: 6500 },
  { month: "Nov", signups: 8020, goal: 7000 },
  { month: "Dec", signups: 9180, goal: 7000 },
];

const chartConfig = {
  signups: {
    label: "Signups",
    color: "var(--chart-1)",
  },
  goal: {
    label: "Goal",
    color: "var(--vercel-yellow)",
  },
} satisfies ChartConfig;

const last = chartData[chartData.length - 1];
const goalAttainment = Math.round((last.signups / last.goal) * 100);

type Kpi = {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
};

const kpis: Kpi[] = [
  { label: "Total signups", value: "83.8k", delta: "+18.4%", trend: "up" },
  { label: "Best month", value: "9,180", delta: "Dec", trend: "up" },
  { label: "Goal attainment", value: `${goalAttainment}%`, delta: "+12pt", trend: "up" },
  { label: "Avg / month", value: "6,983", delta: "-2.1%", trend: "down" },
];

function TracePill({
  viewBox,
  value,
}: {
  viewBox?: { x?: number; y?: number };
  value: number;
}) {
  const x = viewBox?.x ?? 0;
  const y = viewBox?.y ?? 0;
  const text = value.toLocaleString();
  const w = text.length * 7.5 + 14;
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x={0} y={-10} width={w} height={20} rx={5} className="fill-foreground" />
      <text
        x={w / 2}
        y={1}
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-background text-[11px] font-medium tabular-nums"
      >
        {text}
      </text>
    </g>
  );
}

export default function WidgetDemo() {
  const lastIndex = chartData.length - 1;
  const [activeIndex, setActiveIndex] = React.useState(lastIndex);
  const active = chartData[activeIndex];
  const attainment = Math.round((active.signups / active.goal) * 100);

  return (
    <Widget design="mumbai" size="xl" className="gap-3">
      <WidgetHeader className="items-start justify-between">
        <div className="flex flex-col gap-0.5">
          <WidgetTitle className="flex items-center gap-2 text-base">
            <TargetIcon className="text-chart-1 size-4" />
            Signups vs Goal
          </WidgetTitle>
          <Label className="text-muted-foreground text-xs font-normal">
            Torch Cloud · FY2026 · {active.month}: {active.signups.toLocaleString()} signups ·{" "}
            {attainment}% of goal
          </Label>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
            <span
              className="size-2.5 rounded-[2px]"
              style={{ backgroundColor: "var(--color-signups)" }}
            />
            Signups
          </span>
          <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
            <span
              className="h-0.5 w-3.5 rounded-full"
              style={{ backgroundColor: "var(--color-goal)" }}
            />
            Goal
          </span>
        </div>
      </WidgetHeader>
      <WidgetContent className="min-h-0 items-stretch justify-between gap-4 overflow-hidden">
        <div className="flex w-48 flex-none flex-col justify-between gap-2 py-1">
          {kpis.map((kpi) => {
            const TrendIcon = kpi.trend === "up" ? ArrowUpRight : ArrowDownRight;
            return (
              <div
                key={kpi.label}
                className="bg-secondary flex flex-1 flex-col justify-center gap-0.5 rounded-2xl px-3 py-2"
              >
                <Label className="text-muted-foreground text-[11px]">
                  {kpi.label}
                </Label>
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-foreground text-xl leading-none font-semibold tabular-nums">
                    {kpi.value}
                  </p>
                  <span
                    className={cn(
                      "flex items-center gap-0.5 text-[11px] font-medium tabular-nums",
                      kpi.trend === "up"
                        ? "text-productive"
                        : "text-destructive",
                    )}
                  >
                    <TrendIcon className="size-3" />
                    {kpi.delta}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <ChartContainer config={chartConfig} className="min-h-0 flex-1">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 12, right: 8, left: 0, bottom: 0 }}
            onMouseMove={(state) => {
              if (typeof state?.activeTooltipIndex === "number") {
                setActiveIndex(state.activeTooltipIndex);
              }
            }}
            onMouseLeave={() => setActiveIndex(lastIndex)}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={11}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={36}
              fontSize={11}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip
              cursor={false}
              content={() => null}
              wrapperStyle={{ display: "none" }}
            />
            <Bar dataKey="signups" radius={[5, 5, 0, 0]} maxBarSize={34}>
              {chartData.map((_, i) => (
                <Cell
                  key={i}
                  fill="var(--color-signups)"
                  fillOpacity={i === activeIndex ? 1 : 0.35}
                />
              ))}
            </Bar>
            {/* rendered after Bar so the trace line + pill paint on top */}
            <ReferenceLine
              y={active.signups}
              stroke="var(--color-goal)"
              strokeWidth={1.5}
              strokeDasharray="5 5"
              label={<TracePill value={active.signups} />}
              ifOverflow="extendDomain"
            />
          </BarChart>
        </ChartContainer>
      </WidgetContent>
    </Widget>
  );
}
