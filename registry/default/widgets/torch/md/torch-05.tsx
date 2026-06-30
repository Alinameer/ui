"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  Tooltip,
  XAxis,
} from "recharts";

import {
  Widget,
  WidgetContent,
  WidgetHeader,
  WidgetTitle,
} from "@/registry/default/ui/widget";
import {
  ChartConfig,
  ChartContainer,
} from "@/registry/default/ui/chart";

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

// label pill that sits at the left end of the trace line
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
  const w = text.length * 7 + 12;
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        x={0}
        y={-9}
        width={w}
        height={18}
        rx={4}
        className="fill-foreground"
      />
      <text
        x={w / 2}
        y={1}
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-background text-[10px] font-medium tabular-nums"
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

  return (
    <Widget design="mumbai" size="md" className="gap-2">
      <WidgetHeader className="items-start justify-between">
        <div className="flex flex-col gap-0.5">
          <WidgetTitle className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            Signups vs Goal
          </WidgetTitle>
          <div className="flex items-baseline gap-2">
            <span className="text-foreground text-2xl font-bold tabular-nums">
              {active.signups.toLocaleString()}
            </span>
            <span className="text-productive flex items-center text-xs font-medium tabular-nums">
              <ArrowUpRight className="size-3" />
              {Math.round(((active.signups - active.goal) / active.goal) * 100)}%
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-0.5 pt-1">
          <span className="text-muted-foreground text-[10px] tracking-wide uppercase">
            Week
          </span>
          <span className="text-foreground text-sm font-semibold">
            {active.week}
          </span>
        </div>
      </WidgetHeader>
      <WidgetContent className="items-stretch overflow-hidden p-0">
        <ChartContainer config={chartConfig} className="h-full max-h-28 w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 4, right: 4, left: 4, bottom: 0 }}
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
              tickMargin={6}
              fontSize={10}
            />
            {/* invisible tooltip drives Recharts' active-index tracking on hover */}
            <Tooltip
              cursor={false}
              content={() => null}
              wrapperStyle={{ display: "none" }}
            />
            <Bar dataKey="signups" radius={[4, 4, 0, 0]} maxBarSize={28}>
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
    </Widget>
  );
}
