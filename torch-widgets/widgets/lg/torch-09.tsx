"use client";

import * as React from "react";
import { ArrowUpRight, TargetIcon } from "lucide-react";
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
  WidgetFooter,
  WidgetHeader,
  WidgetTitle,
} from "../../components/ui/widget";
import { Label } from "../../components/ui/label";
import { ChartConfig, ChartContainer } from "../../components/ui/chart";

const chartData = [
  { week: "W1", signups: 1240, goal: 1500 },
  { week: "W2", signups: 1680, goal: 1500 },
  { week: "W3", signups: 1420, goal: 1600 },
  { week: "W4", signups: 1910, goal: 1600 },
  { week: "W5", signups: 1760, goal: 1700 },
  { week: "W6", signups: 2240, goal: 1700 },
  { week: "W7", signups: 2080, goal: 1800 },
  { week: "W8", signups: 2510, goal: 1800 },
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

const totalSignups = chartData.reduce((acc, d) => acc + d.signups, 0);

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
    <Widget design="mumbai" size="lg" className="gap-2">
      <WidgetHeader className="items-start justify-between">
        <div className="flex flex-col gap-0.5">
          <WidgetTitle className="flex items-center gap-1.5 text-base">
            <TargetIcon className="text-chart-1 size-4" />
            Signups vs Goal
          </WidgetTitle>
          <Label className="text-muted-foreground text-xs font-normal">
            Torch Cloud · {active.week} of last 8 weeks
          </Label>
        </div>
        <div className="flex flex-col items-end gap-0.5">
          <span className="text-foreground text-2xl font-bold tabular-nums">
            {active.signups.toLocaleString()}
          </span>
          <span className="text-productive flex items-center text-xs font-medium tabular-nums">
            <ArrowUpRight className="size-3" />
            {attainment}% of goal
          </span>
        </div>
      </WidgetHeader>
      <WidgetContent className="min-h-0 items-stretch overflow-hidden p-0">
        <ChartContainer config={chartConfig} className="size-full">
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
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={11}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={32}
              fontSize={11}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip
              cursor={false}
              content={() => null}
              wrapperStyle={{ display: "none" }}
            />
            <Bar dataKey="signups" radius={[5, 5, 0, 0]} maxBarSize={32}>
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
              strokeDasharray="4 4"
              label={<TracePill value={active.signups} />}
              ifOverflow="extendDomain"
            />
          </BarChart>
        </ChartContainer>
      </WidgetContent>
      <WidgetFooter className="flex-none items-center justify-between border-t pt-2">
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
            <span
              className="size-2 rounded-[2px]"
              style={{ backgroundColor: "var(--color-signups)" }}
            />
            Signups
          </span>
          <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
            <span
              className="h-0.5 w-3 rounded-full"
              style={{ backgroundColor: "var(--color-goal)" }}
            />
            Goal
          </span>
        </div>
        <Label className="text-foreground text-xs font-medium tabular-nums">
          {totalSignups.toLocaleString()} total · hover to inspect
        </Label>
      </WidgetFooter>
    </Widget>
  );
}
