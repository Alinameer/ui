"use client";

import { FilterIcon, TrendingDownIcon } from "lucide-react";
import { Funnel, FunnelChart, LabelList, Cell } from "recharts";

import {
  Widget,
  WidgetContent,
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

type Step = {
  stage: string;
  key: string;
  users: number;
  fill: string;
};

const steps: Step[] = [
  { stage: "Visitors", key: "visitors", users: 24800, fill: "var(--chart-1)" },
  { stage: "Signups", key: "signups", users: 8200, fill: "var(--chart-2)" },
  { stage: "Activated", key: "activated", users: 4100, fill: "var(--chart-3)" },
  { stage: "Paid", key: "paid", users: 1850, fill: "var(--chart-4)" },
];

const chartConfig = {
  users: {
    label: "Users",
  },
  visitors: {
    label: "Visitors",
    color: "var(--chart-1)",
  },
  signups: {
    label: "Signups",
    color: "var(--chart-2)",
  },
  activated: {
    label: "Activated",
    color: "var(--chart-3)",
  },
  paid: {
    label: "Paid",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

const formatUsers = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`;

const transitions = steps.slice(1).map((step, i) => {
  const prev = steps[i];
  return {
    from: prev.stage,
    to: step.stage,
    rate: (step.users / prev.users) * 100,
    fill: step.fill,
  };
});

const overall = (steps[steps.length - 1].users / steps[0].users) * 100;

export default function WidgetDemo() {
  return (
    <Widget design="mumbai" size="lg" className="gap-3">
      <WidgetHeader>
        <WidgetTitle className="flex items-center gap-2">
          <FilterIcon className="text-vercel-purple size-5" />
          Conversion Funnel
        </WidgetTitle>
        <div className="flex flex-col items-end">
          <Label className="text-base font-semibold tabular-nums">
            {overall.toFixed(1)}%
          </Label>
          <Label className="text-muted-foreground text-xs font-normal">
            visit → paid
          </Label>
        </div>
      </WidgetHeader>
      <WidgetContent className="flex-col items-stretch justify-start gap-2 overflow-hidden">
        <ChartContainer
          config={chartConfig}
          className="max-h-[150px] w-full"
        >
          <FunnelChart margin={{ top: 4, right: 8, bottom: 4, left: 8 }}>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  nameKey="key"
                  hideLabel
                  formatter={(value, _name, item) => (
                    <div className="flex w-full items-center justify-between gap-3">
                      <span className="text-muted-foreground">
                        {item.payload.stage}
                      </span>
                      <span className="text-foreground font-mono font-medium tabular-nums">
                        {Number(value).toLocaleString()}
                      </span>
                    </div>
                  )}
                />
              }
            />
            <Funnel
              dataKey="users"
              data={steps}
              isAnimationActive={false}
              stroke="var(--background)"
              strokeWidth={2}
              lastShapeType="rectangle"
            >
              <LabelList
                position="right"
                dataKey="stage"
                className="fill-foreground text-xs font-medium"
                stroke="none"
              />
              <LabelList
                position="left"
                dataKey="users"
                className="fill-muted-foreground font-mono text-xs tabular-nums"
                stroke="none"
                formatter={(v: number) => formatUsers(v)}
              />
              {steps.map((step) => (
                <Cell key={step.key} fill={step.fill} />
              ))}
            </Funnel>
          </FunnelChart>
        </ChartContainer>
        <Separator />
        <div className="flex flex-col gap-1.5">
          <Label className="text-muted-foreground text-xs font-normal">
            Step conversion
          </Label>
          {transitions.map((t) => (
            <div key={t.to} className="flex items-center gap-3">
              <span
                className="size-2.5 flex-none rounded-[3px]"
                style={{ backgroundColor: t.fill }}
              />
              <span className="text-foreground w-32 flex-none truncate text-xs">
                {t.from} → {t.to}
              </span>
              <div className="bg-muted relative h-2 flex-1 overflow-hidden rounded-full">
                <span
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ width: `${t.rate}%`, backgroundColor: t.fill }}
                />
              </div>
              <span className="text-foreground flex w-14 flex-none items-center justify-end gap-1 font-mono text-xs font-medium tabular-nums">
                <TrendingDownIcon className="text-muted-foreground size-3" />
                {t.rate.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </WidgetContent>
    </Widget>
  );
}
