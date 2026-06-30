"use client";

import { CpuIcon, HardDriveIcon, MemoryStickIcon } from "lucide-react";
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";

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
import { Separator } from "../../components/ui/separator";

const chartData = [
  {
    metric: "usage",
    cpu: 73,
    memory: 61,
    disk: 48,
  },
];

const chartConfig = {
  cpu: {
    label: "CPU",
    color: "var(--chart-1)",
  },
  memory: {
    label: "Memory",
    color: "var(--vercel-purple)",
  },
  disk: {
    label: "Disk",
    color: "var(--vercel-teal)",
  },
} satisfies ChartConfig;

const legend = [
  {
    key: "cpu" as const,
    label: "CPU",
    value: 73,
    detail: "12 vCPU",
    icon: CpuIcon,
    color: "var(--chart-1)",
  },
  {
    key: "memory" as const,
    label: "Memory",
    value: 61,
    detail: "39 / 64 GB",
    icon: MemoryStickIcon,
    color: "var(--vercel-purple)",
  },
  {
    key: "disk" as const,
    label: "Disk",
    value: 48,
    detail: "480 / 1000 GB",
    icon: HardDriveIcon,
    color: "var(--vercel-teal)",
  },
];

export default function WidgetDemo() {
  return (
    <Widget design="mumbai" size="lg" className="gap-3">
      <WidgetHeader className="items-center">
        <div className="flex flex-col gap-0.5">
          <WidgetTitle className="text-base">Resource Usage</WidgetTitle>
          <Label className="text-muted-foreground text-xs font-light">
            Torch Cloud · us-east-1
          </Label>
        </div>
        <span className="bg-secondary rounded-md px-1.5 py-0.5 text-[10px] font-medium tracking-wide uppercase">
          Live
        </span>
      </WidgetHeader>
      <WidgetContent className="items-center gap-2 overflow-hidden">
        <ChartContainer
          config={chartConfig}
          className="aspect-square h-full max-h-[260px] flex-1"
        >
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={-270}
            innerRadius="34%"
            outerRadius="100%"
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              tick={false}
              axisLine={false}
            />
            <RadialBar
              dataKey="cpu"
              background
              cornerRadius={8}
              fill="var(--color-cpu)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="memory"
              background
              cornerRadius={8}
              fill="var(--color-memory)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="disk"
              background
              cornerRadius={8}
              fill="var(--color-disk)"
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
        <div className="flex w-40 flex-none flex-col justify-center gap-2">
          {legend.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.key}
                className="flex flex-col gap-1 rounded-2xl border p-2.5"
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <Label className="text-muted-foreground flex items-center gap-1 text-xs">
                    <Icon className="size-3" />
                    {item.label}
                  </Label>
                  <span className="text-foreground ml-auto text-sm font-semibold tabular-nums">
                    {item.value}%
                  </span>
                </div>
                <span className="text-muted-foreground text-[10px] tabular-nums">
                  {item.detail}
                </span>
              </div>
            );
          })}
        </div>
      </WidgetContent>
      <Separator />
      <WidgetFooter>
        <Label className="text-muted-foreground text-xs font-normal">
          24 active nodes
        </Label>
        <Label className="text-muted-foreground text-xs font-normal tabular-nums">
          Avg load 60.7%
        </Label>
      </WidgetFooter>
    </Widget>
  );
}
