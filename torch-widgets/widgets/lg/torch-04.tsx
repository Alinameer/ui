"use client";

import { ActivityIcon } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "../../components/ui/table";
import { Label } from "../../components/ui/label";
import { cn } from "../../lib/utils";

const requestsByEndpoint = [
  { endpoint: "/deploy", requests: 4820, fill: "var(--color-requests)" },
  { endpoint: "/auth", requests: 3910, fill: "var(--color-requests)" },
  { endpoint: "/nodes", requests: 3140, fill: "var(--color-requests)" },
  { endpoint: "/logs", requests: 2680, fill: "var(--color-requests)" },
  { endpoint: "/metrics", requests: 2050, fill: "var(--color-requests)" },
  { endpoint: "/billing", requests: 1180, fill: "var(--color-requests)" },
];

const chartConfig = {
  requests: {
    label: "Requests",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const topEndpoints = [
  { route: "POST /deploy", p95: "182ms", requests: "4.82k", healthy: true },
  { route: "GET /nodes", p95: "96ms", requests: "3.14k", healthy: true },
  { route: "GET /logs", p95: "311ms", requests: "2.68k", healthy: false },
  { route: "POST /auth", p95: "64ms", requests: "3.91k", healthy: true },
];

export default function WidgetDemo() {
  return (
    <Widget design="mumbai" size="lg" className="gap-3">
      <WidgetHeader>
        <WidgetTitle className="flex items-center gap-2">
          <ActivityIcon className="text-vercel-blue size-5" />
          API Traffic
        </WidgetTitle>
        <div className="flex flex-col items-end">
          <Label className="text-base font-semibold">17.8k</Label>
          <Label className="text-muted-foreground text-xs font-normal">
            req / min
          </Label>
        </div>
      </WidgetHeader>
      <WidgetContent className="flex-col items-stretch justify-start gap-2">
        <Label className="text-muted-foreground text-xs font-normal">
          Requests by endpoint
        </Label>
        <ChartContainer config={chartConfig} className="h-32 w-full">
          <BarChart accessibilityLayer data={requestsByEndpoint}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="endpoint"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="requests" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ChartContainer>
        <div className="-mx-1 mt-1 flex-1">
          <Table>
            <TableBody>
              {topEndpoints.map((el) => (
                <TableRow key={el.route} className="border-0">
                  <TableCell className="py-1.5 font-mono text-xs">
                    {el.route}
                  </TableCell>
                  <TableCell className="text-muted-foreground py-1.5 text-right font-mono text-xs tabular-nums">
                    {el.p95}
                  </TableCell>
                  <TableCell className="py-1.5 text-right font-mono text-xs tabular-nums">
                    {el.requests}
                  </TableCell>
                  <TableCell className="w-4 py-1.5 text-right">
                    <span
                      className={cn(
                        "ml-auto block size-2 rounded-full",
                        el.healthy ? "bg-productive" : "bg-destructive",
                      )}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </WidgetContent>
    </Widget>
  );
}
