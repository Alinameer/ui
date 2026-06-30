"use client";

import { ArrowUpRightIcon, UsersIcon } from "lucide-react";

import {
  Widget,
  WidgetContent,
  WidgetHeader,
  WidgetTitle,
} from "@/registry/default/ui/widget";
import { Label } from "@/registry/default/ui/label";

type Source = {
  name: string;
  visits: number;
  share: number;
  color: string;
};

const sources: Source[] = [
  { name: "Direct", visits: 48200, share: 42, color: "var(--vercel-blue)" },
  { name: "Search", visits: 31600, share: 28, color: "var(--vercel-purple)" },
  { name: "Social", visits: 19400, share: 17, color: "var(--vercel-pink)" },
  { name: "Referral", visits: 14700, share: 13, color: "var(--vercel-teal)" },
];

const totalVisits = sources.reduce((acc, source) => acc + source.visits, 0);

const formatVisits = (value: number) =>
  value >= 1000 ? `${(value / 1000).toFixed(1)}k` : `${value}`;

export default function WidgetDemo() {
  return (
    <Widget design="mumbai" size="md" className="gap-2">
      <WidgetHeader className="items-center">
        <div className="flex items-center gap-1.5">
          <UsersIcon className="text-vercel-blue size-4" />
          <WidgetTitle className="text-sm">Traffic by Source</WidgetTitle>
        </div>
        <div className="flex items-center gap-1">
          <ArrowUpRightIcon className="text-productive size-3" />
          <Label className="text-productive text-xs font-medium tabular-nums">
            +9.2%
          </Label>
        </div>
      </WidgetHeader>
      <WidgetContent className="flex-col justify-center gap-2.5 overflow-hidden">
        {sources.map((source) => (
          <div
            key={source.name}
            className="grid grid-cols-[auto_3.5rem_1fr_auto] items-center gap-2 text-xs"
          >
            <span
              className="size-2.5 flex-none rounded-full"
              style={{ backgroundColor: source.color }}
            />
            <span className="text-foreground font-medium">{source.name}</span>
            <div className="bg-secondary h-1.5 w-full overflow-hidden rounded-full">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${source.share}%`,
                  backgroundColor: source.color,
                }}
              />
            </div>
            <span className="text-muted-foreground w-11 text-right tabular-nums">
              {formatVisits(source.visits)}
            </span>
          </div>
        ))}
      </WidgetContent>
      <div className="flex flex-none items-center justify-between">
        <Label className="text-muted-foreground text-[10px] tracking-wide uppercase">
          Total Visits
        </Label>
        <p className="text-foreground text-sm leading-none font-semibold tabular-nums">
          {formatVisits(totalVisits)}
        </p>
      </div>
    </Widget>
  );
}
