"use client";

import { ActivityIcon, FlameIcon, GitCommitVerticalIcon } from "lucide-react";

import {
  Widget,
  WidgetContent,
  WidgetFooter,
  WidgetHeader,
  WidgetTitle,
} from "@/registry/default/ui/widget";
import { Label } from "@/registry/default/ui/label";
import { Separator } from "@/registry/default/ui/separator";
import { cn } from "@/registry/default/lib/utils";

const WEEKS = 26;
const DAYS = 7;

const DAY_LABELS = ["Mon", "", "Wed", "", "Fri", "", "Sun"];
const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

// Deterministic pseudo-random deploy counts derived from cell index.
// No Math.random: a stable hash keeps the heatmap identical every render.
const intensityClasses = [
  "bg-muted",
  "bg-productive/25",
  "bg-productive/45",
  "bg-productive/70",
  "bg-productive",
];

type Cell = {
  level: number;
  count: number;
};

function buildCell(week: number, day: number): Cell {
  const seed = (week * 7 + day) * 2654435761;
  const hash = (seed ^ (seed >>> 15)) >>> 0;
  const r = (hash % 1000) / 1000;
  // Bias toward weekdays; weekends (day 5,6) are quieter.
  const weekend = day >= 5 ? 0.45 : 1;
  // Recent weeks (right side) trend busier.
  const recency = 0.55 + (week / WEEKS) * 0.55;
  const score = r * weekend * recency;
  let level = 0;
  if (score > 0.78) level = 4;
  else if (score > 0.58) level = 3;
  else if (score > 0.36) level = 2;
  else if (score > 0.14) level = 1;
  const count = level === 0 ? 0 : level * 4 + (hash % 5);
  return { level, count };
}

const grid: Cell[][] = Array.from({ length: WEEKS }, (_, w) =>
  Array.from({ length: DAYS }, (_, d) => buildCell(w, d)),
);

const totalDeploys = grid
  .flat()
  .reduce((sum, cell) => sum + cell.count, 0);

const activeDays = grid.flat().filter((cell) => cell.level > 0).length;

// Longest run of consecutive active days reading week-by-week, top to bottom.
const flatByTime = grid.flatMap((week) => week);
let currentStreak = 0;
let bestStreak = 0;
for (const cell of flatByTime) {
  if (cell.level > 0) {
    currentStreak += 1;
    bestStreak = Math.max(bestStreak, currentStreak);
  } else {
    currentStreak = 0;
  }
}

const summaryStats = [
  {
    key: "deploys",
    label: "Total deploys",
    value: totalDeploys.toLocaleString(),
    icon: GitCommitVerticalIcon,
    accent: "text-vercel-blue",
  },
  {
    key: "active",
    label: "Active days",
    value: `${activeDays} / ${WEEKS * DAYS}`,
    icon: ActivityIcon,
    accent: "text-productive",
  },
  {
    key: "streak",
    label: "Longest streak",
    value: `${bestStreak} days`,
    icon: FlameIcon,
    accent: "text-vercel-yellow",
  },
];

export default function WidgetDemo() {
  return (
    <Widget design="mumbai" size="xl" className="gap-3">
      <WidgetHeader className="items-center">
        <div className="flex flex-col gap-0.5">
          <WidgetTitle className="flex items-center gap-2 text-base">
            <ActivityIcon className="text-productive size-5" />
            Deploy Activity
          </WidgetTitle>
          <Label className="text-muted-foreground text-xs font-light">
            Torch Cloud · us-east-1 · last 6 months
          </Label>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-foreground text-2xl leading-none font-semibold tabular-nums">
            {totalDeploys.toLocaleString()}
          </span>
          <Label className="text-muted-foreground text-xs font-normal">
            deploys
          </Label>
        </div>
      </WidgetHeader>

      <WidgetContent className="items-stretch gap-4 overflow-hidden">
        <div className="flex w-44 flex-none flex-col justify-center gap-2">
          {summaryStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.key}
                className="bg-secondary flex items-center gap-3 rounded-2xl px-3 py-2.5"
              >
                <div className="bg-background flex size-9 flex-none items-center justify-center rounded-xl border">
                  <Icon className={cn("size-4", stat.accent)} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-foreground text-lg leading-none font-semibold tabular-nums">
                    {stat.value}
                  </span>
                  <Label className="text-muted-foreground text-[11px] font-normal">
                    {stat.label}
                  </Label>
                </div>
              </div>
            );
          })}
        </div>

        <Separator orientation="vertical" className="h-full" />

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-2">
          <div className="flex items-center justify-between pl-9">
            {MONTH_LABELS.map((month) => (
              <Label
                key={month}
                className="text-muted-foreground text-[11px] font-normal"
              >
                {month}
              </Label>
            ))}
          </div>

          <div className="flex gap-2">
            <div className="flex flex-none flex-col justify-between py-0.5">
              {DAY_LABELS.map((day, i) => (
                <span
                  key={i}
                  className="text-muted-foreground h-4 w-7 text-[10px] leading-4"
                >
                  {day}
                </span>
              ))}
            </div>

            <div className="flex min-w-0 flex-1 justify-between gap-[3px]">
              {grid.map((week, w) => (
                <div key={w} className="flex flex-col gap-[3px]">
                  {week.map((cell, d) => (
                    <div
                      key={d}
                      title={
                        cell.count === 0
                          ? "No deploys"
                          : `${cell.count} deploys`
                      }
                      className={cn(
                        "size-4 rounded-[4px] ring-1 ring-border/40 ring-inset",
                        intensityClasses[cell.level],
                      )}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </WidgetContent>

      <WidgetFooter>
        <Label className="text-muted-foreground text-xs font-normal">
          {activeDays} active days · {bestStreak}-day longest streak
        </Label>
        <div className="flex items-center gap-1.5">
          <Label className="text-muted-foreground text-[11px] font-normal">
            Less
          </Label>
          {intensityClasses.map((cls, i) => (
            <div
              key={i}
              className={cn(
                "size-3.5 rounded-[4px] ring-1 ring-border/40 ring-inset",
                cls,
              )}
            />
          ))}
          <Label className="text-muted-foreground text-[11px] font-normal">
            More
          </Label>
        </div>
      </WidgetFooter>
    </Widget>
  );
}
