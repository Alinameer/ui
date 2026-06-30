"use client";

import { Label as RechartsLabel, Pie, PieChart } from "recharts";

import {
  Widget,
  WidgetHeader,
  WidgetContent,
  WidgetTitle,
} from "../../components/ui/widget";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart";

const usageByRegionData = [
  { region: "us-east", requests: 482, fill: "var(--color-us-east)" },
  { region: "eu-west", requests: 311, fill: "var(--color-eu-west)" },
  { region: "ap-south", requests: 198, fill: "var(--color-ap-south)" },
  { region: "sa-east", requests: 96, fill: "var(--color-sa-east)" },
];

const totalRequests = usageByRegionData.reduce(
  (acc, curr) => acc + curr.requests,
  0,
);

const chartConfig = {
  requests: {
    label: "Requests",
  },
  "us-east": {
    label: "US East",
    color: "var(--vercel-purple)",
  },
  "eu-west": {
    label: "EU West",
    color: "var(--vercel-pink)",
  },
  "ap-south": {
    label: "AP South",
    color: "var(--vercel-blue)",
  },
  "sa-east": {
    label: "SA East",
    color: "var(--vercel-teal)",
  },
} satisfies ChartConfig;

export default function WidgetDemo() {
  return (
    <Widget design="mumbai" size="sm" className="gap-2">
      <WidgetHeader>
        <WidgetTitle className="text-sm">Traffic by region</WidgetTitle>
        <WidgetTitle className="text-muted-foreground text-xs font-medium">
          TORCH
        </WidgetTitle>
      </WidgetHeader>
      <WidgetContent className="p-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-square size-full max-h-[8.5rem]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={usageByRegionData}
              dataKey="requests"
              nameKey="region"
              innerRadius={42}
              outerRadius={58}
              strokeWidth={3}
              paddingAngle={2}
            >
              <RechartsLabel
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 4}
                          className="fill-foreground text-lg font-bold"
                        >
                          {totalRequests.toLocaleString()}K
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 12}
                          className="fill-muted-foreground text-[0.65rem]"
                        >
                          Requests
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </WidgetContent>
    </Widget>
  );
}
