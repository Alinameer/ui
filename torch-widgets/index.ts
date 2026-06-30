// ============================================================================
// TORCH Widgets — barrel exports
// ----------------------------------------------------------------------------
// Each widget is a default export; here they are re-exported with descriptive,
// named exports so you can do:
//
//   import { TorchKpiSparkline, TorchRevenuePerformance } from "@/torch-widgets";
//
// Naming: Torch<Size><Description>. Size suffix (Sm/Md/Lg/Xl) maps to the
// Widget primitive's `size` prop, which sets fixed dimensions:
//   Sm = 192x192  ·  Md = 384x192  ·  Lg = 384x384  ·  Xl = 798x384
// ============================================================================

// --- sm (192 x 192) ---
export { default as TorchSmKpiSparkline } from "./widgets/sm/torch-01"; // KPI stat + area sparkline
export { default as TorchSmDonutBreakdown } from "./widgets/sm/torch-02"; // donut / resource breakdown
export { default as TorchSmRadialGauge } from "./widgets/sm/torch-03"; // uptime radial gauge
export { default as TorchSmMiniBar } from "./widgets/sm/torch-04"; // weekly deploys mini bar

// --- md (384 x 192) ---
export { default as TorchMdRevenueArea } from "./widgets/md/torch-01"; // revenue area trend
export { default as TorchMdThroughputBars } from "./widgets/md/torch-02"; // this-week vs last-week bars
export { default as TorchMdClusterHealth } from "./widgets/md/torch-03"; // KPI grid + mini sparklines
export { default as TorchMdRequestsArea } from "./widgets/md/torch-04"; // stacked desktop/mobile area
export { default as TorchMdSignupsComposed } from "./widgets/md/torch-05"; // signups vs goal (bar + line)
export { default as TorchMdTrafficSources } from "./widgets/md/torch-06"; // traffic by source bars

// --- lg (384 x 384) ---
export { default as TorchLgAnalytics } from "./widgets/lg/torch-01"; // analytics: area + select + stat list
export { default as TorchLgTrafficDonut } from "./widgets/lg/torch-02"; // traffic donut + legend + export
export { default as TorchLgServiceScorecard } from "./widgets/lg/torch-03"; // radar scorecard
export { default as TorchLgApiTraffic } from "./widgets/lg/torch-04"; // bar + table combo
export { default as TorchLgTopEndpoints } from "./widgets/lg/torch-05"; // horizontal bar ranking
export { default as TorchLgConversionFunnel } from "./widgets/lg/torch-06"; // conversion funnel
export { default as TorchLgResourceUsage } from "./widgets/lg/torch-07"; // multi-ring radial
export { default as TorchLgLatencyPercentiles } from "./widgets/lg/torch-08"; // p50/p95/p99 line
export { default as TorchLgSignupsVsGoal } from "./widgets/lg/torch-09"; // signups vs goal (bar + line)

// --- xl (798 x 384) ---
export { default as TorchXlRevenuePerformance } from "./widgets/xl/torch-01"; // composed bar + line + KPIs
export { default as TorchXlLatencyByRegion } from "./widgets/xl/torch-02"; // multi-line + region stats
export { default as TorchXlDeployActivity } from "./widgets/xl/torch-03"; // GitHub-style heatmap
export { default as TorchXlCostVsPerformance } from "./widgets/xl/torch-04"; // scatter / bubble
export { default as TorchXlResourceAllocation } from "./widgets/xl/torch-05"; // treemap
export { default as TorchXlCloudOverview } from "./widgets/xl/torch-06"; // 3-panel flagship dashboard
export { default as TorchXlSignupsVsGoal } from "./widgets/xl/torch-07"; // signups vs goal + KPI panel (bar + line)

// --- primitives (in case you want to compose your own widgets) ---
export {
  Widget,
  WidgetHeader,
  WidgetTitle,
  WidgetContent,
  WidgetFooter,
  widgetVariants,
} from "./components/ui/widget";
export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "./components/ui/chart";
export { cn } from "./lib/utils";
